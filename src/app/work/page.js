"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

const OurWork = () => {
  const images = [
    {
      src: "/image.png",
      alt: "Illustrations by my fav AarzooAly",
      code: "# 23",
    },
    {
      src: "/image.png",
      alt: "Illustrations by ©AarzooAly",
      code: "# 23",
    },
    {
      src: "/image.png",
      alt: "Illustrations by ©AarzooAly",
      code: "# 23",
    },
    {
      src: "/image.png",
      alt: "Illustrations by ©AarzooAly",
      code: "# 23",
    },
    {
      src: "/image.png",
      alt: "Illustrations by ©AarzooAly",
      code: "# 23",
    },
    {
      src: "/image.png",
      alt: "Illustrations by ©AarzooAly",
      code: "# 23",
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
                    className="absolute flex h-full w-full flex-col items-end justify-end p-8"
                  >
                    <p className="text-left text-base text-white/50">
                      {image.code}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              <img
                src={image.src}
                className="size-full object-cover"
                alt={image.alt}
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
                  className="absolute flex h-full w-full flex-col items-end justify-end px-6 pb-6"
                >
                  <p className="text-left text-sm text-white/50">
                    {images[index].code}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <img
              src={image.src}
              className="size-full object-cover w-full h-full"
              alt={image.alt}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default OurWork;
