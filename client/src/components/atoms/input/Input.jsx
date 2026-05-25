import React from "react";

const Input = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
  icon = null,
  name,
}) => {
  return (
    <div className="relative mt-1">
      {icon && (
        <div className="absolute left-3 top-3 text-zinc-500">{icon}</div>
      )}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full h-10  bg-[#161618] border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-zinc-600 ${className} ${icon ? "pl-9" : "pl-3"}`}
      />
    </div>
  );
};

export default Input;
