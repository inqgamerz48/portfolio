'use client'

import { motion } from 'framer-motion'
import { Send, MessageCircle } from 'lucide-react'

export function Contact() {
  const phoneNumber = '919949357594'
  const whatsappLink = `https://wa.me/${phoneNumber}?text=Hi INQ, I'm interested in working with you.`

  return (
    <section id="contact" className="section-wrapper relative">
      <div className="crimson-glow" />

      <div className="section-inner relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <span className="section-num">006</span>
          <h2 className="section-title">Let's talk about your project</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-mist mb-8">Tell me what you're building. I'll get back you within 24 hours.</p>
            
            <div className="flex flex-col gap-4">
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-2"
                data-cursor-hover
              >
                <MessageCircle size={16} />
                Message on WhatsApp
              </a>
              <a 
                href="mailto:inqbuilds@gmail.com"
                className="btn-ghost flex items-center justify-center gap-2"
                data-cursor-hover
              >
                <Send size={14} />
                Or email me
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <p className="text-mono-sm text-ash mb-1">Email</p>
              <a href="mailto:inqbuilds@gmail.com" className="text-parchment hover:text-flame transition-colors" data-cursor-hover>inqbuilds@gmail.com</a>
            </div>
            <div>
              <p className="text-mono-sm text-ash mb-1">WhatsApp</p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-parchment hover:text-flame transition-colors" data-cursor-hover>+91 9949357594</a>
            </div>
            <div>
              <p className="text-mono-sm text-ash mb-1">Location</p>
              <p className="text-parchment">Nellore, India</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
