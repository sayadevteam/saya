"use client"

import * as React from "react"
import { Home, FileText, CreditCard, Info } from "lucide-react"
import { AnimeNavBar } from "@/components/ui/anime-navbar"
import { Button } from "./ui/button"

// Inside Navbar component
const items = [
  {
    name: "Home",
    url: "#hero", // Matches <section id="hero">
    icon: Home,
  },
  {
    name: "Description",
    url: "#description", // Matches <section id="description">
    icon: FileText,
  },
  {
    name: "Workflow",
    url: "#workflow", // Matches <div id="workflow">
    icon: CreditCard,
  },
  {
    name: "Contact",
    url: "#contact", // Matches <section id="contact">
    icon: Info,
  },
]

const Navbar = () => {
  return (
    <div className="h-24 flex items-center justify-between pt-5">
      {/* AnimeNavBar handles ALL alignment internally */}
      <AnimeNavBar 
        items={items} 
        defaultActive="Home" 
      />
    </div>
  )
}

export default Navbar
