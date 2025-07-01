import React from "react";

import classnames from "classnames";
import NavBar from "components/NavBar";
import PropTypes from "prop-types";

const Container = ({ children, className = "" }) => (
  <div className="flex h-screen gap-2 overflow-y-hidden">
    <NavBar />
    <div className={classnames("overflow-y-auto px-6", [className])}>
      {children}
    </div>
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
