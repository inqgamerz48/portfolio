'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Github, Linkedin, Mail, MessageCircle } from 'lucide-react'

const projectTypes = [
  { value: '', label: 'Project type' },
  { value: 'website', label: 'Website' },
  { value: 'webapp', label: 'Web Application' },
  { value: 'saas', label: 'SaaS Product' },
  { value: 'mobile', label: 'Mobile App' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'other', label: 'Other' },
]

const budgetRanges = [
  { value: '', label: 'Budget range' },
  { value: '0-500', label: '$0 - $500' },
  { value: '500-1000', label: '$500 - $1,000' },
  { value: '1000-2500', label: '$1,000 - $2,500' },
  { value: '2500-5000', label: '$2,500 - $5,000' },
  { value: '5000+', label: '$5,000+' },
]

const contactLinks = [
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/919949357594' },
  { icon: Mail, label: 'Email', href: 'mailto:nandurisrivatsa91@gmail.com' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/inqgamerz48' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/sriram-satya-srivatsa-nanduri-56229a35a' },
]

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', projectType: '', budget: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-wrapper relative bg-[#06060a]">
      <div className="section-divider-top" />
      <div className="section-inner max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-6 inline-flex">Contact</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground mt-6">
            Have a project in mind?
            <br />
            Let&rsquo;s <span className="text-primary-light">build it</span>.
          </h2>
        </motion.div>

        {/* Form container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="glass-card p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Email */}
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-dark"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-dark"
                  required
                />
              </div>

              {/* Project type & Budget */}
              <div className="grid md:grid-cols-2 gap-4">
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="input-dark appearance-none cursor-pointer"
                  required
                >
                  {projectTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="input-dark appearance-none cursor-pointer"
                  required
                >
                  {budgetRanges.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <textarea
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="input-dark min-h-[140px] resize-none"
                required
              />

              {/* Status */}
              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-400/80 text-sm bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Message sent! I&rsquo;ll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 text-red-400/80 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  Failed to send. Please try again.
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={15} />
                </span>
              </button>
            </form>
          </div>
        </motion.div>

        {/* Contact options */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-text-muted hover:text-foreground hover:border-primary/30 hover:bg-primary/[0.04] transition-all duration-300 text-sm"
              >
                <link.icon size={15} />
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
