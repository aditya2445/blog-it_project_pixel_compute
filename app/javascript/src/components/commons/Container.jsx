import React, { useState } from "react";

import classnames from "classnames";
import NavBar from "components/NavBar";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Container = ({ children, className = "" }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex h-screen gap-2 overflow-y-hidden">
      <NavBar setShow={setShow} />
      <div className={`${show ? "block" : "hidden"}`}>
        <p>CATEGORIES</p>
        <Link to="/">+</Link>
      </div>
      <div className={classnames("w-full overflow-y-auto px-6", [className])}>
        {children}
      </div>
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
