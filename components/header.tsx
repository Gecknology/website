"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { useConversationalForm } from "@/components/ConversationalFormContext";
import Link from "next/link";

export default function Header() {
  const { openForm } = useConversationalForm();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 grid grid-cols-2 md:grid-cols-3 items-center py-4 px-6 bg-foreground relative">
      <Link href="/" className="text-2xl font-bold justify-self-start text-primary flex items-center gap-2">
        <Image
          src="/Gecknology_logo.png"
          alt="Gecknology Logo"
          width={32}
          height={32}
          className="h-[1em] w-auto align-middle"
          style={{ display: "inline-block" }}
        />
        <h1 className="font-body">Gecknology</h1>
      </Link>
      {/* Desktop nav */}
      <nav className="hidden md:flex gap-6 text-med font-bold justify-self-center">
      <Link href="/features" className="text-primary hover:underline hover:text-accent">Features</Link>
      <Link href="/about" className="text-primary hover:underline hover:text-accent">About</Link>
      <Link href="/contact" className="text-primary hover:underline hover:text-accent">Contact</Link>
      </nav>
      {/* Mobile navigation-menu dropdown */}
      <div className="md:hidden justify-self-end">
      <NavigationMenu className="relative">
        <NavigationMenuList>
        <NavigationMenuItem>
          <button
          aria-label="Open menu"
          className="p-2 rounded focus:outline-none focus:ring"
          onClick={() => setMenuOpen((v) => !v)}
          >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          </button>
          {menuOpen && (
          <div className="absolute -right-6 mt-2 py-4 px-8 bg-foreground rounded-md shadow-lg flex flex-col z-50 text-center w-auto min-w-fit">
            <Button variant="ghost" className="w-full justify-start" asChild>
            <NavigationMenuLink href="/features" onClick={() => setMenuOpen(false)}>Features</NavigationMenuLink>
            </Button>
            <Button variant="ghost" className="w-full justify-start mt-2" asChild>
            <NavigationMenuLink href="/about" onClick={() => setMenuOpen(false)}>About</NavigationMenuLink>
            </Button>
            <Button variant="ghost" className="w-full justify-start mt-2" asChild>
            <NavigationMenuLink href="/contact" onClick={() => setMenuOpen(false)}>Contact</NavigationMenuLink>
            </Button>
            <Button variant="ghost" className="w-full justify-start mt-2" asChild>
            <NavigationMenuLink href="#" onClick={e => { e.preventDefault(); setMenuOpen(false); openForm(); }}>Book Now</NavigationMenuLink>
            </Button>
          </div>
          )}
        </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      </div>
      {/* Desktop button only */}
      <div className="hidden md:block justify-self-end">
      <Button onClick={openForm} variant="outline" className="font-bold">Book Time Now</Button>
      </div>
    </header>
  );
};
