'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xykdonjo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) { setStatus('success'); setFormData({ name: '', email: '', message: '' }) }
      else { setStatus('error') }
    } catch { setStatus('error') }
  }

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
          <h2 className="section-title">Contact</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            <div>
              <label className="text-mono-sm text-ash block mb-2">Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-dark" placeholder="Your name" required />
            </div>
            <div>
              <label className="text-mono-sm text-ash block mb-2">Email</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input-dark" placeholder="your@email.com" required />
            </div>
            <div>
              <label className="text-mono-sm text-ash block mb-2">Message</label>
              <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="input-dark" placeholder="Tell me about your project..." rows={5} required />
            </div>

            <button type="submit" disabled={status === 'sending'} className="btn-primary" data-cursor-hover>
              {status === 'sending' ? 'Sending...' : 'Send Message'} <Send size={12} />
            </button>

            {status === 'success' && <p className="text-mono-sm text-green mt-3">Message sent. I&apos;ll respond soon.</p>}
            {status === 'error' && <p className="text-mono-sm text-flame mt-3">Something went wrong. Try again.</p>}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8 lg:pt-6"
          >
            <div>
              <p className="text-mono-sm text-ash mb-1">Email</p>
              <a href="mailto:inqgamerz48@gmail.com" className="text-parchment hover:text-flame transition-colors" data-cursor-hover>inqgamerz48@gmail.com</a>
            </div>
            <div>
              <p className="text-mono-sm text-ash mb-1">GitHub</p>
              <a href="https://github.com/inqgamerz48" target="_blank" rel="noopener noreferrer" className="text-parchment hover:text-flame transition-colors" data-cursor-hover>github.com/inqgamerz48</a>
            </div>
            <div>
              <p className="text-mono-sm text-ash mb-1">Location</p>
              <p className="text-parchment">Visakhapatnam, India</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
