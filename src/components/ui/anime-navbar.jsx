"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export function AnimeNavBar({
  items,
  className,
  defaultActive = "Home",
}) {
  const [mounted, setMounted] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [activeTab, setActiveTab] = useState(defaultActive);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleNavigation = (item) => {
    setActiveTab(item.name);

    const target = document.querySelector(item.url);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="fixed top-5 left-0 right-0 z-[9999]">
      <div
        className={cn(
          "mx-10 grid grid-cols-[auto_1fr_auto] items-center",
          className
        )}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/saya.png"
            alt="Logo"
            width={100}
            draggable={false}
          />
        </div>

        {/* Navigation */}
        <motion.div
          className="mx-auto flex items-center gap-3 bg-black/50 border border-white/10 backdrop-blur-lg py-2 px-3 rounded-full shadow-lg relative"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            const isHovered = hoveredTab === item.name;

            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item)}
                onMouseEnter={() => setHoveredTab(item.name)}
                onMouseLeave={() => setHoveredTab(null)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300",
                  "text-white/70 hover:bg-white hover:text-black",
                  isActive && "bg-white text-black"
                )}
              >
                {/* Active Glow */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                      scale: [1, 1.03, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="absolute inset-0 bg-primary/25 blur-md rounded-full" />
                    <div className="absolute inset-[-6px] bg-primary/20 blur-xl rounded-full" />
                    <div className="absolute inset-[-12px] bg-primary/10 blur-2xl rounded-full" />
                  </motion.div>
                )}

                {/* Desktop Text */}
                <span className="hidden md:inline relative z-10">
                  {item.name}
                </span>

                {/* Mobile Icon */}
                <span className="md:hidden relative z-10">
                  <Icon size={18} strokeWidth={2.5} />
                </span>

                {/* Hover Highlight */}
                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    />
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </motion.div>

        {/* CTA */}
        <div className="flex justify-end">
          <Button variant="outline" className="cursor-pointer">
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
