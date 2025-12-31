'use client';

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface NavLink {
  name: string;
  href?: string;
  submenu?: {
    name: string;
    href: string;
  }[];
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const navLinks: NavLink[] = [
    {
      name: "Home",
      submenu: [
        { name: "Company History", href: "/#home" },
        { name: "Contact Us", href: "/#features" },
        { name: "How It Works", href: "/#process" },
      ],
    },
    { name: "Features", href: "/#features" },
    { name: "About", href: "/#process" },
    { name: "Pricing", href: "/#pricing" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScrollY.current && currentScroll > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-40 bg-white/60 backdrop-blur-md transition-transform duration-400 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 md:px-16 lg:px-24 xl:px-32 border-b border-gray-200">
          {/* Logo */}
          <Image
            src="/assets/logo.svg"
            alt="Logo"
            width={68}
            height={26}
            className="h-7 w-auto md:mr-31"
          />

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-gray-600">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.href ? (
                  <Link
                    href={link.href}
                    className="hover:text-gray-800 transition"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <span className="cursor-pointer hover:text-gray-800 transition">
                    {link.name}
                  </span>
                )}

                {link.submenu && (
                  <div className="absolute left-0 top-full mt-2 w-44 rounded-lg bg-white shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {link.submenu.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Login Button */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition px-5 py-2 text-white rounded-lg"
            >
              Login / Signup
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="transition active:scale-90 md:hidden"
          >
            <Menu className="size-6.5" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`flex flex-col items-center justify-center gap-6 text-lg font-medium fixed inset-0 bg-white/40 backdrop-blur-md z-50 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navLinks.map((link) => (
          <div key={link.name} className="flex flex-col items-center gap-2">
            {link.href && (
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-800"
              >
                {link.name}
              </Link>
            )}
            {link.submenu &&
              link.submenu.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  {item.name}
                </Link>
              ))}
          </div>
        ))}

        <Link
          href="/login"
          onClick={() => setIsOpen(false)}
          className="px-6 py-2.5"
        >
          Login
        </Link>

        <button
          onClick={() => setIsOpen(false)}
          className="rounded-md bg-linear-to-b from-gray-600 to-gray-800 p-2 text-white ring-white active:ring-2"
        >
          <X />
        </button>
      </div>

      <div className="h-18" />
    </>
  );
}
