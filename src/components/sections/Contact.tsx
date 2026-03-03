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
    <section id="contact" className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-[#030003]">
      <div className="max-w-3xl mx-auto">
        {/* Section header - centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-mono text-primary/80 tracking-[0.5em] text-xs">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground mt-6">
            Have a project in mind?
            <br />
            Let's <span className="text-primary">build it</span>.
          </h2>
        </motion.div>

        {/* Form - centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
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
              className="input-dark min-h-[120px] resize-none"
              required
            />

            {/* Status */}
            {submitStatus === 'success' && (
              <p className="text-green-500/70 text-sm">Message sent! I'll get back to you soon.</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-500/70 text-sm">Failed to send. Please try again.</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full"
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send size={16} />
              </span>
            </button>
          </form>
        </motion.div>

        {/* Contact options - centered */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/919949357594"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-card border border-card-border hover:border-primary/30 text-text-muted hover:text-foreground transition-colors text-sm"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a
              href="mailto:nandurisrivatsa91@gmail.com"
              className="flex items-center gap-2 px-4 py-2 bg-card border border-card-border hover:border-primary/30 text-text-muted hover:text-foreground transition-colors text-sm"
            >
              <Mail size={16} />
              Email
            </a>
            <a
              href="https://github.com/inqgamerz48"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-card border border-card-border hover:border-primary/30 text-text-muted hover:text-foreground transition-colors text-sm"
            >
              <Github size={16} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sriram-satya-srivatsa-nanduri-56229a35a"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-card border border-card-border hover:border-primary/30 text-text-muted hover:text-foreground transition-colors text-sm"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
