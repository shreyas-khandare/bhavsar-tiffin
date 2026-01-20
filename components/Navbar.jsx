"use client";

import Image from "next/image";

export default function Navbar({ onPlans, onMenu, onAbout, onContact }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-2">

        {/* LOGO */}
        <div className="flex items-center">
          <Image
            src="/logo5.png"
            alt="Bhavsar Tiffin Logo"
            width={130}
            height={36}
            priority
            className="object-contain"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-6 text-[15px] font-medium">
          <button onClick={onPlans} className="hover:text-green-600 transition">Plans</button>
          <button onClick={onMenu} className="hover:text-green-600 transition">Menu</button>
          <button onClick={onAbout} className="hover:text-green-600 transition">About</button>
          <button onClick={onContact} className="hover:text-green-600 transition">Contact</button>
        </div>

        {/* Mobile Nav */}
        <div className="flex sm:hidden gap-2">
          <button onClick={onPlans} className="px-2 py-1 border rounded text-xs">Plans</button>
          <button onClick={onMenu} className="px-2 py-1 border rounded text-xs">Menu</button>
          <button onClick={onAbout} className="px-2 py-1 border rounded text-xs">About</button>
          <button onClick={onContact} className="px-2 py-1 border rounded text-xs">Contact</button>
        </div>

      </div>
    </nav>
  );
}
