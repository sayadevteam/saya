'use client';
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import Link from 'next/link';
const pathArr = [
  // S - Fully rounded, consistent 20px radius
  'M0 20Q0 0 20 0H80V30H30Q20 30 20 40V45Q20 55 30 55H70Q80 55 80 65V100Q80 120 60 120H0V90H50Q60 90 60 80V75Q60 65 50 65H10Q0 65 0 55V20Z',
  
  // A - Rounded apex and smooth crossbar transition
  'M100 120L130 15Q135 0 145 0Q155 0 160 15L190 120H165L160 90H130L125 120H100ZM135 70H155L145 35L135 70Z',
  
  // Y - NOW ROUNDED: Curves at the top corners and the junction
  'M200 0C205 50 225 70 230 90V120H260V90C265 70 285 50 290 0H265C260 30 255 45 245 45C235 45 230 30 225 0H200Z',
  
  // A - Repeated with identical rounding
  'M300 120L330 15Q335 0 345 0Q355 0 360 15L390 120H365L360 90H330L325 120H300ZM335 70H355L345 35L335 70Z'
];
const Footer = () => {
  const container = useRef(null);
  const [openPopup, setOpenPopUp] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref);
  const variants = {
    visible: (i) => ({
      translateY: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
        duration: 0.4,
        delay: i * 0.03,
      },
    }),
    hidden: { translateY: 200 },
  };
  const handleNewsLetterData = (e) => {
    e.preventDefault();
    console.log(e);
    e.preventDefault();
    const target = e.target;
    const formData = new FormData(target);
    const clientEmail = formData.get('newsletter_email');
    setOpenPopUp(true);
    target.reset();
    if (setOpenPopUp) {
      setTimeout(() => {
        setOpenPopUp(false);
      }, 2000);
    }
  };
  return (
    <>
    
      <div
        className="relative h-full sm:pt-14 pt-8 bg-white rounded-[3rem] text-black"
        ref={container}
      >
        
        <div className="sm:container  px-4 mx-auto">
            
          <div className="md:flex justify-between w-full">
            
            <div>

              <h1 className="md:text-4xl text-2xl font-semibold">
                Let&lsquo;s do great work together
              </h1>
              <div className="pt-2 pb-6 md:w-99  ">
                <p className="md:text-2xl text-xl  py-4">
                  Sign up for our newsletter*
                </p>
                <div className=" hover-button relative bg-black flex justify-between items-center border-2 overflow-hidden  border-black rounded-full  text-white hover:text-black md:text-2xl">
                  <form
                    onSubmit={(e) => handleNewsLetterData(e)}
                    className="relative z-2 grid grid-cols-6  w-full h-full"
                  >
                    <input
                      type="email"
                      name="newsletter_email"
                      className="border-none bg-transparent text-white   py-3 px-6  col-span-5"
                      placeholder="Your Email * "
                    />{' '}
                    <button
                      type="submit"
                      className="cursor-pointer w-full hover:bg-primaryColor bg-white text-white h-full cols-span-1"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        className="w-full h-[80%] "
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                          fill="#000"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="flex gap-10">
              <ul>
                <li className="text-2xl pb-2 text-black font-semibold">
                  SITEMAP
                </li>
                <li className="text-xl font-medium">
                  <Link href="/">Home</Link>
                </li>
                <li className="text-xl font-medium">
                  <Link href="/about">About us</Link>
                </li>
                <li className="text-xl font-medium">
                  <Link href="/services">Our Services</Link>
                </li>

                <li className="text-xl font-medium">
                  <Link href="/projects">Projects</Link>
                </li>
                <li className="text-xl font-medium">
                  <Link href="/contact-us">Contact</Link>
                </li>
              </ul>
              <ul>
                <li className="text-2xl pb-2 text-black font-semibold">
                  SOCIAL
                </li>
                <li className="text-xl font-medium">
                  <a
                    href="https://www.linkedin.com/company/next-codez/"
                    target="_blank"
                    className="underline"
                  >
                    LinkedIn
                  </a>
                </li>
                <li className="text-xl font-medium">
                  <a
                    href="https://twitter.com/NextCodez"
                    target="_blank"
                    className="underline"
                  >
                    Twitter
                  </a>
                </li>
                <li className="text-xl font-medium">
                  <a
                    href="https://www.instagram.com/nextcodez/"
                    target="_blank"
                    className="underline"
                  >
                    Instagram
                  </a>
                </li>
                <li className="text-xl font-medium">
                  <a
                    href="https://www.facebook.com/nextcodezz"
                    target="_blank"
                    className="underline"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-y-2 md:py-4 border-gray-200">
            <motion.svg
              width="776"
              ref={ref}
              height="137"
              viewBox="0 0 776 137"
              fill="none"
              className="sm:h-fit h-20 md:px-8 px-2 mt-1 footer-logo w-full"
              xmlns="http://www.w3.org/2000/svg"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {pathArr.map((path, index) => {
                return (
                  <>
                    <motion.path
                      custom={index}
                      variants={variants}
                      d={path}
                      fill="#FF6900"
                    />
                  </>
                );
              })}
            </motion.svg>
          </div>
          <div className="flex md:flex-row flex-col-reverse gap-3 justify-between py-2">
            <span className="font-medium">
              &copy; 2026 SAYA. All Rights Reserved.
            </span>
            <a href="#" className="font-semibold">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
