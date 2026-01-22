"use client";

import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const OurWork = () => {
  const projects = [
    {
      src: "/dakhya.png",
      title: "Dakhya Financial Consultancy",
      url: "https://www.dakhyaconsultancy.in/",
      code: "1",
    },
    {
      src: "vivai.png",
      title: "VIV AI",
      url: "https://viv-landing-virid.vercel.app/",
      code: "2",
    },
    {
      src: "travel.png",
      title: "TravelHub",
      url: "https://travel-lovat-theta.vercel.app/",
      code: "3",
    },
    {
      src: "maia.png",
      title: "MaiaEvents",
      url: "https://maiaevents.in/",
      code: "4",
    },
    // {
    //   src: "a3.jpg",
    //   title: "vehiQL",
    //   url: "https://rydo-sooty.vercel.app/",
    //   code: "#4",
    // },
    {
      src: "y2.png",
      title: "Growth Chronicles",
      url: "https://growth-chronicles.vercel.app/",
      code: "5",
    },
    {
      src: "edly.jpeg",
      title: "Edly: E-Learning",
      url: "https://edly-elearning.vercel.app/",
      code: "6",
    },
    {
      src: "/image.png",
      title: "OJUS",
      url: "https://ojus-culturals.vercel.app/",
      code: "7",
    },
  ];

  return (
    <section className="w-full min-h-screen bg-[#f5f4f3] py-20 px-6 sm:px-12">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-6xl sm:text-8xl font-black text-black uppercase tracking-tighter">
          Our Work
        </h2>
        <div className="h-1 w-24 bg-black mt-4" />
      </div>

      {/* Modern Grid UI */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col gap-4"
    >
      {/* Image Container */}
      <div 
        onClick={() => window.open(project.url, '_blank')}
        className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gray-200 cursor-pointer shadow-sm group-hover:shadow-xl transition-shadow duration-500"
      >
        <motion.img
          src={project.src}
          alt={project.title}
          className="size-full object-cover"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        />
        
        {/* Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      {/* Project Info */}
      <div className="flex justify-between items-start pt-2">
        <div className="space-y-1">
          <span className="text-xs font-bold text-black/40 uppercase tracking-widest">
            Project {project.code}
          </span>
          <h3 className="text-2xl font-bold text-black flex items-center gap-2">
            {project.title}
          </h3>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1, rotate: 45 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.open(project.url, '_blank')}
          className="p-4 bg-white rounded-full border border-black/5 shadow-sm group-hover:bg-black group-hover:text-white transition-colors duration-300"
        >
          <ArrowUpRight className="w-5 h-5" />
        </motion.button>
      </div>
      
      {/* Separator Line */}
      <div className="w-full h-[1px] bg-black/5 group-hover:bg-black/20 transition-colors" />
    </motion.div>
  );
};

export default OurWork;