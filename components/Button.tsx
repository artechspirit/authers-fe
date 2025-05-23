import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  const baseClasses =
    "w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50";
  const classes = props.className
    ? `${baseClasses} ${props.className}`
    : baseClasses;

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
};

export default Button;
