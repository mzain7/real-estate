import { useSelector } from "react-redux";
import { useRef } from "react";
import { useState, useEffect } from "react";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { googleLogout } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit, MdLocationOn } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    partialVisibilityGutter: 30,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

export default function Profile() {
  const [file, setFile] = useState(null);
  const fileRef = useRef();
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState(null);
  const [showPropertiesError, setShowPropertiesError] = useState(false);
  const [userProperties, setUserProperties] = useState([]);

  useEffect(() => {
    handleFileUpload(file);
  }, [file]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleFileUpload = async (file) => {
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ProfilePictures");
    data.append("cloud_name", "dhk5vhnp4");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhk5vhnp4/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const imgUrl = await res.json();
    setFormData({ ...formData, profilePicture: imgUrl.secure_url });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`https://gorgeous-pear-fly.cyclic.app/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.error) {
        dispatch(updateUserFailure(data.error.message));
      } else {
        dispatch(updateUserSuccess(data));
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`https://gorgeous-pear-fly.cyclic.app/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.error) {
        dispatch(updateUserFailure(data.error.message));
      } else {
        dispatch(updateUserSuccess(null));
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      googleLogout();
      const res = await fetch(`https://gorgeous-pear-fly.cyclic.app/api/auth/logout`);

      const data = await res.json();
      if (data.error) {
        dispatch(updateUserFailure(data.error.message));
      } else {
        dispatch(updateUserSuccess(null));
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const fetchProperties = async () => {
    try {
      setShowPropertiesError(false);
      const res = await fetch(`https://gorgeous-pear-fly.cyclic.app/api/user/properties/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowPropertiesError(true);
        return;
      }

      setUserProperties(data);
    } catch (error) {
      console.log(error);
      setShowPropertiesError(true);
    }
  };
  const handlePropertyDelete = async (propertyId) => {
    try {
      const res = await fetch(`https://gorgeous-pear-fly.cyclic.app/api/property/delete/${propertyId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserProperties((prev) =>
        prev.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="p-3 ">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            accept="imaes/*"
            hidden
            ref={fileRef}
          />
          <div className="self-center relative">
            <img
              onClick={() => fileRef.current.click()}
              src={formData?.profilePicture || currentUser.profilePicture}
              alt="profile"
              className="rounded-full h-24 w-24 object-cover cursor-pointer mt-2"
            />
            <MdEdit className="text-2xl absolute right-0 -bottom-1" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username">UserName: </label>
            <input
              onChange={handleChange}
              defaultValue={currentUser.username}
              type="text"
              placeholder="username"
              id="username"
              className="border p-3 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email: </label>
            <input
              onChange={handleChange}
              defaultValue={currentUser.email}
              type="email"
              placeholder="email"
              id="email"
              className="border p-3 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password: </label>
            <input
              onChange={handleChange}
              type="text"
              placeholder="password"
              id="password"
              className="border p-3 rounded-lg"
            />
          </div>
          <button
            disabled={loading}
            className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Update"}
          </button>
          <Link
            className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
            to={"/create-property"}
          >
            Create New Property
          </Link>
        </form>
        <div className="flex justify-evenly mt-4">
          <button
            onClick={handleDeleteUser}
            className="text-red-white bg-red-600 uppercase px-3 py-2 rounded-xl flex items-center gap-1 text-md font-semibold text-white"
          >
            <MdDelete />
            Delete Account
          </button>
          <button
            onClick={handleSignout}
            className="text-red-white bg-slate-600 uppercase px-3 py-2 rounded-xl flex items-center gap-1 text-md font-semibold text-white"
          >
            <FaSignOutAlt />
            Signout
          </button>
        </div>

        <p className="text-red-700 mt-5">
          {showPropertiesError ? "Error showing properties" : ""}
        </p>
      </div>
      {userProperties && userProperties.length > 0 && (
        <div className="flex flex-col gap-4 max-w-6xl mx-auto">
          <h1 className="text-center mt-7 text-2xl font-semibold ">
            Your Properties
          </h1>
          <Carousel
            responsive={responsive}
            showDots
            containerClass="pb-3"
            draggable
            keyBoardControl
            swipeable
            slidesToSlide={2}
            arrows
            partialVisible
            itemClass="mx-2"
          >
            {userProperties.map((property) => (
              <div
                key={property._id}
                className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] my-2"
              >
                <Link to={`/property/${property._id}`}>
                  <img
                    src={property.imageUrls[0] || "/img/defualt-house.jpeg"}
                    alt="property cover"
                    className="h-[230px] w-full object-cover hover:scale-105 transition-scale duration-300"
                  />
                  <div className="p-3 flex flex-col gap-2 w-full">
                    <p className="truncate text-lg font-semibold text-slate-700">
                      {property.name}
                    </p>
                    <div className="flex items-center gap-1">
                      <MdLocationOn className="h-4 w-4 text-green-700" />
                      <p className="text-sm text-gray-600 truncate w-full">
                        {property.address}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="flex justify-evenly mb-2">
                  <button
                    onClick={() => handlePropertyDelete(property._id)}
                    className="text-red-white bg-red-600 uppercase px-3 py-2 rounded-xl flex items-center gap-1 text-md font-semibold text-white"
                  >
                    <MdDelete />
                    Delete
                  </button>
                  <Link to={`/update-property/${property._id}`}>
                    <button className="text-red-white bg-green-600 uppercase px-3 py-2 rounded-xl flex items-center gap-1 text-md font-semibold text-white">
                      <MdEdit className="h-5 w-5" />
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}
