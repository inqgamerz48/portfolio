'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  pdfUrl: string | null
  category: string
  published: boolean
  createdAt: string
}

const categoryColors: Record<string, string> = {
  Development: 'from-blue-500/20 to-cyan-500/10',
  AI: 'from-purple-500/20 to-violet-500/10',
  Projects: 'from-red-500/20 to-orange-500/10',
  Tips: 'from-green-500/20 to-emerald-500/10',
}

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data)
        }
      })
      .catch((err) => console.error('Failed to fetch blog posts:', err))
      .finally(() => setIsLoading(false))
  }, [])

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

        {/* Loading state */}
        {isLoading && (
          <div className="grid md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card h-64 animate-pulse">
                <div className="h-28 bg-white/[0.02] rounded-t-2xl" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-white/[0.04] rounded-full w-1/3" />
                  <div className="h-5 bg-white/[0.04] rounded-full w-3/4" />
                  <div className="h-3 bg-white/[0.03] rounded-full w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-12 text-center"
          >
            <p className="text-text-muted/50 text-lg">No blog posts published yet.</p>
            <p className="text-text-muted/30 text-sm mt-2">Check back soon for new articles.</p>
          </motion.div>
        )}

        {/* Posts grid */}
        {!isLoading && posts.length > 0 && (
          <div className="grid md:grid-cols-3 gap-5">
            {posts.slice(0, 6).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="h-full glass-card overflow-hidden">
                    {/* Gradient header area */}
                    <div className={`h-28 bg-gradient-to-br ${categoryColors[post.category] || 'from-gray-500/20 to-gray-500/10'} relative overflow-hidden rounded-t-2xl`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06060a]/80 to-transparent" />
                      <div className="absolute bottom-3 left-5">
                        <span className="text-mono text-[10px] tracking-[0.15em] text-white/70 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
                          {post.category.toUpperCase()}
                        </span>
                      </div>
                      {post.pdfUrl && (
                        <div className="absolute top-3 right-3">
                          <span className="text-mono text-[9px] tracking-wider text-white/60 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full">
                            PDF
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      {/* Date */}
                      <span className="text-mono text-text-muted/30 text-[10px]">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
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
                      {post.excerpt && (
                        <p className="text-text-muted/50 text-sm leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}

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
        )}

        {/* More posts note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-text-muted/30 mt-12 text-sm"
        >
          {posts.length > 6 ? (
            <Link href="/blog" className="text-primary/60 hover:text-primary-light transition-colors">
              View all {posts.length} articles →
            </Link>
          ) : (
            'More articles coming soon'
          )}
        </motion.p>
      </div>
    </section>
  )
}
