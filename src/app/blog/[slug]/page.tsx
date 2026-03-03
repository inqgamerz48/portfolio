import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, FileText, Download } from 'lucide-react'
import { prisma } from '@/lib/prisma'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  })

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
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  })

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#06060a]">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-text-muted hover:text-foreground hover:border-white/[0.12] transition-all text-sm mb-10"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <article>
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 text-xs bg-primary/10 text-primary-light rounded-full font-mono tracking-wider">
              {post.category.toUpperCase()}
            </span>
            <span className="text-sm text-text-muted/50">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-text-muted/60 mb-10 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {post.pdfUrl ? (
            <div className="glass-card p-8 md:p-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <FileText className="text-primary-light" size={28} />
                  </div>
                  <div>
                    <h2 className="font-display text-xl text-foreground">
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
                  <Download size={16} />
                  View PDF
                </a>
              </div>

              <div className="border-t border-white/[0.06] pt-6">
                <p className="text-text-muted/40 text-center text-sm">
                  This blog post contains a PDF document. Click the button above to view or download it.
                </p>
              </div>

              {/* Embedded PDF viewer */}
              <div className="mt-6 rounded-xl overflow-hidden border border-white/[0.06]">
                <iframe
                  src={post.pdfUrl}
                  className="w-full h-[600px] md:h-[800px]"
                  title={post.title}
                />
              </div>
            </div>
          ) : (
            <div className="glass-card p-12 text-center">
              <div className="p-4 rounded-2xl bg-white/[0.02] inline-block mb-4">
                <FileText className="text-text-muted/30" size={48} />
              </div>
              <p className="text-text-muted/50">
                No content available for this post yet.
              </p>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}
