'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  pdfUrl?: string
  createdAt: string
}

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => {
        setPosts(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <section id="blog" className="section-wrapper relative">
      <div className="section-inner max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          className="section-eyebrow mb-6"
        >
          Writing
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-heading text-fg mb-16"
        >
          Thoughts & insights.
        </motion.h2>

        {/* Loading state */}
        {loading && (
          <div className="space-y-0">
            {[1, 2, 3].map((i) => (
              <div key={i} className="py-8 border-t border-[rgba(200,180,160,0.08)]">
                <div className="h-3 w-20 bg-smoke rounded animate-pulse mb-3" />
                <div className="h-6 w-3/4 bg-smoke rounded animate-pulse mb-2" />
                <div className="h-3 w-16 bg-smoke rounded animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && posts.length === 0 && (
          <p className="text-ash">No posts yet. Check back soon.</p>
        )}

        {/* Post list — editorial */}
        {!loading && posts.length > 0 && (
          <div className="space-y-0">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <a
                  href={`/blog/${post.slug}`}
                  className="group py-8 border-t border-[rgba(200,180,160,0.08)] grid grid-cols-12 gap-4 items-baseline block"
                >
                  {/* Date */}
                  <span className="col-span-3 lg:col-span-2 text-mono text-charcoal">
                    {formatDate(post.createdAt)}
                  </span>

                  {/* Title */}
                  <h3 className="col-span-7 lg:col-span-8 font-serif text-xl lg:text-2xl text-fg group-hover:text-ember-glow transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Category */}
                  <span className="col-span-2 text-right text-mono text-ash opacity-50">
                    {post.category}
                  </span>
                </a>
              </motion.div>
            ))}
            <div className="border-t border-[rgba(200,180,160,0.08)]" />
          </div>
        )}

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <a href="/blog" className="btn-ghost">
            All posts <ArrowUpRight size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
