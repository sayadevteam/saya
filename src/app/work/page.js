"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const OurWork = () => {
  const images = [
    {
      src: "/image.png",
      title: "OJUS",
      url: "https://ojus-culturals.vercel.app/",
      code: "#1",
    },
    {
      src: "/a2.jpg",
      title: "PassVault",
      url: "https://pass-vault-psi.vercel.app/",
      code: "#2",
    },
    {
      src: "/s1.jpg",
      title: "MaiaEvents",
      url: "https://maiaevents.in/",
      code: "#3",
    },
    {
      src: "a3.jpg",
      title: "vehiQL",
      url: "https://rydo-sooty.vercel.app/",
      code: "#4",
    },
    {
      src: "/y1.jpg",
      title: "TravelHub",
      url: "https://travel-lovat-theta.vercel.app/",
      code: "#5",
    },
    {
      src: "/y2.jpg",
      title: "Growth Chronicles",
      url: "https://growth-chronicles.vercel.app/",
      code: "#6",
    },
    {
      src: "a1.jpg",
      title: "UrbanNest",
      url: "https://urban-nest-6esd.vercel.app/",
      code: "#7",
    },
  ];

  return (
    <section className="w-screen min-h-screen flex flex-col bg-[#f5f4f3] overflow-hidden">
      {/* Top - Title */}
      <div className="w-full h-[20vh] flex items-start justify-start p-6 sm:p-12 pt-20 sm:pt-16">
        <h2 className="text-7xl sm:text-[15vh] font-extrabold text-black font-regular uppercase tracking-wider ">
          Our Work
        </h2>
      </div>

      {/* Bottom - Responsive component */}
      <div className="w-full overflow-hidden bg-[#f5f4f3]">
        <HoverExpand_001 
          images={images} 
          isMobile={false}
          className="hidden lg:block "
        />
        <HoverExpand_002 
          images={images} 
          className="lg:hidden block"
        />
      </div>
    </section>
  );
};

// Desktop: Horizontal (existing)
const HoverExpand_001 = ({
  images,
  className,
}) => {
  const [activeImage, setActiveImage] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full h-[70vh] p-10", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full flex items-start justify-start"
      >
        <div className="flex w-full max-w-7xl items-center justify-center gap-3">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative cursor-pointer overflow-hidden rounded-3xl"
              initial={{ width: "3.5rem", height: "24rem" }}
              animate={{
                width: activeImage === index ? "32rem" : "7rem",
                height: activeImage === index ? "32rem" : "32rem",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => setActiveImage(index)}
              onHoverStart={() => setActiveImage(index)}
            >
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute h-full w-full bg-gradient-to-t from-black/40 to-transparent"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute flex h-full w-full flex-col items-start justify-end p-8 gap-4"
                  >
                    <p className="text-left text-3xl font-bold text-white">
                      {image.title}
                    </p>
                    <p className="text-left text-base text-white/50">
                      {image.code}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(image.url, '_blank');
                      }}
                      className="group relative flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl text-white font-semibold text-sm hover:bg-white/20 hover:border-white/50 transition-all duration-200 overflow-hidden"
                    >
                      <span className="flex-1 text-left">{image.title}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
              <img
                src={image.src}
                className="size-full object-cover"
                alt={image.title}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Mobile: Vertical (HoverExpand_002 adapted)
const HoverExpand_002 = ({
  images,
  className,
}) => {
  const [activeImage, setActiveImage] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full h-screen px-5 py-8", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full flex flex-col items-center justify-center gap-4"
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="group relative cursor-pointer overflow-hidden rounded-3xl w-full max-w-md"
            initial={{ height: "3rem", width: "100%" }}
            animate={{
              height: activeImage === index ? "70vh" : "3rem",
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={() => setActiveImage(index)}
            onHoverStart={() => setActiveImage(index)}
          >
            <AnimatePresence>
              {activeImage === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute h-full w-full bg-gradient-to-t from-black/50 to-transparent"
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {activeImage === index && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute flex h-full w-full flex-col items-start justify-end px-6 pb-6 gap-3"
                >
                  <p className="text-left text-2xl font-bold text-white">
                    {image.title}
                  </p>
                  <p className="text-left text-sm text-white/50">
                    {images[index].code}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(image.url, '_blank');
                    }}
                    className="group relative flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl text-white font-semibold text-sm hover:bg-white/20 hover:border-white/50 transition-all duration-200 overflow-hidden"
                  >
                    <span className="flex-1 text-left">{image.title}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
            <img
              src={image.src}
              className="size-full object-cover w-full h-full"
              alt={image.title}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default OurWork;
