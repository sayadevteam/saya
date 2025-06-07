'use client';
import { Orbitron } from "next/font/google";
import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import emailjs from '@emailjs/browser';
import { motion } from "framer-motion";
import { Instagram, Github, Mail, PhoneCall } from "lucide-react";
import Link from 'next/link';
import { RiTwitterXLine } from "react-icons/ri";
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
const orbitron = Orbitron({subsets:["latin"]})

export default function Home() {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const boxRef = useRef(null);
  const imageRef = useRef(null);
  const contactRef = useRef(null);
  const formContainerRef = useRef(null);
  const formRef = useRef(null);
  const largeTextRef = useRef(null);
  const footerRef = useRef(null);
  const [errors, setErrors] = useState({ name: false, email: false, message: false });

  useEffect(() => {
    // Initialize EmailJS with the public key (user ID)
    if (process.env.NEXT_PUBLIC_USER_ID) {
      emailjs.init(process.env.NEXT_PUBLIC_USER_ID);
    } else {
      console.error('EmailJS User ID is missing');
      toast.error('Configuration error. Please try again later.');
    }
  }, []);

  const validateForm = () => {
    const form = formRef.current;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {
      name: !name,
      email: !email || !emailRegex.test(email),
      message: !message,
    };

    setErrors(newErrors);

    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.loading('Sending your query...');
      sendEmail();
    } else {
      toast.error('Please fill in all required fields correctly');
    }
  };

  const sendEmail = () => {
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_USER_ID
      )
      .then(
        () => {
          toast.dismiss(); // Dismiss loading toast
          toast.success('Your query was sent successfully!');
          formRef.current.reset();
          setErrors({ name: false, email: false, message: false });
        },
        (error) => {
          toast.dismiss(); // Dismiss loading toast
          console.error('EmailJS Error:', error.text || error);
          toast.error('Failed to send message. Please try again.');
        }
      );
  };

  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.5,
      effects: true,
    });

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      boxRef.current,
      { x: 0 },
      {
        x: 277,
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      largeTextRef.current,
      { opacity: 0, scale: 1 },
      {
        opacity: 1,
        scale: 1.2,
        duration: 1,
        ease: 'power2.out',
      }
    ).to(largeTextRef.current, {
      opacity: 0,
      scale: 1.5,
      duration: 0.8,
      ease: 'power2.in',
    });

    tl.fromTo(
      formContainerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.4'
    );

    gsap.to(formContainerRef.current, {
      opacity: 1,
      duration: 0,
      delay: 2.5,
    });

    // Footer GSAP animation
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      smoother.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    
    <div ref={wrapperRef} className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white">
      <div ref={contentRef}>
        <div className="flex flex-col items-center justify-start pt-8">
          {/* Contact Us Section */}
          <div ref={contactRef} className="relative mt-12 w-full mx-auto bg-gray-100 dark:bg-black overflow-hidden">
            <div className="hidden dark:block absolute inset-0">
              <ShaderGradientCanvas
                className='w-full h-full'
                pixelDensity={1}
                pointerEvents='none'
              >
                <ShaderGradient
                  animate='on'
                  type='sphere'
                  wireframe={false}
                  shader='defaults'
                  uTime={0}
                  uSpeed={0.3}
                  uStrength={0.3}
                  uDensity={0.8}
                  uFrequency={5.5}
                  uAmplitude={3.2}
                  positionX={-0.1}
                  positionY={0}
                  positionZ={0}
                  rotationX={0}
                  rotationY={130}
                  rotationZ={70}
                  color1='#73bfc4'
                  color2='#ff810a'
                  color3='#8da0ce'
                  reflection={0.4}
                  cAzimuthAngle={270}
                  cPolarAngle={180}
                  cDistance={0.5}
                  cameraZoom={15.1}
                  lightType='env'
                  brightness={0.8}
                  envPreset='city'
                  grain='on'
                  toggleAxis={false}
                  zoomOut={false}
                  hoverState=''
                  enableTransition={false}
                />
              </ShaderGradientCanvas>
              {/* Fade overlays for smooth integration */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
            </div>
            <div
              ref={largeTextRef}
              className="fixed mb-72 inset-0 flex items-center justify-center text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gold-400 dark:to-gold-600 z-50 pointer-events-none dark:text-yellow-500"
            >
              Contact Us
            </div>
            <div ref={formContainerRef} className="relative bg-gray-100 dark:bg-transparent rounded-lg p-6 max-w-6xl mx-auto">
              {/* --- Contact Form --- */}
              <div>
                {/* <h2 className='text-sm font-bold text-center dark:text-gold-400'>
                  Contact Us
                </h2> */}
                <h2 className="text-5xl mt-20 font-bold text-center text-yellow-500 dark:text-gold-400">
                  Get in Touch with us
                </h2>
                <p className="text-gray-600 dark:text-white mt-2 text-center">
                  Reach out for any business plan in your mind
                </p>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 mt-10 px-4 sm:px-10 md:px-20 lg:px-40">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white font-sans">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder='Enter your name'
                      className={`w-full mt-1 p-3 border-1 border-gray-300 dark:border-gold-600 rounded-lg bg-white dark:bg-black/50 text-white dark:text-white/200 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gold-400 focus:border-transparent transition hover:border-gray-400 dark:hover:border-gold-500 ${errors.name ? 'border-red-500' : ''}`}
                      required
                      aria-describedby="name-error"
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-500 text-sm mt-1">
                        Please enter a valid name
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white font-sans">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder='Enter your email'
                      className={`w-full mt-1 p-3 border-1 text-white dark:text-white/200 border-gray-300 dark:border-gold-600 rounded-lg bg-white dark:bg-black/50 text-black dark:text-gold-200 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gold-400 focus:border-transparent transition hover:border-gray-400 dark:hover:border-gold-500 ${errors.email ? 'border-red-500' : ''}`}
                      required
                      aria-describedby="email-error"
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-500 text-sm mt-1">
                        Please enter a valid email
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-white font-sans">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder='Enter your needs'
                      rows="4"
                      className={`w-full mt-1 p-3 border-1 text-white dark:text-white/200 border-gray-300 dark:border-gold-600 rounded-lg bg-white dark:bg-black/50 text-black dark:text-gold-200 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gold-400 focus:border-transparent transition hover:border-gray-400 dark:hover:border-gold-500 ${errors.message ? 'border-red-500' : ''}`}
                      required
                      aria-describedby="message-error"
                    ></textarea>
                    {errors.message && (
                      <p id="message-error" className="text-red-500 text-sm mt-1">
                        Please enter a message
                      </p>
                    )}
                  </div>
                  <div className='flex justify-center'>
                    <button
                      type="submit"
                      className="py-3 px-4 bg-yellow-500 cursor-pointer dark:bg-gradient-to-r dark:from-gold-300 dark:to-gold-500 text-white rounded-lg shadow-md hover:bg-black hover:text-white dark:hover:from-gold-400 dark:hover:to-gold-600 transition ease-in duration-300"
                    >
                      Send your request
                    </button>
                  </div>
                </form>
                
              </div>
             
            </div>
          </div>
        </div>
        <div className={orbitron.className}>
      <motion.div
        ref={footerRef}
        className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">SAYA</h3>
            <p className="text-gray-400">
              Building digital experiences that matter.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact</h3>
            <div className="flex items-center gap-3">
              <Mail />
              <span className="text-gray-300 hover:text-white transition-colors">
                saya.devteam@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneCall />
              <span className="text-gray-300 hover:text-white transition-colors">
                +91 9136747743
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Connect</h3>
            <div className="flex gap-4">
              <motion.div whileHover={{ scale: 1.1 }} className="inline-block">
                <Link href="https://www.instagram.com/sayadevteam/">
                  <Instagram className="w-6 h-6 hover:text-pink-600 transition-colors" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="inline-block">
                <Link href="https://x.com/Sayadevteam">
                  <RiTwitterXLine className="w-6 h-6 hover:text-blue-300 transition-colors" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Saya Dev Team. All rights reserved.</p>
        </div>
      </motion.div>
      </div>
      </div>

      {/* Modern Footer */}

      <Toaster />
    </div>

  );
}