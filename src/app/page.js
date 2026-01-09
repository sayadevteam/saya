"use client";

import ButtonCreativeTop from "@/components/cta";
import Navbar from "@/components/navbar";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactLenis } from "lenis/react";
import ClipPathImage from "@/components/svg-bg/svg1";
import { Skiper19 } from "@/components/ui/skiper-ui/skiper19";
import { Skiper54 } from "@/components/ui/skiper-ui/skiper54";
import { HorizontalScroll } from "@/components/horscroll";
import { StaggerTestimonials } from "@/components/stagger-testimonials";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from '@/components/uilayouts/accordion';
import { Plus } from 'lucide-react';

export default function Page() {
  return (
    <ReactLenis root>
      <div className="bg-[#fdfbf7] font-['Switzer']">
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,600,800&display=swap"
          rel="stylesheet"
        />

        <Navbar />

        <main>
          <article>
            {/* HERO SECTION - UNTOUCHED */}
            <section className="h-screen w-full p-4 bg-[#fdfbf7]">
              <div className="relative h-full w-full rounded-[3rem] bg-white border border-orange-300 overflow-hidden shadow-sm flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731612_1px,transparent_1px),linear-gradient(to_bottom,#f9731612_1px,transparent_1px)] bg-[size:54px_54px]" />
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-yellow-200/20 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-orange-200/20 blur-[100px] rounded-full" />

                <div className="hidden lg:block">
                  <motion.div
                    animate={{ y: [0, -12, 0], rotate: [-4, -2, -4] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute left-16 top-96 bg-yellow-50 p-6 rounded-2xl shadow-xl border border-yellow-200 text-sm max-w-[200px] z-20"
                  >
                    <div className="w-6 h-6 bg-yellow-400 rounded-lg mb-3 rotate-3 shadow-inner" />
                    <p className="text-yellow-900 font-medium leading-tight text-left">
                      Focus on what matters. Let us handle the polish.
                    </p>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 12, 0], rotate: [4, 6, 4] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute right-16 top-40 bg-white p-5 rounded-2xl shadow-2xl border border-orange-50 z-20"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500" />
                      <p className="font-bold text-orange-900 text-[10px] uppercase tracking-widest">
                        Active Now
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                      New Growth Strategy
                    </p>
                    <p className="text-[10px] text-gray-400">Deployed 2m ago</p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10 text-center px-6"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-orange-50 border border-orange-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-wider text-orange-700 uppercase">
                      Built for Creators
                    </span>
                  </div>

                  <h1 className="text-6xl md:text-8xl font-extrabold text-black tracking-tighter leading-[0.85]">
                    Websites <span className="text-orange-500">that work.</span>
                    <br />
                    <span className="relative font-rosaline inline-block text-gray-400">
                      Brands that shine
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="absolute bottom-2 left-0 h-2 bg-yellow-300 -z-10 opacity-60"
                      />
                    </span>
                  </h1>

                  <p className="mt-8 max-w-lg text-lg text-gray-600 font-medium leading-relaxed mx-auto">
                    Clean code meets vibrant design. We build high-converting
                    interfaces using your favorite citrus tones.
                  </p>

                  <div className="mt-12 flex justify-center">
                    <Link href="/work">
                      <div className="hover:scale-105 transition-transform duration-300">
                        <ButtonCreativeTop />
                      </div>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* DESCRIPTION SECTION */}
            <section className="w-full p-4 bg-[#fdfbf7] relative z-20">
              <HorizontalScroll />
            </section>

            {/* THIRD SECTION - STICKY ORANGE */}
            <section className="h-screen mx-3 sticky top-24 p-4 bg-orange-500 flex items-center justify-center text-center rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.2)] z-30">
              <div className="relative z-10 max-w-3xl">
                <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tighter">
                  Built for <br />{" "}
                  <span className="text-yellow-300 underline decoration-white/20">
                    Growth.
                  </span>
                </h1>
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Ideate", "Design", "Code", "Scale"].map((step, idx) => (
                    <div
                      key={idx}
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white font-bold text-lg"
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FOURTH SECTION - STICKY YELLOW */}
            <section className="h-screen mx-3 sticky top-32 p-4 bg-yellow-400 flex items-center justify-center text-center rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] z-40">
              <div className="relative z-10">
                <h1 className="text-6xl md:text-8xl font-extrabold text-yellow-950 tracking-tighter">
                  Trusted By <br /> The{" "}
                  <span className="text-white">Bold.</span>
                </h1>
                <div className="mt-12 flex justify-center gap-8 opacity-40">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-24 bg-yellow-950 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* FINAL SECTION - CONTACT (FIXED BLEEDING) */}
            <section className="relative w-full p-4 bg-[#fdfbf7] z-[50]">
              <div className="relative min-h-screen w-full rounded-[3rem] bg-white overflow-hidden flex flex-col items-center justify-center text-center px-6">
                <div className="absolute inset-0 bg-[#fdfbf7] -z-10" />
                <div className="relative z-10 max-w-2xl">
                  <h1 className="text-6xl md:text-8xl font-extrabold text-black tracking-tighter">
                    Let's Build <br />{" "}
                    <span className="text-orange-500">Legacy.</span>
                  </h1>
                  <p className="text-gray-500 mt-8 text-xl font-medium">
                    Ready to transform your brand into a digital leader? Let's
                    start the conversation.
                  </p>
                  <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                    <button className="bg-black text-white px-12 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-orange-600 transition-all cursor-pointer">
                      Get In Touch
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <section className="relative w-full p-4 bg-[#fdfbf7] z-[60]">
              <div className="relative min-h-screen w-full rounded-[3rem] bg-white border border-orange-300 overflow-hidden shadow-sm flex flex-col items-center py-24 px-6">
                {/* Background Textures */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731612_1px,transparent_1px),linear-gradient(to_bottom,#f9731612_1px,transparent_1px)] bg-[size:54px_54px] -z-10" />
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-yellow-200/20 blur-[100px] rounded-full -z-10" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-orange-200/20 blur-[100px] rounded-full -z-10" />

                {/* Header Content */}
                <div className="relative z-10 text-center mb-16">
                  <div className="inline-flex items-center gap-2 px-3 rounded-full bg-orange-50 border border-orange-100"></div>

                  <h2 className="text-5xl md:text-7xl font-extrabold text-black tracking-tighter leading-[0.9]">
                    Meet our <br />
                    <span className="text-orange-500">Testimonies</span>
                  </h2>
                </div>

                {/* Component Container */}
                <div className="w-full max-w-7xl mx-auto flex-1">
                  <StaggerTestimonials />
                </div>
              </div>
            </section>

            <section className="relative w-full p-4 bg-[#fdfbf7] z-[70]">
  <div className="relative min-h-screen w-full rounded-[3rem] bg-white border border-orange-100 overflow-hidden shadow-sm flex flex-col items-center py-24 px-6">
    {/* Background Textures */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731612_1px,transparent_1px),linear-gradient(to_bottom,#f9731612_1px,transparent_1px)] bg-[size:54px_54px] -z-10" />
    <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-yellow-200/20 blur-[100px] rounded-full -z-10" />
    <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-orange-200/20 blur-[100px] rounded-full -z-10" />

    {/* Header Section */}
    <div className="relative z-10 text-center mb-20">
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-orange-50 border border-orange-100">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
        <span className="text-[10px] font-bold tracking-wider text-orange-700 uppercase">
          Common Questions
        </span>
      </div>

      <h2 className="text-6xl md:text-8xl font-extrabold text-black tracking-tighter leading-[0.85]">
        Got <span className="text-orange-500">questions?</span> <br />
        We have answers.
      </h2>
    </div>

    {/* Accordion Container */}
    <div className="w-full max-w-4xl relative z-10">
      <Accordion 
        defaultValue={["item-1"]} 
        className="space-y-4"
      >
        {[
          {
            id: "item-1",
            q: "What is a UI component?",
            a: "A UI (User Interface) component is a modular, reusable element that serves a specific function within a graphical user interface. Examples include buttons, input fields, dropdown menus, sliders, and checkboxes."
          },
          {
            id: "item-2",
            q: "Why are UI components important?",
            a: "UI components promote consistency, efficiency, and scalability in software development. They allow developers to reuse code and maintain a consistent look and feel across an application."
          },
          {
            id: "item-3",
            q: "Key characteristics of UI components?",
            a: "Well-designed UI components should be modular, customizable, and accessible. They should have clear functionality and be easily styled to match the overall design language."
          }
        ].map((item) => (
          <AccordionItem 
            key={item.id} 
            value={item.id} 
            className="group border border-orange-100 bg-white backdrop-blur-sm rounded-3xl overflow-hidden px-6 py-2 transition-all hover:border-orange-300 data-[state=open]:bg-orange-50/30 data-[state=open]:border-orange-200 hover:bg-white"
          >
            <AccordionHeader 
              customIcon 
              className="text-xl md:text-2xl font-bold py-6 text-black tracking-tight flex justify-between items-center w-full"
            >
              {item.q}
              <div className="bg-orange-100 group-data-[state=open]:bg-orange-500 group-data-[state=open]:text-white p-2 rounded-full transition-colors">
                <Plus className="w-5 h-5 group-data-[state=open]:rotate-45 transition-transform duration-300" />
              </div>
            </AccordionHeader>
            <AccordionPanel className="pb-8 text-gray-600 text-lg leading-relaxed font-medium">
              {item.a}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </div>
</section>
          </article>
        </main>
      </div>
    </ReactLenis>
  );
}
