"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

const Skiper19 = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]); // Full range

  return (
    <div ref={containerRef} className="w-full h-[450px]">
      <svg
        width="100%"
        height="450"
        viewBox="0 0 1400 450"  // ✅ FIXED: Full width viewBox
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet">
        
        {/* Main Zigzag Curved Path */}
        <motion.path
          d="M 100 180 Q 300 80, 500 160 Q 700 240, 900 140 T 1200 180 Q 1300 220, 1350 200"
          stroke="#FF6900"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            pathLength,
            strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
          }}
        />

        {/* Point 1 - Start */}
        <motion.g style={{ opacity: useTransform(pathLength, [0, 0.1], [0, 1]) }}>
          <circle cx="100" cy="180" r="16" fill="#FF6900" stroke="white" strokeWidth="4"/>
          <text x="100" y="185" textAnchor="middle" fontSize="20" fontWeight="bold" fill="white" dy=".3em">01</text>
        </motion.g>

        {/* Point 2 */}
        <motion.g style={{ opacity: useTransform(pathLength, [0.3, 0.4], [0, 1]) }}>
          <circle cx="500" cy="160" r="16" fill="#FF6900" stroke="white" strokeWidth="4"/>
          <text x="500" y="165" textAnchor="middle" fontSize="20" fontWeight="bold" fill="white" dy=".3em">02</text>
        </motion.g>

        {/* Point 3 */}
        <motion.g style={{ opacity: useTransform(pathLength, [0.6, 0.7], [0, 1]) }}>
          <circle cx="900" cy="140" r="16" fill="#FF6900" stroke="white" strokeWidth="4"/>
          <text x="900" y="145" textAnchor="middle" fontSize="20" fontWeight="bold" fill="white" dy=".3em">03</text>
        </motion.g>

        {/* Point 4 - End */}
        <motion.g style={{ opacity: useTransform(pathLength, [0.9, 1], [0, 1]) }}>
          <circle cx="1350" cy="200" r="16" fill="#FF6900" stroke="white" strokeWidth="4"/>
          <text x="1350" y="205" textAnchor="middle" fontSize="20" fontWeight="bold" fill="white" dy=".3em">04</text>
        </motion.g>
      </svg>
    </div>
  );
};

export { Skiper19 };
