import { motion } from "framer-motion";

export function Button({
  children,
  icon = null,
  variant = "primary",
  size = "medium",
  asChild = false,
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group transition-all duration-300 rounded-lg shadow-xl hover:shadow-2xl no-underline hover:no-underline";
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:text-white",
    secondary:
      "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 hover:text-white",
  };
  const sizes = {
    large: "h-12 px-8 text-lg",
    medium: "h-11 px-7 text-base",
    small: "h-8 px-4 text-sm",
  };

  const content = (
    <>
      <span className="truncate">{children}</span>
      {icon && (
        <span className="flex items-center ml-2">
          {icon}
        </span>
      )}
    </>
  );

  if (asChild && props.href) {
    return (
      <motion.a
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
        style={{ textDecoration: "none", color: "inherit" }}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
      style={{ textDecoration: "none" }}
      {...props}
    >
      {content}
    </motion.button>
  );
}