'use client'

import { motion } from 'framer-motion'

const stats = [
  { value: '4+', label: 'Years Building' },
  { value: '150+', label: 'Deployments' },
  { value: '10+', label: 'Products Shipped' },
  { value: '∞', label: 'Diet Coke' },
]

const skills = ['Next.js', 'FastAPI', 'PostgreSQL', 'AI/ML', 'Docker', 'TypeScript', 'React', 'Python']

const bio = `I'm a CSE diploma student who stopped waiting for opportunities and started building them. For over 4 years, I've been shipping real products solo — not demos, not tutorials, but production systems that actually run.

I don't just write code. I architect systems. From multi-tenant SaaS platforms to AI-integrated dashboards, I build things that work in the real world.

Fast. Relentless. Production-ready.`

export function About() {
  return (
    <section id="about" className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-[#050505]">
      <div className="max-w-5xl mx-auto">
        {/* Section label - centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-mono text-primary/80 tracking-[0.5em] text-xs">
            About
          </span>
        </motion.div>

        {/* Heading - centered */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-16 leading-tight"
        >
          I build systems that <span className="text-primary">work</span>.
          <br />
          Not just code that <span className="text-accent">looks</span> cool.
        </motion.h2>

        {/* Content - centered, narrow width for readability */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-text-muted text-lg leading-relaxed text-center"
          >
            {bio.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </motion.div>

          {/* Skills tags - centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-3"
          >
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 text-sm text-foreground/70 bg-card border border-card-border"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Stats - centered grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-5xl md:text-6xl text-foreground font-light">
                  {stat.value}
                </div>
                <div className="text-mono text-text-muted/60 text-xs tracking-wider mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quote - centered */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-2xl md:text-3xl text-foreground/80 italic font-serif">
            "The best code is the code you don't have to write."
          </p>
          <cite className="text-mono text-text-muted/50 text-sm mt-4 block not-italic">
            — My philosophy
          </cite>
        </motion.blockquote>
      </div>

      <div className="section-divider mt-32 max-w-xl mx-auto" />
    </section>
  )
}
