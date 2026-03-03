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

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

  return (
    <section id="blog" className="section-wrapper relative">
      <div className="slash-divider" />

      <div className="section-inner max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-eyebrow mb-6"
        >
          Chronicles
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-heading text-parchment mb-16"
        >
          Battle logs & insights.
        </motion.h2>

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-0">
            {[1, 2, 3].map((i) => (
              <div key={i} className="py-7 border-t border-blood/8">
                <div className="h-3 w-20 bg-ink rounded animate-pulse mb-3" />
                <div className="h-5 w-3/4 bg-ink rounded animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && posts.length === 0 && (
          <p className="text-mist">No chronicles yet. Check back soon.</p>
        )}

        {/* Post list */}
        {!loading && posts.length > 0 && (
          <div>
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <a
                  href={`/blog/${post.slug}`}
                  className="group block py-7 border-t border-blood/8 hover:bg-ink/30 transition-colors duration-300 -mx-4 px-4"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                    <span className="text-mono text-steel shrink-0 w-20">
                      {formatDate(post.createdAt)}
                    </span>
                    <h3 className="font-serif text-xl lg:text-2xl font-black text-parchment group-hover:text-flame transition-colors duration-300 flex-1">
                      {post.title}
                    </h3>
                    <span className="text-mono text-ash text-[10px] shrink-0">
                      {post.category}
                    </span>
                  </div>
                </a>
              </motion.div>
            ))}
            <div className="border-t border-blood/8" />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <a href="/blog" className="btn-ghost">
            All chronicles <ArrowUpRight size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
