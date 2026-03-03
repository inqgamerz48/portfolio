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
      .then((data) => { setPosts(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

  return (
    <section id="blog" className="section-wrapper">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <span className="section-num">005</span>
          <h2 className="section-title">Blog</h2>
        </motion.div>

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="py-6 border-b border-parchment/[0.04]">
                <div className="h-3 w-20 bg-ink rounded animate-pulse mb-2" />
                <div className="h-5 w-3/4 bg-ink rounded animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <p className="text-mist">No posts yet. Check back soon.</p>
        )}

        {!loading && posts.length > 0 && posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <a
              href={`/blog/${post.slug}`}
              className="group flex flex-col md:flex-row md:items-baseline gap-1 md:gap-8 py-6 border-b border-parchment/[0.04] hover:bg-parchment/[0.01] transition-colors -mx-4 px-4"
              data-cursor-hover
            >
              <span className="text-mono-sm text-ash/50 shrink-0 w-20">{formatDate(post.createdAt)}</span>
              <h3 className="font-display text-xl md:text-2xl text-parchment group-hover:text-flame transition-colors tracking-wider flex-1">
                {post.title}
              </h3>
              <span className="text-mono-sm text-ash/40 shrink-0">{post.category}</span>
            </a>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <a href="/blog" className="btn-ghost" data-cursor-hover>All posts <ArrowUpRight size={10} /></a>
        </motion.div>
      </div>
    </section>
  )
}
