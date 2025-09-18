// src/components/ui/Badge.js
import { motion } from "framer-motion";

export function Badge({ children, variant = "default", className = "", ...props }) {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-300";
  
  const variants = {
    default: "bg-purple-600 text-white hover:bg-purple-700",
    outline: "bg-white/90 text-slate-700 border border-slate-300 hover:bg-slate-50 backdrop-blur-sm",
    secondary: "bg-green-500 text-white hover:bg-emerald-500",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    // Add more for accents like yellow, orange, pink
    accent: "bg-yellow-500 text-white hover:bg-yellow-600",
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.span>
  );
}

// Keep StatusBadge for backward compatibility if needed
export function StatusBadge({ status, color, ...props }) {
  const colorMap = {
    green: "secondary",
    red: "destructive",
    yellow: "accent",
    // Map to variants
  };
  return <Badge variant={colorMap[color] || "default"} {...props}>{status}</Badge>;
}