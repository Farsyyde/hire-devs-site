"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (mobileOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-black font-bold text-xl">
            LaunchKit
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/founders" className="text-gray-700 hover:text-black transition-colors">
              Founders
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-black transition-colors">
              Contact
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-black transition-colors">
              Resources
            </Link>
          </div>
        </div>

        {/* Right: CTA */}
        <div className="hidden md:flex">
          <Link
            href="/contact"
            className="btn-primary"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Open menu"
          className="md:hidden inline-flex items-center justify-center rounded p-2 text-gray-700 hover:text-black hover:bg-gray-100"
          onClick={() => setMobileOpen(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />

          {/* sheet */}
          <div className="absolute inset-y-0 right-0 w-full sm:w-[380px] bg-white border-l border-gray-200 shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <span className="text-black font-bold text-xl">LaunchKit</span>
              <button
                aria-label="Close menu"
                className="rounded p-2 text-gray-700 hover:text-black hover:bg-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              <Link 
                href="/founders" 
                onClick={() => setMobileOpen(false)} 
                className="block text-gray-700 hover:text-black py-2"
              >
                Founders
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setMobileOpen(false)} 
                className="block text-gray-700 hover:text-black py-2"
              >
                Contact
              </Link>
              <Link 
                href="/resources" 
                onClick={() => setMobileOpen(false)} 
                className="block text-gray-700 hover:text-black py-2"
              >
                Resources
              </Link>

              <div className="h-px bg-gray-200 my-4" />

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}