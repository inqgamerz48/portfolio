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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-wrapper relative">
      <div className="section-inner max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          className="section-eyebrow mb-6"
        >
          Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-heading text-fg mb-16"
        >
          Let&apos;s build something.
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <label className="text-mono text-ash block mb-3">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-warm"
                required
              />
            </div>

            <div>
              <label className="text-mono text-ash block mb-3">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-warm"
                required
              />
            </div>

            <div>
              <label className="text-mono text-ash block mb-3">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="input-warm"
                rows={5}
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary"
            >
              {status === 'sending' ? 'Sending...' : 'Send message'}
              <Send size={14} />
            </button>

            {status === 'success' && (
              <p className="text-mono text-ember mt-4">Message sent. I&apos;ll respond soon.</p>
            )}
            {status === 'error' && (
              <p className="text-mono text-[#ff4444] mt-4">Something went wrong. Try again.</p>
            )}
          </motion.form>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 lg:pt-8"
          >
            <div>
              <p className="text-mono text-ash mb-2">Email</p>
              <a href="mailto:inqgamerz48@gmail.com" className="text-fg hover:text-ember transition-colors">
                inqgamerz48@gmail.com
              </a>
            </div>
            <div>
              <p className="text-mono text-ash mb-2">GitHub</p>
              <a href="https://github.com/inqgamerz48" target="_blank" rel="noopener noreferrer" className="text-fg hover:text-ember transition-colors">
                github.com/inqgamerz48
              </a>
            </div>
            <div>
              <p className="text-mono text-ash mb-2">Based in</p>
              <p className="text-fg">Visakhapatnam, India</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
