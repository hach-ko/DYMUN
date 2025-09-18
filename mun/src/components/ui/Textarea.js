import React from "react";
export function Textarea(props) {
  return (
    <textarea
      className="w-full px-4 py-2 rounded-xl border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
      {...props}
    />
  );
}