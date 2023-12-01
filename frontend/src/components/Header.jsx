import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { googleLogout } from "@react-oauth/google";
import { updateUserFailure, updateUserSuccess } from "../redux/user/userSlice";
import { FaSearch } from "react-icons/fa";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

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

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-lg sm:text-xl">
            <span className="text-slate-700">Real Estate</span>
          </h1>
        </Link>

        <ul className="flex gap-3 sm:gap-4 items-center">
          <Link to="/search" className="rounded-ful hover:opacity-80">
            <li className="flex items-center gap-2 text-slate-700">
              <FaSearch className="text-slate-700 text-lg" />
              Search..
            </li>
          </Link>
          <Link to="/">
            <li className="inline text-slate-700 hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>

          {currentUser ? (
            <Menu as="div" className="relative ml-2">
              <div>
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <img
                    className="rounded-full h-8 w-8 object-cover"
                    src={currentUser.profilePicture}
                    alt="profile"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Your Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Favourites
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={handleSignout}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Sign out
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <Link to="/sign-in">
              <li className=" text-slate-700 hover:underline"> Sign in</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
