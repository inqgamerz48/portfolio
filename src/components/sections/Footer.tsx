'use client'

import { Github, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-16 px-6 md:px-12 lg:px-24 bg-[#020202]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & tagline */}
          <div className="text-center md:text-left">
            <span className="font-display text-3xl text-foreground">
              INQ
            </span>
            <p className="text-text-muted text-sm mt-2">
              Solo. Fast. Relentless.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6">
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
                className="text-text-muted hover:text-foreground transition-colors duration-300"
                aria-label={social.label}
              >
                <social.icon size={18} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-card-border my-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-text-muted text-xs">
            © {currentYear} INQ. All rights reserved.
          </p>
          <p className="text-text-muted text-xs">
            Built with <span className="text-primary">intention</span>, not templates.
          </p>
        </div>
      </div>
    </footer>
  )
}
