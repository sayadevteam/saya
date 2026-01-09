'use client';
import { useEffect, useRef } from 'react';
import { animate, scroll } from 'motion';

const CARDS = [
  { title: "What is SAYA?", desc: "We are architects of the modern web, bridging the gap between bold ideas and functional reality.", color: "from-orange-50 to-orange-100", accent: "text-orange-600", bg: "bg-orange-200" },
  { title: "A Digital-First Agency.", desc: "A collective of developers and designers dedicated to pushing the boundaries of the web.", color: "from-blue-50 to-blue-100", accent: "text-blue-600", bg: "bg-blue-200" },
  { title: "Driven by Innovation.", desc: "We don’t just follow trends; we analyze behavior to build websites that stay ahead of the curve.", color: "from-emerald-50 to-emerald-100", accent: "text-emerald-600", bg: "bg-emerald-200" },
  { title: "Bespoke Development.", desc: "From complex SaaS to sleek corporate sites, we build custom solutions tailored to your goals.", color: "from-purple-50 to-purple-100", accent: "text-purple-600", bg: "bg-purple-200" },
  { title: "User-Centric Design.", desc: "We create intuitive interfaces that reduce friction and turn visitors into loyal customers.", color: "from-pink-50 to-pink-100", accent: "text-pink-600", bg: "bg-pink-200" },
  { title: "Performance First.", desc: "We optimize every millisecond. Our sites are lightning-fast, secure, and built to rank.", color: "from-indigo-50 to-indigo-100", accent: "text-indigo-600", bg: "bg-indigo-200" },
  { title: "Scalable Architecture.", desc: "Using modern stacks like Next.js to ensure your platform grows with your ambition.", color: "from-teal-50 to-teal-100", accent: "text-teal-600", bg: "bg-teal-200" },
  { title: "Your Tech Partner.", desc: "We view ourselves as an extension of your team, providing support long after launch.", color: "from-cyan-50 to-cyan-100", accent: "text-cyan-600", bg: "bg-cyan-200" },
  { title: "Strategic Impact.", desc: "Transforming your vision into high-performing digital assets that drive real growth.", color: "from-red-50 to-red-100", accent: "text-red-600", bg: "bg-red-200" },
  { title: "Ready to Build?", desc: "Your next digital breakthrough starts here. Let’s create something extraordinary together.", color: "from-yellow-50 to-yellow-100", accent: "text-yellow-600", bg: "bg-yellow-200" },
];

export function HorizontalScroll() {
  const containerRef = useRef(null);
  const ulRef = useRef(null);

  useEffect(() => {
    const items = ulRef.current?.querySelectorAll('li');
    if (!ulRef.current || !items || !containerRef.current) return;

    const xTranslation = -(items.length - 1) * 100;

    const controls = animate(
      ulRef.current,
      { transform: `translateX(${xTranslation}vw)` },
      { easing: "linear" }
    );

    scroll(controls, {
      target: containerRef.current,
      offset: ["start start", "end end"]
    });

    items.forEach((item, i) => {
      const content = item.querySelector('.content-box');
      if (content) {
        scroll(animate(content, { 
          scale: [0.9, 1, 0.9],
          opacity: [0.5, 1, 0.5],
        }), {
          target: containerRef.current,
          offset: [`${(i / items.length)} start`, `${((i + 1) / items.length)} end`],
        });
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="relative h-[1000vh]">
      <div className="h-screen sticky top-0 flex items-center overflow-hidden">
        <ul ref={ulRef} className="flex will-change-transform">
          {CARDS.map((card, idx) => (
            <li key={idx} className="h-full w-screen flex-shrink-0 flex items-center justify-center px-10">
              <div className={`content-box bg-gradient-to-br ${card.color} rounded-[3rem] p-16 w-full max-w-6xl h-[70vh] flex flex-col items-center justify-center shadow-2xl text-center`}>
                <h2 className="text-6xl md:text-8xl font-black text-black mb-6 leading-tight">
                  {card.title}
                </h2>
                <p className="text-xl md:text-2xl text-black max-w-2xl mb-10 font-medium">
                  {card.desc}
                </p>
                
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}