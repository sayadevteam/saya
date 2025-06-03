

import { MoveUpRightIcon } from 'lucide-react';
import React, { useState } from 'react';

const CowboyCarterSlider = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    setTimeout(() => {
      window.location.href = 'https://holmes-find-pgs.vercel.app/';
    }, 500);
  };

  return (
    <div
      data-slider="slide"
      className="flex-none w-[42.5em] h-[28em] transition-opacity duration-400"
    >
      <div className="relative w-full h-full rounded-4xl overflow-hidden font-hanken-grotesk bg-[#161616] shadow-[inset_0_0_150px_rgba(52,46,45,1)] border-4 border-[#232120] text-white">
        <main className="relative w-full h-full p-8 flex items-stretch overflow-hidden">
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-[800px] h-full min-h-[500px] rounded-[50px] transition-all duration-1000 ease-[cubic-bezier(0.17,1,0.33,1)]">
              <div className="relative w-full h-full overflow-hidden transform transition-all duration-600 ease-[cubic-bezier(0.17,1,0.33,1)]">
                <div className="relative h-1/2 max-h-[400px] w-full">
                  <img
                    src="/image.png"
                    alt="HOLMES"
                    className="absolute z-10 top-0 left-0 w-full h-full object-cover rounded-4xl bg-[#161616]"
                  />
                  <img
                    src="/image.png"
                    alt="HOLMES Shadow"
                    className="absolute w-full h-full object-contain brightness-150 saturate-100 blur-[48px]"
                  />
                </div>
                <div className="relative w-full z-10 flex flex-col gap-8 p-8">
                  <div className="flex w-full justify-between items-center">
                    
                    <div className="flex gap-3 hidden md:flex">
                      <p className="text-base font-normal text-white/45">Freelance</p>
                      <div className="w-0.5 h-4 bg-white/30 rounded-sm my-auto"></div>
                      <p className="text-base font-normal text-white/45">React JS</p>
                      <div className="w-0.5 h-4 bg-white/30 rounded-sm my-auto"></div>
                      <p className="text-base font-normal text-white/45">2025</p>
                    </div>
                  </div>
                  <p className="font-normal text-white/65 text-base leading-[140%]">
                  <h1 className="text-4xl font-normal tracking-[0.1em] mb-2">HOLMES</h1>
                    A dynamic search algorithm that leverages advanced filtering and indexing techniques to provide real-time results. The system employs machine learning to understand user intent, offering personalized recommendations while maintaining optimal performance through efficient data structures and caching mechanisms.
                  </p>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-all duration-500 ease-out backdrop-blur-[${[0.5, 1, 3, 7, 16, 32, 64, 128][i]}px]`}
                    style={{
                      zIndex: i + 1,
                      maskImage: `radial-gradient(ellipse at center, rgba(0, 0, 0, 0) ${21 + i * 8}%, rgba(0, 0, 0, 1) ${29 + i * 8}%)`,
                    }}
                  ></div>
                ))}
              </div>
              <div
                className="absolute z-50 top-2 left-2 w-20 h-20 flex items-center justify-center rounded-full backdrop-blur-2xl bg-black/10 hover:bg-black/20 transition-all duration-200 cursor-pointer"
                onClick={handleButtonClick}
              >
                <MoveUpRightIcon
                  color="black"
                  className={`w-5 h-5 transition-transform duration-500  ease-[cubic-bezier(0.32,1.35,0.75,1)] ${
                    isButtonClicked ? 'rotate-[135deg]' : 'rotate-0'
                  }`}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CowboyCarterSlider;