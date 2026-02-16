'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHtml5, FaCss3, FaReact, FaFigma, FaCameraRetro } from 'react-icons/fa'
import { SiJavascript, SiAdobephotoshop } from 'react-icons/si'
import Particles from './Particles'

const ORBIT_BASE_RADIUS = 160
const ICON_SIZE = 64 // px

const skillIcons = [
  <FaHtml5 key="html" aria-hidden color="#E34F26" size={ICON_SIZE * 0.6} />,
  <FaCss3 key="css" aria-hidden color="#1572B6" size={ICON_SIZE * 0.6} />,
  <SiJavascript key="js" aria-hidden color="#F7DF1E" size={ICON_SIZE * 0.6} />,
  <FaReact key="react" aria-hidden color="#61DAFB" size={ICON_SIZE * 0.6} />,
  <FaFigma key="figma" aria-hidden color="#F24E1E" size={ICON_SIZE * 0.6} />,
  <SiAdobephotoshop key="ps" aria-hidden color="#31A8FF" size={ICON_SIZE * 0.6} />,
  <FaCameraRetro key="photo" aria-hidden color="#FF6B6B" size={ICON_SIZE * 0.6} />,
]

function cls(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(' ')
}

function HoloCard({ title, subtitle, className = '' }: { title: string; subtitle?: string; className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, rotateX: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      className={cls('w-44 md:w-56 p-4 rounded-2xl shadow-lg transition-all', 'bg-white dark:bg-white/5', 'border border-gray-200 dark:border-white/8', 'backdrop-blur-sm', 'hover:shadow-2xl', className)}
    >
      <div className="text-sm text-gray-500 dark:text-white/60">{subtitle}</div>
      <div className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">{title}</div>
      <div className="mt-3 h-[1px] bg-gray-200 dark:bg-white/10 rounded-full" />
    </motion.div>
  )
}

