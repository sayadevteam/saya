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
} from "@/components/uilayouts/accordion";
import { Plus } from "lucide-react";
import Footer from "@/components/footer";
import FAQSection from "@/components/accordion-05";

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
            <section id="hero" className="h-screen w-full p-4 bg-[#fdfbf7]">
              <div className="relative h-full w-full -mt-20 rounded-[3rem] bg-white border border-orange-300 overflow-hidden shadow-sm flex flex-col items-center justify-center">
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
            <section id="description" className="w-full p-4 bg-[#fdfbf7] relative z-20">
              <HorizontalScroll />
            </section>

            {/* THIRD SECTION - STICKY ORANGE */}
            {/* STAGE 1: IDEATION (Orange) */}
            <div id="workflow" className="bg-[#fdfbf7]">
              <section className="h-screen mx-3 sticky top-20 p-4 bg-orange-600 flex items-center justify-center text-center rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.2)] z-10">
                <div className="relative z-10 max-w-4xl px-6">
                  <span className="text-orange-200 font-bold tracking-widest uppercase text-sm mb-4 block">
                    Step 01 — Discovery
                  </span>
                  <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-8">
                    Deep Dive &{" "}
                    <span className="text-yellow-300">Strategy.</span>
                  </h1>
                  <p className="text-orange-50 text-xl md:text-2xl font-medium leading-relaxed">
                    We start by dissecting your business goals, target audience,
                    and technical requirements to build a solid roadmap.
                  </p>
                </div>
              </section>

              {/* STAGE 2: ARCHITECTURE (Deep Orange/Red) */}
              <section className="h-screen mx-3 sticky top-24 p-4 bg-[#B3001B] flex items-center justify-center text-center rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.2)] z-20">
                <div className="relative z-10 max-w-4xl px-6">
                  <span className="text-orange-200 font-bold tracking-widest uppercase text-sm mb-4 block">
                    Step 02 — Architecture
                  </span>
                  <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-8">
                    Blueprinting the{" "}
                    <span className="text-yellow-300">Experience.</span>
                  </h1>
                  <p className="text-orange-50 text-xl md:text-2xl font-medium leading-relaxed">
                    We map out the user journey and information architecture,
                    ensuring every interaction is intentional and frictionless.
                  </p>
                </div>
              </section>

              {/* STAGE 3: DESIGN (Purple/Indigo) */}
              <section className="h-screen mx-3 sticky top-28 p-4 bg-indigo-600 flex items-center justify-center text-center rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.2)] z-30">
                <div className="relative z-10 max-w-4xl px-6">
                  <span className="text-indigo-200 font-bold tracking-widest uppercase text-sm mb-4 block">
                    Step 03 — Design
                  </span>
                  <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-8">
                    Visual Identity <br />&{" "}
                    <span className="text-emerald-300">UI.</span>
                  </h1>
                  <p className="text-indigo-50 text-xl md:text-2xl font-medium leading-relaxed">
                    Our designers craft a high-fidelity visual language that
                    aligns with your brand while prioritizing modern usability
                    standards.
                  </p>
                </div>
              </section>

              {/* STAGE 4: DEVELOPMENT (Slate/Black) */}
              <section className="h-screen mx-3 sticky top-32 p-4 bg-zinc-900 flex items-center justify-center text-center rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.3)] z-40">
                <div className="relative z-10 max-w-4xl px-6">
                  <span className="text-zinc-500 font-bold tracking-widest uppercase text-sm mb-4 block">
                    Step 04 — Engineering
                  </span>
                  <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-8">
                    Built for <span className="text-orange-500">Scale.</span>
                  </h1>
                  <p className="text-zinc-400 text-xl md:text-2xl font-medium leading-relaxed">
                    We translate designs into clean, scalable code using modern
                    stacks like Next.js, ensuring a robust and future-proof
                    foundation.
                  </p>
                </div>
              </section>

              {/* STAGE 5: TRUST (Yellow) */}
              <section className="h-screen mx-3 sticky top-36 p-4 bg-yellow-400 flex items-center justify-center text-center rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] z-50">
                <div className="relative z-10">
                  <h1 className="text-6xl md:text-8xl font-extrabold text-yellow-950 tracking-tighter mb-8">
                    Trusted By <br /> The{" "}
                    <span className="text-white">Bold.</span>
                  </h1>
                  <p className="text-yellow-900 text-xl font-bold max-w-2xl mx-auto opacity-80 mb-12">
                    From ambitious startups to industry leaders, we build the
                    tools that define the next generation of the web.
                  </p>
                </div>
              </section>

              {/* FINAL SECTION - CONTACT */}
              <section id="contact" className="relative w-full p-4 bg-[#fdfbf7] z-[60] rounded-t-[3rem]">
                <div className="relative min-h-screen w-full rounded-[3rem] bg-white border-t border-orange-100 overflow-hidden flex flex-col items-center justify-center text-center px-6">
                  <div className="absolute inset-0 bg-[#fdfbf7] -z-10" />
                  <div className="relative z-10 max-w-2xl">
                    <h1 className="text-6xl md:text-8xl font-extrabold text-black tracking-tighter leading-none">
                      Let's Build <br />
                      <span className="text-orange-500">Legacy.</span>
                    </h1>
                    <p className="text-gray-500 mt-8 text-xl font-medium leading-relaxed">
                      Ready to transform your brand into a digital leader?{" "}
                      <br />
                      Let's bridge the gap between your vision and reality.
                    </p>
                    <div className="mt-10">
                      <Link href="/contact">
                        <button className="bg-black text-white px-12 py-6 rounded-full font-bold text-xl shadow-2xl hover:bg-orange-600 transition-all transform hover:scale-105">
                          Start the Conversation
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* <section className="relative w-full p-4 bg-[#fdfbf7] z-[60]">
              <div className="relative min-h-screen w-full rounded-[3rem] bg-white border border-orange-300 overflow-hidden shadow-sm flex flex-col items-center py-24 px-6">

                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731612_1px,transparent_1px),linear-gradient(to_bottom,#f9731612_1px,transparent_1px)] bg-[size:54px_54px] -z-10" />
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-yellow-200/20 blur-[100px] rounded-full -z-10" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-orange-200/20 blur-[100px] rounded-full -z-10" />


                <div className="relative z-10 text-center mb-16">
                  <div className="inline-flex items-center gap-2 px-3 rounded-full bg-orange-50 border border-orange-100"></div>

                  <h2 className="text-5xl md:text-7xl font-extrabold text-black tracking-tighter leading-[0.9]">
                    Meet our <br />
                    <span className="text-orange-500">Testimonies</span>
                  </h2>
                </div>

                <div className="w-full max-w-7xl mx-auto flex-1">
                  <StaggerTestimonials />
                </div>
              </div>
            </section> */}

            <section className="relative w-full p-4 bg-[#fdfbf7] z-[70]">
              <div className="relative min-h-screen w-full rounded-[3rem] bg-white  border-t border-orange-100 overflow-hidden shadow-sm flex flex-col items-center py-24 px-6">
                {/* Background Textures */}

                {/* Header Section */}
                <div className="relative z-10 text-center mb-20">
                  <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-orange-50 border border-orange-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-wider text-orange-700 uppercase">
                      Common Questions
                    </span>
                  </div>

                  <h2 className="text-6xl md:text-8xl font-extrabold text-black tracking-tighter leading-[0.85]">
                    Got <span className="text-orange-500">questions?</span>{" "}
                    <br />
                    We have answers.
                  </h2>
                </div>

                {/* Accordion Container */}
                <div className="w-full max-w-4xl relative z-10">
                  <FAQSection />
                </div>
              </div>
            </section>

            <section className="relative w-full p-4 bg-[#fdfbf7] z-[70] overflow-hidden">
              <Footer />
            </section>
          </article>
        </main>
      </div>
    </ReactLenis>
  );
}
