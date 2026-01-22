'use client';

import { Poppins } from "next/font/google";
import { useRef, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Image from "next/image";
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import Footer from "@/components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function Contact() {
  const formRef = useRef(null);

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  useEffect(() => {
    // Initialize EmailJS with the public key (user ID)
    if (process.env.NEXT_PUBLIC_USER_ID) {
      emailjs.init(process.env.NEXT_PUBLIC_USER_ID);
    } else {
      console.error('EmailJS User ID is missing');
      toast.error('Configuration error. Please try again later.');
    }
  }, []);

  // Basic email format validation
  const validateForm = () => {
    const form = formRef.current;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

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

  return (
    <div className={`min-h-screen bg-white dark:bg-black text-black dark:text-white ${poppins.className}`}>

      {/* CONTACT SECTION */}
      <section className="px-6 md:px-20 pt-24 pb-24">
        <div className="max-w-7xl mx-auto">

          {/* TYPOGRAPHY HERO */}
          <div className="mb-24">
            <h1 className="text-[14vw] md:text-[10vw] leading-[0.9] font-black uppercase tracking-tight">
              Let’s
              <br />
              Talk<span className="text-yellow-500">.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-gray-500 dark:text-gray-400">
              Tell us what you’re building.  
              We help small businesses turn ideas into powerful websites.
            </p>
          </div>

          {/* FORM + VISUAL GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* FORM CONTAINER */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-3xl p-8 md:p-12 border border-yellow-500/20 dark:border-yellow-400/20 bg-gradient-to-br from-yellow-50/70 via-white/60 to-yellow-100/70
          dark:from-yellow-400/5 dark:via-black/20 dark:to-yellow-500/10 backdrop-blur-sm">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">

              {/* NAME */}
              <div>
                <label className="block text-sm uppercase tracking-widest text-gray-400 mb-2">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className={`w-full bg-transparent border-b text-2xl py-4 outline-none transition
                    ${errors.name ? 'border-red-500' : 'border-gray-600 focus:border-yellow-500'}
                  `}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">
                    Please enter your name
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm uppercase tracking-widest text-gray-400 mb-2">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full bg-transparent border-b text-2xl py-4 outline-none transition
                    ${errors.email ? 'border-red-500' : 'border-gray-600 focus:border-yellow-500'}
                  `}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    Please enter a valid email
                  </p>
                )}
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm uppercase tracking-widest text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Tell us about your project"
                  className={`w-full bg-transparent border-b text-2xl py-4 outline-none resize-none transition
                    ${errors.message ? 'border-red-500' : 'border-gray-600 focus:border-yellow-500'}
                  `}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-2">
                    Please enter a message
                  </p>
                )}
              </div>

              {/* CTA */}
              <div className="pt-6">
                <button
                  type="submit"
                  className=" text-xl font-bold text-black px-10 py-4 bg-orange-500 hover:bg-orange-600 transition hover:scale-[1.05] active:scale-[0.97]">
                  Send Message
                </button>
              </div>

            </form>
          </motion.div>

          {/* RIGHT SIDE BLOBS */}
          <div className="relative hidden lg:flex items-center justify-center w-full h-[520px]">

            {/* YELLOW BLOB (TOP) */}
            <motion.div
              className="absolute -top-100 left-10"
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/blobs/yellow-blob.svg"
                alt="Yellow decorative blob"
                width={400}
                height={400}
                className="opacity-70"
              />
            </motion.div>

            {/* ORANGE BLOB (DIAGONAL BOTTOM) */}
            <motion.div
              className="absolute -bottom-20 -right-15"
              animate={{ y: [0, 20, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/blobs/orange-blob.svg"
                alt="Orange decorative blob"
                width={600}
                height={200}
                className="opacity-80 rotate-12"
              />
            </motion.div>

          </div>

          </div>
        </div>
       
      </section>
      <Footer />
      <Toaster />
    </div>
  );
}
