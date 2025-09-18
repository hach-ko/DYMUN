// components/Hero.js
import { motion } from "framer-motion";

export function HeroTitle() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-6xl font-bold"
    >
      DYMUN
    </motion.h1>
  );
}