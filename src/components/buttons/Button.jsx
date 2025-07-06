import React from "react";

const Button = ({ children, color }) => {
  return <button className={`px-5 py-3 bg-[${color}]`}>{children}</button>;
};

export default Button;
