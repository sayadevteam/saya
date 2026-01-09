"use client"

import * as React from "react" // Import React
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
    name: "Plans",
    url: "#",
    href: "#",
    icon: Info,
  },
]

const Navbar = () => {
  return (
    <div>
        <AnimeNavBar items={items} defaultActive="Home" />
    </div>
  )
}

export default Navbar