function CyclingTitle({ titles }: { titles: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setIndex(i => (i + 1) % titles.length), 2400)
    return () => clearInterval(interval)
  }, [titles.length])

  return (
    <div className="h-8 md:h-10 flex items-center justify-center md:justify-start">
      <AnimatePresence mode="wait">
        <motion.div
          key={titles[index]}
          initial={{ y: -18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 14, opacity: 0 }}
          transition={{ duration: 0.56, ease: 'easeOut' }}
          className="text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300"
        >
          {titles[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [mouse, setMouse] = useState({ x: 9999, y: 9999 })
 

  const timeRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const [, tick] = useState(0)
  const lastTick = useRef(0)

  const rect = containerRef.current?.getBoundingClientRect()
  const centerX = (rect?.width ?? 0) / 2
  const centerY = (rect?.height ?? 0) / 2
  const orbitRadius = Math.min(ORBIT_BASE_RADIUS, (rect?.width ?? 900) * 0.36)

  const titles = ['Web Developer', 'Full Stack Developer', 'Graphic Designer', 'Photographer']

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => {
    let last = performance.now()
    const loop = (t: number) => {
      const dt = (t - last) / 1000
      last = t
      timeRef.current += dt * 0.25 // slower rotation
      if (t - lastTick.current > 33) {
        lastTick.current = t
        tick(n => n + 1)
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])


  return (
    <section id="hero-section" ref={containerRef} className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-90 to-white dark:from-gray-950 dark:to-primary">

    <motion.div className="pointer-events-none absolute inset-0 z-10" animate={{ background: `radial-gradient(520px circle at ${mouse.x}px ${mouse.y}px, rgba(34,211,238,0.12), transparent 26%), radial-gradient(320px circle at ${mouse.x}px ${mouse.y}px, rgba(180,140,248,0.06), transparent 44%)` }} transition={{ ease: 'linear', duration: 0.08 }} aria-hidden />

      <Particles />

      <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {skillIcons.map((icon, i) => {
          const angle = (i / skillIcons.length) * Math.PI * 2 + timeRef.current
          const x = centerX + Math.cos(angle) * orbitRadius
          const y = centerY + Math.sin(angle) * orbitRadius * 0.9
          return (
            <motion.div key={`icon-${i}`} style={{ position: 'absolute', left: x - ICON_SIZE / 2, top: y - ICON_SIZE / 2, transform: 'rotate(0deg)' }} className="w-16 h-16 flex items-center justify-center rounded-full bg-white/80 dark:bg-black/30 shadow-lg border border-white/10">
              {icon}
            </motion.div>
          )
        })}
      </div>

      <div className="relative z-20 container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
        <div className="hidden md:flex flex-col gap-6 w-64 items-center">
          <HoloCard title="Design" subtitle="Brand & UI" />
          <HoloCard title="Frontend" subtitle="React / Next.js" />
          <HoloCard title="Motion" subtitle="Framer / Micro-Interactions" />
        </div>

        <div className="flex-1 text-center md:text-left relative py-10 md:py-0">
          <motion.div className="mb-2 text-xl md:text-2xl font-light text-gray-800 dark:text-gray-300" initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.78, ease: 'easeOut', delay: 0.14 }}>Hey, I’m</motion.div>
          <motion.h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-cyan-300 to-violet-400 drop-shadow-lg" initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.78, ease: 'easeOut', delay: 0.2 }}>Nelmar</motion.h1>
          <div className="mt-2 md:mt-4"><CyclingTitle titles={titles} /></div>
          <motion.p className="mt-4 text-base md:text-lg max-w-xl mx-auto md:mx-0 text-gray-700 dark:text-gray-300" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.32 }}>I craft modern, high-performance sites with eye-catching interactions and polished visual identity.</motion.p>
          <motion.div className="mt-8 flex justify-center md:justify-start gap-4" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
            <Link href="/projects" className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-medium shadow-md hover:scale-[1.02] transition-transform">View Work</Link>
            <Link href="/contact" className="px-6 py-3 rounded-lg bg-white/3 text-gray-700 dark:text-gray-200 backdrop-blur-sm border border-primary transition">Let&apos;s build something
</Link>

          </motion.div>


          {/* Social Links — Broken Line Container */}
          <motion.div
              className="mt-6 flex justify-center md:justify-start"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              <div
                className="
                  relative flex items-center gap-6 px-6 py-3 
                  rounded-full 
                  backdrop-blur-md
                  bg-gradient-to-r from-cyan-500/20 to-violet-500/40
                  dark:from-blue-900/20 dark:to-green-900/20
                  border border-white/20 dark:border-white/10                               
                  shadow-lg
                "
              >
             
            {/* Animated Broken Line SVG */}
              {/* <svg
                className="absolute inset-0 pointer-events-none"
                width="100%"
                height="100%"
                viewBox="0 0 400 80"
                preserveAspectRatio="none"
              >
                <rect
                  x="5"
                  y="5"
                  width="390"
                  height="70"
                  rx="40"
                  ry="40"
                  fill="none"
                  strokeWidth="2"
                  strokeDasharray="14 10"
                  className="stroke-gray-900 dark:stroke-white dash-anim"
                />
              </svg> */}

                {/* GitHub Icon */}
                <Link href="https://github.com" target="_blank" className="hover:scale-110 transition text-black dark:text-white text-xl">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                    <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.94c.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.38-3.87-1.38-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.73 1.26 3.4.96.1-.76.4-1.26.72-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.2-3.11-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.19a10.9 10.9 0 0 1 5.8 0c2.2-1.5 3.17-1.19 3.17-1.19.63 1.59.23 2.77.11 3.06.75.81 1.2 1.85 1.2 3.1 0 4.43-2.68 5.41-5.24 5.7.41.36.77 1.07.77 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>
                  </svg>
                </Link>

                {/* LinkedIn Icon */}
                <Link href="https://linkedin.com" target="_blank" className="hover:scale-110 transition text-black dark:text-white text-xl">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                    <path d="M4.98 3.5a2.5 2.5 0 11-.01 5.01 2.5 2.5 0 01.01-5.01zM3 9h4v12H3zM14.5 9c-2.2 0-3.5 1.3-3.5 3.7V21h4v-7.3c0-1 .7-1.7 1.8-1.7 1 0 1.7.7 1.7 1.7V21h4v-7.9c0-3.5-2-6.1-6-6.1z"/>
                  </svg>
                </Link>

              {/* Mail Icon */}
                <Link
                  href="mailto:buncagnelmar@gmail.com"
                  className="hover:scale-110 transition text-black dark:text-white text-xl"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
                    <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </Link>

              </div>
            </motion.div>
        </div>
        <div className="hidden md:block w-44" />
      </div>
    </section>
  )
}
