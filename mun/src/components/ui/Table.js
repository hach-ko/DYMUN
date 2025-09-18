import React from "react";
export function Table({ children }) {
  return (
    <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">{children}</table>
  );
}
export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}
export function TableCell({ children }) {
  return <td className="px-4 py-2 border-b border-blue-100">{children}</td>;
}
export function TableHead({ children }) {
  return <th className="px-4 py-2 bg-blue-50 text-blue-700 font-semibold">{children}</th>;
}
export function TableHeader({ children }) {
  return <thead>{children}</thead>;
}
export function TableRow({ children }) {
  return <tr className="hover:bg-blue-50">{children}</tr>;
}