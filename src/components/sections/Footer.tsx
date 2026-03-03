'use client'

import { Github, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#040408]">
      {/* Top gradient border */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & tagline */}
          <div className="text-center md:text-left">
            <span className="font-display text-3xl text-foreground">
              INQ
            </span>
            <p className="text-text-muted/50 text-sm mt-2">
              Solo. Fast. Relentless.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
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
                className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-text-muted hover:text-primary-light hover:border-primary/20 hover:bg-primary/[0.04] transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={16} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.04] my-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-text-muted/40 text-xs">
            © {currentYear} INQ. All rights reserved.
          </p>
          <p className="text-text-muted/40 text-xs">
            Built with <span className="text-primary-light/60">intention</span>, not templates.
          </p>
        </div>
      </div>
    </footer>
  )
}
