'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react'

const titles = [
  { text: 'Full Stack Developer', sub: 'crafting digital systems' },
  { text: 'AI Systems Builder', sub: 'intelligence at scale' },
  { text: 'Product Architect', sub: 'from concept to reality' },
  { text: 'Solo. Fast. Relentless.', sub: 'shipping since 2021' },
]

export function Hero() {
  const [currentTitle, setCurrentTitle] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const title = titles[currentTitle].text
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < title.length) {
          setDisplayText(title.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2500)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentTitle((prev) => (prev + 1) % titles.length)
        }
      }
    }, isDeleting ? 40 : 80)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentTitle])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#06060a]" />

      {/* Mesh gradient */}
      <div className="mesh-gradient" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/5 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(193, 18, 31, 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/5 w-[450px] h-[450px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(234, 88, 12, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto w-full"
      >
        {/* Eyebrow chip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-10"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Full Stack Developer — India
          </span>
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-display text-6xl md:text-8xl lg:text-9xl text-foreground">
            INQ
          </h1>
          <h1 className="text-display text-4xl md:text-6xl lg:text-7xl text-glow-red text-primary-light mt-2">
            SRIRAM
          </h1>
        </motion.div>

        {/* Subtitle with typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-xl md:text-2xl text-foreground/90 font-body">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-[3px] h-[0.9em] bg-primary ml-1 align-middle rounded-full"
            />
          </span>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-mono text-text-muted/60 mt-4 text-sm"
          >
            {titles[currentTitle].sub}
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link href="#projects">
            <button className="btn-primary">
              View Projects
            </button>
          </Link>
          <Link href="#contact">
            <button className="btn-outline">
              Get In Touch
            </button>
          </Link>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex items-center justify-center gap-3"
        >
          {[
            { icon: Github, href: 'https://github.com/inqgamerz48', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/sriram-satya-srivatsa-nanduri-56229a35a', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:nandurisrivatsa91@gmail.com', label: 'Email' },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-text-muted hover:text-primary-light hover:border-primary/30 hover:bg-primary/[0.05] transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon size={18} strokeWidth={1.5} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 2, duration: 1 },
          y: { repeat: Infinity, duration: 2 },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-mono text-text-muted/40 text-[10px] tracking-[0.3em]">SCROLL</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-primary/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}
