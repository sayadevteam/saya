"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react"; // Make sure to install lucide-react

export function AnimeNavBar({
  items,
  className,
  defaultActive = "Home",
}) {
  const [mounted, setMounted] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [activeTab, setActiveTab] = useState(defaultActive);
  const [isOpen, setIsOpen] = useState(false); // Mobile Menu State

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!mounted) return null;

  const handleNavigation = (item) => {
    setActiveTab(item.name);
    setIsOpen(false); // Close mobile menu on click

    const target = document.querySelector(item.url);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <div className="fixed top-3 left-0 right-0 z-[9999]">
        <div
          className={cn(
            "mx-6 md:mx-10 grid grid-cols-2 md:grid-cols-3 items-center",
            className
          )}
        >
          {/* 1. Logo (Always Visible) */}
          <div className="flex items-center justify-start">
            <img
              src="/new-logo.png"
              alt="Logo"
              className="w-28 md:w-[150px]"
              draggable={false}
            />
          </div>

          {/* 2. DESKTOP NAVIGATION (Hidden on mobile, Flex on MD+) */}
          {/* This preserves your exact original desktop styling */}
          <motion.div
            className="hidden md:flex mx-auto items-center gap-3 bg-black/50 border border-white/10 backdrop-blur-lg py-2 px-3 rounded-full shadow-lg relative"
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

                  <span className="relative z-10">{item.name}</span>

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

          {/* 3. MOBILE TRIGGER (Visible on mobile, Hidden on MD+) */}
          <div className="flex justify-end md:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-full mr-4 text-black "
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. MOBILE SIDEBAR OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]"
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] sm:w-[350px] bg-black/90 border-l border-white/10 z-[10001] shadow-2xl p-6 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-center mb-8">
                <span className="text-xl font-bold text-white tracking-wider">
                  MENU
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Nav Items */}
              <div className="flex flex-col gap-4">
                {items.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.name;

                  return (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleNavigation(item)}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group",
                        isActive
                          ? "bg-white text-black"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <Icon
                        size={20}
                        className={cn(
                          "transition-transform group-hover:scale-110",
                          isActive && "text-black"
                        )}
                      />
                      <span className="text-lg font-medium">{item.name}</span>
                      
                      {/* Active Indicator Dot */}
                      {isActive && (
                        <motion.div 
                          layoutId="activeDot"
                          className="ml-auto w-2 h-2 rounded-full bg-black" 
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Decorative Bottom */}
              <div className="mt-auto">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
                <p className="text-center text-xs text-white/30">
                  © 2024 Design System
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}