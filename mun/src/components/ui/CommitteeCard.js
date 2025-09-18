// components/CommitteeCard.js
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export function CommitteeCard({ committee }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer transition-all duration-300 hover:shadow-xl rounded-xl overflow-hidden"
    >
      <img src={committee.image} alt={committee.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
      <div className="p-4">
        <Globe className="h-5 w-5 text-blue-600 mb-2" />
        <h3 className="text-lg font-semibold text-slate-800">{committee.name}</h3>
      </div>
    </motion.div>
  );
}