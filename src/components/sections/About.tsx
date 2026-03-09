'use client'

import { motion } from 'framer-motion'

export function About() {
  return (
    <section id="about" className="section-wrapper">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <span className="section-num">001</span>
          <h2 className="section-title">About</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="font-display text-3xl md:text-4xl text-parchment tracking-wide leading-[1.15] mb-6">
              I&apos;M INQ. I BUILD WEBSITES THAT WORK FOR REAL BUSINESSES.
            </p>
            <p className="text-mist leading-relaxed mb-4">
              I don&apos;t just build websites. Depending on what your business needs, I work across the full stack — React and Next.js on the frontend, Python and FastAPI on the backend, PostgreSQL for databases, Flutter for mobile, and automation. If it can be built, I can build it.
            </p>
            <p className="text-mist leading-relaxed mb-6">
              Yes, I&apos;m young. No, I&apos;m not going to waste your time with excuses about &quot;junior developers.&quot; I deliver working code, on time, every time. Your grandmother could manage the CMS I build for you — and she wouldn&apos;t even need to call her tech-savvy nephew.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card-dark p-5">
                <h3 className="font-display text-lg text-parchment mb-3">Frontend</h3>
                <p className="text-mist text-sm">Next.js · React · TypeScript · Tailwind · Flutter</p>
              </div>
              <div className="card-dark p-5">
                <h3 className="font-display text-lg text-parchment mb-3">Backend</h3>
                <p className="text-mist text-sm">Python · FastAPI · PostgreSQL · Firebase · Docker</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-dark p-8 flex flex-col justify-center"
          >
            <p className="text-serif-italic text-xl md:text-2xl text-parchment leading-relaxed mb-4">
              &ldquo;Fast. Relentless. Production-ready. Every line of code is a blade forged for battle.&rdquo;
            </p>
            <p className="text-mono-sm text-blood">— INQ</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
