"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ModeToggle } from "../ModeToggle";
import "./menu.css";
import { InstagramIcon,XIcon, LinkedinIcon, TwitchIcon, TwitterIcon, YoutubeIcon, Instagram, } from "lucide-react";
import { RiTwitterXLine } from "react-icons/ri";

const menuLinks = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/work", label: "Our Work" },
  { path: "/contact", label: "Contact Us" },
];

const Menu = () => {
  const router = useRouter();
  const container = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tl = useRef();
  const exitTl = useRef();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useGSAP(
    () => {
      gsap.set(".menu-link-item-holder", { y: 75 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          ease: "power4.inOut",
        })
        .to(
          ".menu-link-item-holder",
          {
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.8"
        );

      exitTl.current = gsap.timeline({ paused: true });
      exitTl.current.to(".menu-overlay", {
        duration: 1,
        clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
        ease: "power4.inOut",
      });
    },
    { scope: container }
  );

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  const handleLinkClick =  (href) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      router.push(href);
    }, 500); // adjust this based on your animation timing
  };

  return (
    <div ref={container} className="menu-wrapper">
      <div className="menu-bar">
        <div className="menu-logo">
          <Link href="/">
            <Image src="/logo.png"
            width={80}
            height={80}
            alt="saya" />
          </Link>
        </div>
        <ModeToggle/>
        <div onClick={toggleMenu} className="menu-toggle">
          <p>MENU</p>
        </div>
      </div>

      <div className="menu-overlay">
        <div className="menu-overlay-bar">
          <div className="menu-logo">
            {/* <Link href="/">
            <Image src="/logo.png"
            width={90}
            height={90}
            alt="saya" />
          </Link> */}
          </div>
          <div onClick={toggleMenu} className="menu-close">
            <p>&#x2715;</p>
          </div>
        </div>

        <div className="menu-content">
          <div className="menu-links">
            {menuLinks.map((link, index) => (
              <div className="menu-link-item" key={index}>
                <div className="menu-link-item-holder">
                  <button
                    onClick={() => handleLinkClick(link.path)}
                    className="menu-link"
                  >
                    {link.label}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="menu-social">
            
          </div>
        </div>

        <div className="menu-contact">
          
          <p>saya.dev@gmail.com</p>
          <p>+91 9136747743</p>
          <p className="menu-social-title">Socials</p>
            <div className="menu-info-col">
              <Link href="https://www.instagram.com/sayadevteam/"><Instagram className="hover:text-pink-600 transition-colors" /></Link>
              {/* <a href="#"><LinkedinIcon/></a> */}
              <Link href="https://x.com/Sayadevteam"><RiTwitterXLine className="w-6 h-6 hover:text-blue-300 transition-colors" /></Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
