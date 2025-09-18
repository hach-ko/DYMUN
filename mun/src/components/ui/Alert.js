import React from "react";
export function Alert({ children, className = "", ...props }) {
  return (
    <div
      className={`p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 shadow ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
export function AlertTitle({ children }) {
  return (
    <strong className="block text-lg font-bold mb-1">{children}</strong>
  );
}
export function AlertDescription({ children }) {
  return <span className="block text-sm">{children}</span>;
}
