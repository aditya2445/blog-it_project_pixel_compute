import React, { useRef } from "react";

import { Edit, Folder, List, ListDetails } from "@bigbinary/neeto-icons";
import { Popover } from "@bigbinary/neetoui";
import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import { Button } from "components/commons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

const NavBar = ({ setShow }) => {
  const userName = getFromLocalStorage("authUserName");
  const loggedUserImageReference = useRef(null);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="flex h-screen w-12 flex-col items-center justify-between border-r-2 p-4 ">
      <div className="flex flex-col items-center gap-7">
        <Link to="/">
          <div className="h-6 w-6 cursor-pointer">
            <img src="https://img.icons8.com/?size=100&id=tz1GQBtNqT2P&format=png&color=000000" />
          </div>
        </Link>
        <Link
          className={`${window.location.pathname === "/" && "text-blue-900"}`}
          to="/"
        >
          <div className="h-6 w-6 cursor-pointer">
            <List />
          </div>
        </Link>
        <Link
          to="/post/create"
          className={`${
            window.location.pathname === "/post/create" && "text-blue-900"
          }`}
        >
          <div className="h-6 w-6 cursor-pointer">
            <Edit />
          </div>
        </Link>
        {window.location.pathname === "/" && (
          <div
            className={`${
              window.location.pathname === "/" && "text-blue-900"
            }h-6 w-6 cursor-pointer`}
            onClick={() => setShow(prev => !prev)}
          >
            <ListDetails />
          </div>
        )}
        <Link
          to="/my_posts"
          className={`${
            window.location.pathname === "/my_posts" && "text-blue-900"
          }`}
        >
          <div className="h-6 w-6 cursor-pointer">
            <Folder />
          </div>
        </Link>
      </div>
      <div className="relative h-10 w-10 items-center justify-center">
        <img
          alt="profile"
          className="h-8 w-8 rounded-full border "
          ref={loggedUserImageReference}
          src="https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg"
        />
        <Popover
          className="w-auto"
          position="right"
          reference={loggedUserImageReference}
        >
          <div className="p-2">
            <div className="cursor-pointer text-center text-lg font-semibold">
              {userName}
            </div>
            <Button
              buttonText="Logout"
              className="cursor-pointer bg-black text-sm hover:text-white"
              onClick={handleLogout}
            />
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default NavBar;
