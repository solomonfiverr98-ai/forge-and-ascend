"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Results", href: "#results" },
  { label: "Process", href: "#process" },
  { label: "Apply", href: "#apply" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled
          ? "w-[92%] max-w-5xl bg-surface/90 backdrop-blur-xl border border-border shadow-2xl"
          : "w-[92%] max-w-5xl bg-surface/60 backdrop-blur-md border border-border/50"
      } rounded-full px-6 py-3`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" id="navbar-logo">
          <span className="text-gold text-lg transition-transform duration-300 group-hover:rotate-45">
            ✦
          </span>
          <span className="font-heading text-lg font-semibold text-cream tracking-wider">
            FORGE & ASCEND
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              id={`nav-${link.label.toLowerCase()}`}
              className="text-sm font-body text-muted hover:text-cream transition-colors duration-300 tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#apply"
            id="nav-cta"
            className="bg-gold text-background px-5 py-2 rounded-full text-sm font-semibold font-body
              hover:bg-gold-hover transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]"
          >
            Apply Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-cream p-1"
          id="nav-mobile-toggle"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          isOpen ? "max-h-72 mt-4 pb-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-3 border-t border-border pt-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm font-body text-muted hover:text-cream transition-colors px-2 py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#apply"
            onClick={() => setIsOpen(false)}
            className="bg-gold text-background px-5 py-2.5 rounded-full text-sm font-semibold text-center
              hover:bg-gold-hover transition-all duration-300 mt-1"
          >
            Apply Now
          </a>
        </div>
      </div>
    </nav>
  );
}
