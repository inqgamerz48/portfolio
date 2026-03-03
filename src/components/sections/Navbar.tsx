'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-void/95 backdrop-blur-sm border-b border-parchment/[0.04]' : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <a href="#" className="font-display text-2xl text-parchment tracking-wider" data-cursor-hover>
            INQ
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                data-cursor-hover
                className="text-mono-sm text-mist hover:text-parchment transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-blood group-hover:w-full transition-all duration-300" />
              </a>
            ))}

            {/* Available for work */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-parchment/[0.06]">
              <span className="status-dot" />
              <span className="text-mono-sm text-green/70">Available</span>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 relative z-50"
            aria-label="Menu"
          >
            <motion.span animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block w-5 h-[1px] bg-parchment origin-center" />
            <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-[1px] bg-parchment" />
            <motion.span animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block w-5 h-[1px] bg-parchment origin-center" />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-void flex flex-col items-start justify-center px-8"
          >
            <div className="flex items-center gap-2 mb-12">
              <span className="status-dot" />
              <span className="text-mono-sm text-green/70">Available for work</span>
            </div>

            <div className="space-y-4">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                  className="block font-display text-6xl text-parchment hover:text-flame transition-colors tracking-wider"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <p className="mt-16 text-mono-sm text-mist">inqgamerz48@gmail.com</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
