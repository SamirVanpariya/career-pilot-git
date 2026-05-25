"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu as MenuIcon, Search, Bell, X } from "lucide-react";

export default function Header() {
  const [activeLink, setActiveLink] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Register", href: "/register" },
    { name: "Login", href: "/login" },
    { name: "Forgot Password", href: "/forgot-password" },
    { name: "Reset Password", href: "/reset-password" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[#0D0D0E]/85 backdrop-blur-md shadow-lg shadow-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* LEFT - Logo */}
          <Link href="/" className="flex items-center space-x-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center shadow-md">
              <span className="font-black text-white text-lg">P</span>
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-sm text-white">
                Precision & Flow
              </span>
              <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">
                Design System
              </span>
            </div>
          </Link>

          {/* CENTER - Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveLink(link.name)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase transition-all ${
                  activeLink === link.name
                    ? "bg-white/5 text-white border border-white/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT */}
          <div className="flex items-center space-x-3.5">
            {/* Search */}
            <div className="hidden lg:flex items-center relative w-56">
              <Search className="absolute left-3 text-zinc-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 text-xs bg-[#161618] border border-[var(--color-border)] rounded-lg text-white"
              />
            </div>

            {/* Bell */}
            <button className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-[#161618] border border-transparent hover:border-zinc-700 relative">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-[#0D0D0E]" />
            </button>

            {/* User */}
            <button className="hidden sm:flex items-center space-x-2 pl-2.5 pr-1.5 py-1 rounded-full bg-[#161618] border border-[var(--color-border)]">
              <span className="text-xs font-bold text-zinc-300">
                Geist Admin
              </span>

              <Image
                src="https://i.pravatar.cc/40"
                alt="User"
                width={28}
                height={28}
                className="rounded-full"
              />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-[#161618] border border-[var(--color-border)]"
            >
              <MenuIcon size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE SIDEBAR ================= */}
      <div
        className={`fixed inset-0 z-50 transition-all ${
          mobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`absolute inset-0 bg-black/60 transition-opacity ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Sidebar */}
        <div
          className={`absolute left-0 top-0 h-full w-72 bg-[#0D0D0E] border-r border-zinc-800 p-5 transform transition-transform ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Top */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-white font-bold">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="text-white" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.name);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-lg text-sm ${
                  activeLink === link.name
                    ? "bg-white/10 text-white"
                    : "text-zinc-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
