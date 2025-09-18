// src/components/ui/lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Add this function (adjust logic if your pages need custom routing)
export function createPageUrl(pageName) {
  // Example: Converts "Register" to "/register", "AboutUs" to "/about-us"
  const normalized = pageName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '');
  return `/${normalized}`;
}
