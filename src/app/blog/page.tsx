import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const fallbackPosts = [
  {
    id: '1',
    title: 'Building Production-Ready APIs with FastAPI',
    slug: 'building-production-ready-apis',
    excerpt: 'A comprehensive guide to building APIs that actually work in production, with error handling, validation, and documentation.',
    category: 'Development',
    date: 'February 15, 2026',
  },
  {
    id: '2',
    title: 'The Future of AI in Web Development',
    slug: 'ai-in-web-development',
    excerpt: 'How AI is reshaping the landscape of web development and what it means for developers.',
    category: 'AI',
    date: 'February 10, 2026',
  },
  {
    id: '3',
    title: 'From Solo Developer to Production Deployments',
    slug: 'solo-developer-deployments',
    excerpt: 'Lessons learned from shipping 150+ production deployments without a team.',
    category: 'Projects',
    date: 'February 5, 2026',
  },
]

export const metadata: Metadata = {
  title: 'Blog | INQ',
  description: 'Thoughts on building, AI, and shipping products.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#030003] py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft size={18} />
          Back to Portfolio
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-mono text-primary/80 tracking-[0.5em] text-xs">
            Blog
          </span>
          <h1 className="text-5xl md:text-7xl text-foreground mt-6 font-light">
            Thoughts on <span className="text-primary">building</span>.
          </h1>
          <p className="text-text-muted mt-4 max-w-xl mx-auto">
            Insights on software development, AI systems, and lessons learned from shipping production applications.
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {fallbackPosts.map((post, index) => (
            <Link 
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <article className="p-8 bg-card border border-card-border hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-mono text-primary/60 text-xs tracking-[0.15em]">
                    {post.category.toUpperCase()}
                  </span>
                  <span className="text-text-muted/30">•</span>
                  <span className="text-text-muted/40 text-sm">
                    {post.date}
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
                  {post.title}
                </h2>
                
                <p className="text-text-muted/70 text-lg leading-relaxed">
                  {post.excerpt}
                </p>
              </article>
            </Link>
          ))}
        </div>

        {/* More coming soon */}
        <div className="mt-16 text-center">
          <p className="text-text-muted/40">
            More articles coming soon...
          </p>
        </div>

        {/* Footer link */}
        <div className="mt-20 text-center">
          <Link 
            href="/#contact"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            Have a question? Get in touch →
          </Link>
        </div>
      </div>
    </div>
  )
}
