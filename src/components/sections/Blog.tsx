'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const posts = [
  {
    title: 'Building Production-Ready APIs with FastAPI',
    slug: 'building-production-ready-apis',
    excerpt: 'A comprehensive guide to building APIs that actually work in production, with error handling, validation, and documentation.',
    category: 'Development',
    date: '2026-02-15',
  },
  {
    title: 'The Future of AI in Web Development',
    slug: 'ai-in-web-development',
    excerpt: 'How AI is reshaping the landscape of web development and what it means for developers.',
    category: 'AI',
    date: '2026-02-10',
  },
  {
    title: 'From Solo Developer to Production Deployments',
    slug: 'solo-developer-deployments',
    excerpt: 'Lessons learned from shipping 150+ production deployments without a team.',
    category: 'Projects',
    date: '2026-02-05',
  },
]

export function Blog() {
  return (
    <section id="blog" className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-[#050505]">
      <div className="max-w-5xl mx-auto">
        {/* Section header - centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-mono text-primary/80 tracking-[0.5em] text-xs">
            Blog
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground mt-6">
            Thoughts on <span className="text-primary">building</span>.
          </h2>
        </motion.div>

        {/* Posts grid - centered */}
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="h-full p-6 bg-card border border-card-border hover:border-primary/30 transition-colors duration-300">
                  {/* Category & date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-mono text-primary/60 text-[10px] tracking-[0.15em]">
                      {post.category.toUpperCase()}
                    </span>
                    <span className="text-mono text-text-muted/30 text-[10px]">
                      {post.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-text-muted/60 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </article>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* More posts */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-text-muted/40 mt-12 text-sm"
        >
          More articles coming soon
        </motion.p>
      </div>

      <div className="section-divider mt-20 max-w-xl mx-auto" />
    </section>
  )
}
