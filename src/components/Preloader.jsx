"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 2500); // Adjust duration as needed
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 0.95,
            transition: { duration: 1, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#010101]"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-white text-xl md:text-3xl font-bold font-sans tracking-wide text-center px-4"
          >
            Everyone uses a damn <span className="text-red-600">Preloader</span>
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
