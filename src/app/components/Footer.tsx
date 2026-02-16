'use client'

import Link from 'next/link'
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion'

// Wave animation for each letter
const letterWave = {
  hidden: { opacity: 0, y: 20, rotate: -10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      delay: i * 0.07, // wave delay per letter
    },
  }),
}

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-dark border-t border-gray-200 dark:border-gray-800">
      <div className="container w-full mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">

          {/* ---------- Animated Nelmar (Wave) ---------- */}
          <div className="mb-4 md:mb-0">
            <Link href="/" className="flex text-xl font-black">

              <span className="flex">
                {"Nelmar  S. Buncag".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterWave}
                    initial="hidden"
                    animate="show"
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="mx-[1px] text-black dark:text-white hover:text-[#0573fa] transition-colors"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>

            </Link>

            <p className="text-sm text-secondary mt-2">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* ---------- Social Icons ---------- */}
          <div className="flex space-x-6">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-primary transition-colors"
            >
              <FaGithub className="h-6 w-6" />
            </a>

            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-primary transition-colors"
            >
              <FaTwitter className="h-6 w-6" />
            </a>

            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-primary transition-colors"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}
