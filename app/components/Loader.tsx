"use client";

import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <motion.div
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default Loader;
