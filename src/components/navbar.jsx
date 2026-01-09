"use client"

import * as React from "react"
import { Home, FileText, CreditCard, Info } from "lucide-react"
import { AnimeNavBar } from "@/components/ui/anime-navbar"
import { Button } from "./ui/button"

const items = [
  {
    name: "Home",
    url: "#",
    href: "#",
    icon: Home,
  },
  {
    name: "Description",
    url: "#",
    href: "#",
    icon: FileText,
  },
  {
    name: "Workflow",
    url: "#",
    href: "#",
    icon: CreditCard,
  },
  {
    name: "Testimonials",
    url: "#",
    href: "#",
    icon: Info,
  },
  {
    name: "Contact",
    url: "/contact",
    href: "#",
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
