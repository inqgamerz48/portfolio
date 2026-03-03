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
    <section id="about" className="section-wrapper relative bg-[#06060a]">
      <div className="section-divider-top" />
      <div className="section-inner">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <span className="section-label">About</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-16 leading-tight max-w-2xl mx-auto"
        >
          I build systems that <span className="text-primary-light">work</span>.
          <br />
          Not just code that <span className="text-accent-light">looks</span> cool.
        </motion.h2>

        {/* Content */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-text-muted text-lg leading-relaxed"
          >
            {bio.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </motion.div>

          {/* Skills tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center gap-2"
          >
            {skills.map((skill) => (
              <span key={skill} className="skill-pill">
                <span className="w-1 h-1 rounded-full bg-primary/60" />
                {skill}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="text-4xl md:text-5xl text-foreground font-light font-display">
                  {stat.value}
                </div>
                <div className="text-mono text-text-muted/50 text-xs tracking-wider mt-3">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center glass-card-sm p-8 md:p-10 max-w-xl mx-auto"
        >
          <p className="text-xl md:text-2xl text-foreground/80 italic font-display">
            &ldquo;The best code is the code you don&rsquo;t have to write.&rdquo;
          </p>
          <cite className="text-mono text-text-muted/40 text-xs mt-4 block not-italic tracking-wider">
            — My philosophy
          </cite>
        </motion.blockquote>
      </div>
    </section>
  )
}
