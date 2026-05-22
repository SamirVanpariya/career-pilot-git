import React from "react";

const Secondary = ({
  children,
  onClick,
  href,
  type = "button",
  disabled = false,
  className = "",
  loading = false,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-5 h-10 sm:h-11 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 focus:outline-none select-none";

  const styles =
    disabled || loading
      ? "bg-zinc-700 text-zinc-300 cursor-not-allowed"
      : "bg-white text-black hover:bg-zinc-200 active:scale-[0.97]";

  const content = loading ? "Loading..." : children;

  // Link mode
  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${styles} ${className}`}>
        {content}
      </a>
    );
  }

  // Button mode
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${styles} ${className}`}
    >
      {content}
    </button>
  );
};

export default Secondary;