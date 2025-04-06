import React from "react";

export const Button = ({ text, onClick, type="primary", size="sm" }) => {
  const variant={
    primary: "border-blue-400 hover:border-blue-700 border-2",
    secondary: "bg-blue-400 hover:bg-blue-700 border-2 text-white",
    danger: "border-red-500 hover:border-red-700 border-2",
  }

  const sizeType={
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3- px-6 text-lg',
  }

  console.log(size, type);

  return (
    <button
      className={`${variant[type]} ${sizeType[size]} cursor-pointer`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
