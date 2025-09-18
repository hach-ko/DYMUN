import React from "react";
export function Select({ children, className = "", ...props }) {
  return (
    <select
      className={`w-full px-4 py-2 rounded-xl border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
export function SelectContent({ children }) {
  return <div>{children}</div>;
}
export function SelectItem({ children, ...props }) {
  return <option {...props}>{children}</option>;
}
export function SelectTrigger({ children }) {
  return <div>{children}</div>;
}
export function SelectValue(props) {
  return <span {...props} />;
}