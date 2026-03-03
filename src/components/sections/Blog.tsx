'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const posts = [
  {
    title: 'Building Production-Ready APIs with FastAPI',
    slug: 'building-production-ready-apis',
    excerpt: 'A comprehensive guide to building APIs that actually work in production, with error handling, validation, and documentation.',
    category: 'Development',
    date: '2026-02-15',
    color: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    title: 'The Future of AI in Web Development',
    slug: 'ai-in-web-development',
    excerpt: 'How AI is reshaping the landscape of web development and what it means for developers.',
    category: 'AI',
    date: '2026-02-10',
    color: 'from-purple-500/20 to-violet-500/10',
  },
  {
    title: 'From Solo Developer to Production Deployments',
    slug: 'solo-developer-deployments',
    excerpt: 'Lessons learned from shipping 150+ production deployments without a team.',
    category: 'Projects',
    date: '2026-02-05',
    color: 'from-red-500/20 to-orange-500/10',
  },
]

export function Blog() {
  return (
    <section id="blog" className="section-wrapper relative bg-[#06060a]">
      <div className="section-divider-top" />
      <div className="section-inner max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-6 inline-flex">Blog</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground mt-6">
            Thoughts on <span className="text-primary-light">building</span>.
          </h2>
        </motion.div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="h-full glass-card overflow-hidden">
                  {/* Gradient header area */}
                  <div className={`h-28 bg-gradient-to-br ${post.color} relative overflow-hidden rounded-t-2xl`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06060a]/80 to-transparent" />
                    <div className="absolute bottom-3 left-5">
                      <span className="text-mono text-[10px] tracking-[0.15em] text-white/70 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {post.category.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    {/* Date */}
                    <span className="text-mono text-text-muted/30 text-[10px]">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg text-foreground group-hover:text-primary-light transition-colors duration-300 mt-2 mb-3 font-display text-xl leading-snug">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-text-muted/50 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Read more */}
                    <div className="mt-4 flex items-center gap-1 text-primary/50 group-hover:text-primary-light text-xs transition-colors">
                      <span className="text-mono tracking-wider">READ</span>
                      <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
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
          className="text-center text-text-muted/30 mt-12 text-sm"
        >
          More articles coming soon
        </motion.p>
      </div>
    </section>
  )
}
