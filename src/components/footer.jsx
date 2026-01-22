"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const SAYA_LOGO_PATHS = [
  "M0 20Q0 0 20 0H80V30H30Q20 30 20 40V45Q20 55 30 55H70Q80 55 80 65V100Q80 120 60 120H0V90H50Q60 90 60 80V75Q60 65 50 65H10Q0 65 0 55V20Z",
  "M100 120L130 15Q135 0 145 0Q155 0 160 15L190 120H165L160 90H130L125 120H100ZM135 70H155L145 35L135 70Z",
  "M200 0C205 50 225 70 230 90V120H260V90C265 70 285 50 290 0H265C260 30 255 45 245 45C235 45 230 30 225 0H200Z",
  "M300 120L330 15Q335 0 345 0Q355 0 360 15L390 120H365L360 90H330L325 120H300ZM335 70H355L345 35L335 70Z",
];

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const pathVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: i * 0.08,
      },
    }),
  };

  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/saya-dev-team-579299369/" },
    { name: "Twitter", url: "https://x.com/Sayadevteam" },
    { name: "Instagram", url: "https://www.instagram.com/sayadevteam" },
  ];

  return (
    <footer className="w-full bg-[#f5f4f3] pt-24 pb-12 px-6 sm:px-12 border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Top: Interaction Area */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="flex-1">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-black mb-8 leading-[0.9]">
              Let’s do great <br /> work together
            </h2>
            <motion.a
              href="http://saya-delta.vercel.app/contact"
              whileHover={{ x: 10 }}
              className="inline-flex items-center gap-2 text-xl font-semibold border-b-2 border-black pb-1 transition-colors hover:text-[#FF6900] hover:border-[#FF6900]"
            >
              Get in touch <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-black/30">Social</span>
              <ul className="space-y-2">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      className="text-2xl font-bold hover:text-[#FF6900] transition-colors duration-300 block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Middle: Giant Animated SVG */}
        <div className="w-full py-12 border-y border-black/5">
          <motion.svg
            ref={ref}
            viewBox="0 0 400 130"
            fill="none"
            className="w-full h-auto max-h-[25vh]"
            xmlns="http://www.w3.org/2000/svg"
          >
            {SAYA_LOGO_PATHS.map((path, index) => (
              <motion.path
                key={index}
                custom={index}
                variants={pathVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                d={path}
                fill="#FF6900"
              />
            ))}
          </motion.svg>
        </div>

        {/* Bottom: Legal & Credits */}
        <div className="text-center items-center gap-6 mt-10">
          <span className="text-lg font-medium text-black/40">
            &copy; 2026 SAYA. Built for the modern web.
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;