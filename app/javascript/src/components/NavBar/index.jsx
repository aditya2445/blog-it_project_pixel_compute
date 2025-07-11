import React from "react";

import { Button } from "components/commons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getFromLocalStorage } from "utils/storage";

const NavBar = ({ setShow }) => {
  const userName = getFromLocalStorage("authUserName");

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
      </div>
      <Link className="flex items-center gap-x-1 rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 focus:shadow">
        <span className="block">{userName}</span>
      </Link>
    </div>
  );
};

export default NavBar;
