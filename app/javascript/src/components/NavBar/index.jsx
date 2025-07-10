import React from "react";

import { Button } from "components/commons";

const NavBar = ({ setShow }) => (
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
    <div className="h-10 w-10 rounded-full bg-black" />
  </div>
);

export default NavBar;
