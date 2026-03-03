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
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Clean dark background */}
      <div className="absolute inset-0 bg-[#030003]" />
      
      {/* Subtle gradient orbs - positioned and sized better */}
      <motion.div 
        className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(185, 28, 28, 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(234, 88, 12, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto w-full"
      >
        {/* Eyebrow - centered, clean */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8"
        >
          <span className="inline-block text-mono text-primary/80 tracking-[0.5em] text-xs">
            Full Stack Developer — India
          </span>
        </motion.div>

        {/* Main title - centered, balanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center mb-6"
        >
          <h1 className="text-display text-6xl md:text-8xl lg:text-9xl text-foreground">
            INQ
          </h1>
          <h1 className="text-display text-4xl md:text-6xl lg:text-7xl text-primary/90">
            SRIRAM
          </h1>
        </motion.div>

        {/* Subtitle with typewriter - centered */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-xl md:text-2xl text-foreground/90">
            {displayText}
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-[3px] h-[0.9em] bg-primary ml-1 align-middle"
            />
          </span>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-mono text-text-muted mt-3 text-sm"
          >
            {titles[currentTitle].sub}
          </motion.p>
        </motion.div>

        {/* CTA Buttons - centered, clean */}
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

        {/* Social links - centered */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex items-center justify-center gap-8"
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
              className="text-text-muted hover:text-primary transition-colors duration-300 p-2"
              aria-label={social.label}
            >
              <social.icon size={20} strokeWidth={1.5} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator - centered */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ 
          opacity: { delay: 2, duration: 1 },
          y: { repeat: Infinity, duration: 2 }
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-mono text-text-muted/50 text-[10px] tracking-[0.3em]">SCROLL</span>
          <ArrowDown size={14} className="text-primary/50" strokeWidth={1} />
        </div>
      </motion.div>
    </section>
  )
}
