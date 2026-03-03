import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, FileText, Download } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/Button'

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
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/#blog">
          <Button variant="outline" className="mb-8">
            <ArrowLeft size={18} className="mr-2" />
            Back to Blog
          </Button>
        </Link>

        <article>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded">
              {post.category}
            </span>
            <span className="text-sm text-text-muted">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-text mb-6">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="font-inter text-xl text-text-muted mb-8">
              {post.excerpt}
            </p>
          )}

          {post.pdfUrl ? (
            <div className="bg-card border border-card-border rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <FileText className="text-primary" size={32} />
                  <div>
                    <h2 className="font-cinzel text-xl font-semibold text-text">
                      PDF Document
                    </h2>
                    <p className="text-sm text-text-muted">
                      Click to view or download
                    </p>
                  </div>
                </div>
                <a
                  href={post.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button>
                    <Download size={18} className="mr-2" />
                    View PDF
                  </Button>
                </a>
              </div>

              <div className="border-t border-card-border pt-6">
                <p className="text-text-muted text-center">
                  This blog post contains a PDF document. Click the button above to view or download it.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-card-border rounded-xl p-8 text-center">
              <FileText className="mx-auto mb-4 text-text-muted" size={48} />
              <p className="text-text-muted">
                No content available for this post yet.
              </p>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}
