'use client';
import { useEffect, useRef } from 'react';
import { animate, scroll, spring } from 'motion';
import { ReactLenis } from 'lenis/react';

export function HorizontalScroll() {
  const containerRef = useRef(null);
  const ulRef = useRef(null);

  useEffect(() => {
    const items = ulRef.current?.querySelectorAll('li');
    if (!ulRef.current || !items || !containerRef.current) return;

    // 1. Calculate the total horizontal distance to travel
    const xTranslation = -(items.length - 1) * 100;

    const controls = animate(
      ulRef.current,
      { transform: `translateX(${xTranslation}vw)` },
      { easing: "linear" }
    );

    // 2. Link the animation to the vertical scroll of the containerRef
    scroll(controls, {
      target: containerRef.current,
      offset: ["start start", "end end"]
    });

    // 3. Header animations
    const segmentLength = 1 / items.length;
    items.forEach((item, i) => {
      const header = item.querySelector('h2');
      if (header) {
        scroll(animate(header, { 
          scale: [0.8, 1.1, 1],
          opacity: [0, 1, 0.8],
          y: [50, 0, -20]
        }), {
          target: containerRef.current,
          offset: [
            `${i * segmentLength} start`, 
            `${(i + 1) * segmentLength} end`
          ],
        });
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="relative h-[400vh] ">
      {/* This div stays fixed on screen while we scroll the 400vh height */}
      <div className="h-screen mx-3 sticky top-40 p-4 rounded-t-[3rem] my-3 rounded-b-[3rem]  overflow-hidden">
        <ul ref={ulRef} className="flex h-[60vh] transition-transform will-change-transform">
          {/* Slide 1 */}
          <li className="h-full w-screen flex-shrink-0 flex flex-col justify-center items-center px-10">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-12 w-full max-w-5xl mt-10 h-full flex flex-col items-center justify-center shadow-2xl">
              <h2 className="text-7xl font-black text-black mb-8">PASSION</h2>
              <div className="w-48 h-48 bg-orange-200 rounded-2xl flex items-center justify-center text-4xl font-bold text-orange-600">01</div>
            </div>
          </li>

          {/* Slide 2 */}
          <li className="h-full w-screen flex-shrink-0 flex flex-col justify-center items-center px-10">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-12 w-full max-w-5xl h-full flex flex-col items-center justify-center shadow-2xl">
              <h2 className="text-7xl font-black text-black mb-8">WORK</h2>
              <div className="w-48 h-48 bg-blue-200 rounded-2xl flex items-center justify-center text-4xl font-bold text-blue-600">02</div>
            </div>
          </li>

          {/* Slide 3 */}
          <li className="h-full w-screen flex-shrink-0 flex flex-col justify-center items-center px-10">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-12 w-full max-w-5xl h-full flex flex-col items-center justify-center shadow-2xl">
              <h2 className="text-7xl font-black text-black mb-8">VISION</h2>
              <div className="w-48 h-48 bg-emerald-200 rounded-2xl flex items-center justify-center text-4xl font-bold text-emerald-600">03</div>
            </div>
          </li>

          {/* Slide 4 */}
          <li className="h-full w-screen flex-shrink-0 flex flex-col justify-center items-center px-10">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-12 w-full max-w-5xl h-full flex flex-col items-center justify-center shadow-2xl">
              <h2 className="text-7xl font-black text-black mb-8">GROWTH</h2>
              <div className="w-48 h-48 bg-purple-200 rounded-2xl flex items-center justify-center text-4xl font-bold text-purple-600">04</div>
            </div>
          </li>

          {/* Slide 5 */}
          <li className="h-full w-screen flex-shrink-0 flex flex-col justify-center items-center px-10">
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl p-12 w-full max-w-5xl h-full flex flex-col items-center justify-center shadow-2xl">
              <h2 className="text-7xl font-black text-black mb-8">CREATIVITY</h2>
              <div className="w-48 h-48 bg-pink-200 rounded-2xl flex items-center justify-center text-4xl font-bold text-pink-600">05</div>
            </div>
          </li>

          {/* Slide 6 */}
          <li className="h-full w-screen flex-shrink-0 flex flex-col justify-center items-center px-10">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-3xl p-12 w-full max-w-5xl h-full flex flex-col items-center justify-center shadow-2xl">
              <h2 className="text-7xl font-black text-black mb-8">INNOVATION</h2>
              <div className="w-48 h-48 bg-indigo-200 rounded-2xl flex items-center justify-center text-4xl font-bold text-indigo-600">06</div>
            </div>
          </li>

          {/* Slide 7 */}
          <li className="h-full w-screen flex-shrink-0 flex flex-col justify-center items-center px-10">
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-3xl p-12 w-full max-w-5xl h-full flex flex-col items-center justify-center shadow-2xl">
              <h2 className="text-7xl font-black text-black mb-8">TRUST</h2>
              <div className="w-48 h-48 bg-teal-200 rounded-2xl flex items-center justify-center text-4xl font-bold text-teal-600">07</div>
            </div>
          </li>
        </ul>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731612_1px,transparent_1px),linear-gradient(to_bottom,#f9731612_1px,transparent_1px)] bg-[size:54px_54px]" />
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-yellow-200/20 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-orange-200/20 blur-[100px] rounded-full" />
      </div>
    </div>
  );
}
