import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, FileText, Download } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

const fallbackPosts: Record<string, any> = {
  'building-production-ready-apis': {
    id: '1',
    title: 'Building Production-Ready APIs with FastAPI',
    slug: 'building-production-ready-apis',
    excerpt: 'A comprehensive guide to building APIs that actually work in production, with error handling, validation, and documentation.',
    pdfUrl: null,
    category: 'Development',
    createdAt: '2026-02-15',
  },
  'ai-in-web-development': {
    id: '2',
    title: 'The Future of AI in Web Development',
    slug: 'ai-in-web-development',
    excerpt: 'How AI is reshaping the landscape of web development and what it means for developers.',
    pdfUrl: null,
    category: 'AI',
    createdAt: '2026-02-10',
  },
  'solo-developer-deployments': {
    id: '3',
    title: 'From Solo Developer to Production Deployments',
    slug: 'solo-developer-deployments',
    excerpt: 'Lessons learned from shipping 150+ production deployments without a team.',
    pdfUrl: null,
    category: 'Projects',
    createdAt: '2026-02-05',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = fallbackPosts[slug]
  
  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${post.title} | INQ Blog`,
    description: post.excerpt || post.title,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = fallbackPosts[slug]

  if (!post) {
    return (
      <div className="min-h-screen bg-[#030003] py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl text-foreground mb-4">Post not found</h1>
          <Link href="/blog" className="text-primary hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#030003] py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft size={18} />
          Back to Blog
        </Link>

        <article>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-mono text-primary/60 text-xs tracking-[0.15em]">
              {post.category.toUpperCase()}
            </span>
            <span className="text-text-muted/30">•</span>
            <span className="text-text-muted/50 text-sm">
              {post.createdAt}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-text-muted/70 mb-10 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {post.pdfUrl ? (
            <div className="p-8 bg-card border border-card-border">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10">
                    <FileText className="text-primary" size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl text-foreground">
                      PDF Document
                    </h2>
                    <p className="text-sm text-text-muted/50 mt-1">
                      Click to view or download
                    </p>
                  </div>
                </div>
                <a
                  href={post.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <Download size={16} className="mr-2" />
                  View PDF
                </a>
              </div>

              <div className="mt-6 rounded-lg overflow-hidden border border-card-border">
                <iframe
                  src={post.pdfUrl}
                  className="w-full h-[600px] md:h-[800px]"
                  title={post.title}
                />
              </div>
            </div>
          ) : (
            <div className="p-12 bg-card border border-card-border text-center">
              <div className="p-4 bg-card-border inline-block mb-4">
                <FileText className="text-text-muted/30" size={48} />
              </div>
              <p className="text-text-muted/50">
                Full article content coming soon...
              </p>
            </div>
          )}
        </article>

        {/* More posts */}
        <div className="mt-16 pt-12 border-t border-card-border">
          <h3 className="text-lg text-foreground mb-6">More Articles</h3>
          <div className="space-y-4">
            {Object.values(fallbackPosts)
              .filter((p: any) => p.slug !== slug)
              .map((p: any) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="block p-4 bg-card border border-card-border hover:border-primary/30 transition-colors"
                >
                  <span className="text-mono text-primary/60 text-xs">{p.category.toUpperCase()}</span>
                  <h4 className="text-foreground mt-1">{p.title}</h4>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
