import React, { useRef } from "react";

import { Popover } from "@bigbinary/neetoui";
import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import { Button } from "components/commons";
import { useHistory } from "react-router-dom";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

const NavBar = ({ setShow }) => {
  const userName = getFromLocalStorage("authUserName");
  const loggedUserImageReference = useRef(null);
  const history = useHistory();

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
    <div className="flex h-screen w-20 flex-col items-center justify-between border-r-2 p-4 ">
      <div className="flex flex-col gap-2">
        <Button buttonText="Blogs" className="bg-slate-600" />
        <Button buttonText="Add Blog" className="bg-slate-600" />
        <Button
          buttonText="Show Cats"
          className="bg-slate-600"
          onClick={() => setShow(prev => !prev)}
        />
        <Button
          buttonText="My posts"
          className="bg-slate-600"
          onClick={() => history.push("/posts/my_posts")}
        />
      </div>
      <div className="relative">
        <img
          alt="profile"
          className="h-10 w-10 rounded-full border "
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
