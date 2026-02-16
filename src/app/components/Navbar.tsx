'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blogs', label: 'Blogs' },
    { href: '/contact', label: 'Contact' },
  ];

  // Scroll effects
  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY;
      setScrolled(s > 10);

      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(h > 0 ? (s / h) * 100 : 0);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* Scroll Progress Bar — FIXED NO SPACE */}
      <div className="absolute top-0 left-0 w-full h-1 bg-transparent z-50">
        <div
          className="h-1 bg-[color:var(--primary)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className={`w-full backdrop-blur-xs transition-all duration-500
          ${scrolled ? "bg-white/80 dark:bg-dark/80 shadow-md" : "bg-white/0 dark:bg-dark/0"}
        `}
      >

        {/* max-w-7xl */}
        
        <div className="container w-full mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* ------------------ LOGO ------------------ */}
            <Link href="/" className="flex items-center">
              <motion.img
                src="/logos/n_logo.png"
                width="46"
                className="mr-2"
                initial={{ y: -6, scale: 0.95 }}
                animate={{ y: [ -6, 0, -3, 0 ], scale: 1 }}
                whileHover={{ rotate: 360, scale: 0.85 }}
                transition={{ duration: 0.8 }}
              />

              <span className="font-bold text-xl flex">
                {"Nelmar".split("").map((l, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="mx-[1px] text-black dark:text-white hover:text-[#0573fa] transition-colors"
                  >
                    {l}
                  </motion.span>
                ))}
              </span>

            </Link>

            {/* ------------------ DESKTOP MENU ------------------ */}
            <div className="hidden md:flex items-center space-x-8">

              {menuItems.map((item) => {
                const active = pathname === item.href;

                return (
                  <div key={item.href} className="relative group">
                    <Link
                      href={item.href}
                      className={`transition-colors ${
                        active ? "text-primary font-semibold" : "opacity-90"
                      }`}
                    >
                      {item.label}
                    </Link>

                    {/* UNDERLINE — desktop hover only (NO underline if active) */}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] w-full bg-[color:var(--primary)]
                        transition-transform duration-300 origin-left
                        ${active ? "scale-x-0" : "scale-x-0 group-hover:scale-x-100"}
                      `}
                    />
                  </div>
                );
              })}

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2"
              >
                {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </motion.button>
            </div>

            {/* ------------------ MOBILE TOGGLE ------------------ */}
            <motion.button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </motion.button>
          </div>

          {/* ------------------ MOBILE MENU ------------------ */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden"
              >
                <div className="py-4 space-y-3">
                  {menuItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <div key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className={active ? "text-primary font-semibold" : ""}>
                              {item.label}
                            </span>

                            {/* Mobile underline — ONLY if active */}
                            {active && (
                              <span className="h-[2px] w-10 bg-[color:var(--primary)] rounded-full" />
                            )}
                          </div>
                        </Link>
                      </div>
                    );
                  })}

                  {/* Mobile theme toggle */}
                  <button
                    onClick={() => {
                      toggleTheme();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center py-2"
                  >
                    {theme === "dark" ? (
                      <>
                        <SunIcon className="h-5 w-5 mr-2" /> Light Mode
                      </>
                    ) : (
                      <>
                        <MoonIcon className="h-5 w-5 mr-2" /> Dark Mode
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.nav>
    </header>
  );
}
