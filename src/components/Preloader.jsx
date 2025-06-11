"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPreloader(false);
    }, 1700); // Show preloader for 2.5s

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {showPreloader && (
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
            transition={{ duration: 1 }}
            className="text-white text-xl md:text-3xl font-bold font-sans tracking-wide text-center px-4"
          >
            <div className="flex justify-center mb-5"><img src={"./logo.png"} height={100} width={100}/></div>
            <span className="text-orange-400 block">SAYA</span>
            {/* <span className="block text-md font-mono">Journey to digital excellence begins</span> */}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
