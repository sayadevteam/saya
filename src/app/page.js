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

const features = [
  {
    title: "Visual Identity",
    desc: "We craft brand guidelines that ensure your business looks consistent and premium across every digital touchpoint.",
    size: "md:col-span-2",
    bg: "bg-orange-500",
    text: "text-white",
    icon: "🎨",
  },
  {
    title: "Conversion SEO",
    desc: "Ranking is only half the battle. We optimize for the clicks that actually turn into customers.",
    size: "md:col-span-1",
    bg: "bg-yellow-100",
    text: "text-yellow-900",
    icon: "📈",
  },
  {
    title: "Ultra Responsive",
    desc: "Your site will feel like a native app on mobile, tablet, and ultra-wide desktops alike.",
    size: "md:col-span-1",
    bg: "bg-white",
    text: "text-gray-800",
    icon: "📱",
  },
  {
    title: "Next-Gen Stack",
    desc: "Built with Next.js 15 and Tailwind CSS for the fastest page speeds and best-in-class developer experience.",
    size: "md:col-span-2",
    bg: "bg-orange-50",
    text: "text-orange-900",
    icon: "⚡",
  },
];

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
            {/* HERO SECTION - STICKY (UNTOUCHED) */}
            <section className="h-screen w-full p-4 bg-[#fdfbf7]">
              <div className="relative h-full w-full rounded-[3rem] bg-white border border-orange-100 overflow-hidden shadow-sm flex flex-col items-center justify-center">
                {/* Background Textures */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731612_1px,transparent_1px),linear-gradient(to_bottom,#f9731612_1px,transparent_1px)] bg-[size:54px_54px]" />
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-yellow-200/20 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-orange-200/20 blur-[100px] rounded-full" />

                {/* Floating UI Elements */}
                <div className="hidden lg:block">
                  <motion.div
                    animate={{ y: [0, -12, 0], rotate: [-4, -2, -4] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute left-16 top-32 bg-yellow-50 p-6 rounded-2xl shadow-xl border border-yellow-200 text-sm max-w-[200px] z-20"
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

                {/* Hero Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10 text-center px-6"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-orange-50 border border-orange-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-wider text-orange-700 uppercase">
                      Built for Creators
                    </span>
                  </div>

                  <h1 className="text-6xl md:text-8xl font-extrabold text-black tracking-tighter leading-[0.85]">
                    Websites <span className="text-orange-500">that work</span>
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
                    <Link href="/our-work">
                      <div className="hover:scale-105 transition-transform duration-300">
                        <ButtonCreativeTop />
                      </div>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* DESCRIPTION SECTION - BENTO GRID CONTENT */}

            <section className=" w-full p-4 bg-[#fdfbf7]">
              <div className="sticky">
                <ReactLenis root>
                  <HorizontalScroll />
                </ReactLenis>
              </div>
            </section>

            {/* THIRD SECTION - ORANGE PROCESS */}
            <section className="h-screen mx-3 sticky top-40 p-4 bg-orange-500 flex items-center justify-center text-center rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.2)]">
              <div className="relative z-10 max-w-3xl">
                <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tighter">
                  Built for <br />{" "}
                  <span className="text-yellow-300 underline decoration-white/20">
                    Growth.
                  </span>
                </h1>
                <p className="text-white/90 mt-8 text-xl font-medium leading-relaxed">
                  Our workflow is designed to eliminate friction and maximize
                  velocity, ensuring your project hits the market while the iron
                  is hot.
                </p>
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Ideate", "Design", "Code", "Scale"].map((step, idx) => (
                    <div
                      key={idx}
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                    >
                      <p className="text-white font-bold text-lg">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FOURTH SECTION - YELLOW SOCIAL PROOF */}
            <section className="h-screen mx-3 sticky top-50 p-4 bg-yellow-400 flex items-center justify-center text-center rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
              <div className="relative z-10">
                <h1 className="text-6xl md:text-8xl font-extrabold text-yellow-950 tracking-tighter">
                  Trusted By <br /> The{" "}
                  <span className="text-white">Bold.</span>
                </h1>
                <p className="text-yellow-900 mt-6 text-xl font-semibold italic">
                  Helping 50+ startups secure over $100M in funding.
                </p>
                <div className="mt-12 flex justify-center gap-8 opacity-40">
                  {/* Placeholder for Logos */}
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-24 bg-yellow-950 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* FINAL SECTION - CONTACT */}
            <section className="h-screen sticky top-0 p-4 bg-[#fdfbf7] flex items-center justify-center text-center">
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
                  <button className="bg-black text-white px-12 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-orange-600 transition-all">
                    Get In Touch
                  </button>
                  <button className="bg-white border border-black/10 text-black px-12 py-5 rounded-full font-bold text-lg hover:bg-gray-50 transition-all">
                    Our Portfolio
                  </button>
                </div>
              </div>
            </section>

            <section className="h-screen w-full p-4 bg-[#fdfbf7]">
              <div className="relative h-full w-full rounded-[3rem] bg-white border border-orange-100 overflow-hidden shadow-sm flex flex-col">
                {/* Background Textures */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731612_1px,transparent_1px),linear-gradient(to_bottom,#f9731612_1px,transparent_1px)] bg-[size:54px_54px]" />
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-yellow-200/20 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-orange-200/20 blur-[100px] rounded-full" />

                <div className="flex flex-col lg:flex-row items-start justify-start mt-16 px-8 gap-12 h-full">
                  {/* Left-aligned Heading */}
                  <div className="flex-1 min-w-0 pt-8">
                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-black leading-tight max-w-lg">
                      What we do at{" "}
                      <span className="text-orange-500 ">SAYA?</span>
                      <div className=" w-full">
                        <Skiper19 />
                      </div>
                    </h1>
                  </div>

                  {/* Path Animation */}
                </div>
              </div>
            </section>
          </article>
        </main>
      </div>
    </ReactLenis>
  );
}
