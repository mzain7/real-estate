import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import Property from "../models/property.model.js";

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, profilePicture, password } = req.body;
  if (req.user.id === id) {
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: { username, email, profilePicture, password: hashedPassword } },
        { new: true }
      );
      const { password: pass, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: { username, email, profilePicture } },
        { new: true }
      );
      res.status(200).json(updatedUser);
    }
  } else {
    res.status(403).json("You can update only your account");
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (req.user.id === id) {
    await User.findByIdAndDelete(id);
    res.clearCookie("access_token").status(200).json("User has been deleted");
  } else {
    res.status(403).json("You can delete only your account");
  }
};

export const getUserProperties = async (req, res) => {
  const { id } = req.params;
  if (req.user.id === id) {
    const properties = await Property.find({ userRef: id }).sort({
      createdAt: -1,
    });
    res.status(200).json(properties);
  } else {
    res.status(403).json("You can get only your properties");
  }
};

export const getUserDetails = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(404).json("User not found");
    return;
  }
  const { password, ...rest } = user._doc;
  res.status(200).json(rest);
};
