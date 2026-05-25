import React from "react";

/**
 * CardWrp — glassmorphism section wrapper.
 * Accepts an optional `className` for per-use overrides.
 */
const CardWrp = ({ children, className = "" }) => {
  return (
    <div
      className={`glass-card rounded-2xl p-4 md:p-6 mt-6 animate-fade-in-up ${className}`}
    >
      {children}
    </div>
  );
};

export default CardWrp;
