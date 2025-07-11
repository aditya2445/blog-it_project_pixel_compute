import React, { useState } from "react";

import classnames from "classnames";
import CategoryList from "components/Category/List";
import NavBar from "components/NavBar";
import PropTypes from "prop-types";

const Container = ({ children, className = "" }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex h-screen overflow-y-hidden">
      <NavBar setShow={setShow} />
      <CategoryList show={show} />
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
