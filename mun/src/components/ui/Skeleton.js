import React from "react";
export function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 ${className}`}
      style={{ borderRadius: "1rem" }}
    />
  );
}