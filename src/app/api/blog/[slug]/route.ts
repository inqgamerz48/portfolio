import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

const fallbackPosts: Record<string, any> = {
  'building-production-ready-apis': {
    id: '1',
    title: 'Building Production-Ready APIs with FastAPI',
    slug: 'building-production-ready-apis',
    excerpt: 'A comprehensive guide to building APIs that actually work in production, with error handling, validation, and documentation.',
    pdfUrl: null,
    category: 'Development',
    published: true,
    createdAt: '2026-02-15',
    updatedAt: '2026-02-15',
  },
  'ai-in-web-development': {
    id: '2',
    title: 'The Future of AI in Web Development',
    slug: 'ai-in-web-development',
    excerpt: 'How AI is reshaping the landscape of web development and what it means for developers.',
    pdfUrl: null,
    category: 'AI',
    published: true,
    createdAt: '2026-02-10',
    updatedAt: '2026-02-10',
  },
  'solo-developer-deployments': {
    id: '3',
    title: 'From Solo Developer to Production Deployments',
    slug: 'solo-developer-deployments',
    excerpt: 'Lessons learned from shipping 150+ production deployments without a team.',
    pdfUrl: null,
    category: 'Projects',
    published: true,
    createdAt: '2026-02-05',
    updatedAt: '2026-02-05',
  },
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    try {
      const post = await prisma.blogPost.findUnique({
        where: { slug },
      })

      if (post) {
        return NextResponse.json(post)
      }
    } catch (dbError) {
      console.log('Database not available, using fallback')
    }

    if (fallbackPosts[slug]) {
      return NextResponse.json(fallbackPosts[slug])
    }

    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authError = await authMiddleware(request)
  if (authError) return authError

  try {
    const { slug } = await params
    const data = await request.json()
    const post = await prisma.blogPost.update({
      where: { slug },
      data: {
        title: data.title,
        excerpt: data.excerpt || null,
        category: data.category,
        published: data.published,
      },
    })
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authError = await authMiddleware(request)
  if (authError) return authError

  try {
    const { slug } = await params
    await prisma.blogPost.delete({ where: { slug } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
