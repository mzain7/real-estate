import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("New user created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const validUser = await User.findOne({ email });
  if (!validUser) {
    return next(errorHandler(400, "Invalid email or password"));
  }

  const validPassword = await bcryptjs.compare(password, validUser.password);

  if (!validPassword) {
    return next(errorHandler(400, "Invalid email or password"));
  }
  const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
  const { password: pass, ...user } = validUser._doc;
  res
    .cookie("access_token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    })
    .status(200)
    .json(user);
};

export const google = async (req, res, next) => {
  try {
    const { email, name, photo } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        })
        .status(200)
        .json(rest);
    } else {
      const generatePassword = Math.random().toString(36).slice(-8);
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(generatePassword, salt);

      const newUser = new User({
        username: email,
        email,
        password: hashedPassword,
        profilePicture: photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        })
        .status(200)
        .json(rest);
    }
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("Logged out successfully");
  } catch (err) {
    next(err);
  }
};
