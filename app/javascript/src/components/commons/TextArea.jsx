import React from "react";

import classnames from "classnames";
// import PropTypes from "prop-types";

const TextArea = ({
  label,
  value,
  onChange,
  placeholder = "",
  disabled = false,
  required = true,
  className = "",
  rows = 4,
}) => (
  <div className="flex flex-col">
    {label && (
      <label className="block text-sm font-medium leading-none text-gray-800">
        {label}
        <sup className="font-bold">*</sup>
      </label>
    )}
    <div className="mt-1 rounded-md shadow-sm">
      <textarea
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        rows={rows}
        value={value}
        className={classnames(
          "focus:shadow-outline-blue block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5",
          [className]
        )}
        onChange={onChange}
      />
    </div>
  </div>
);

// TextArea.propTypes = {
//   label: PropTypes.string,
//   value: PropTypes.node,
//   placeholder: PropTypes.string,
//   onChange: PropTypes.func,
//   disabled: PropTypes.bool,
//   required: PropTypes.bool,
//   rows: PropTypes.number,
//   className: PropTypes.string,
// };

export default TextArea;
