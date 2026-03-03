import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'
import { put } from '@vercel/blob'

const fallbackPosts = [
  {
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
  {
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
  {
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
]

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    })
    
    if (posts.length > 0) {
      return NextResponse.json(posts)
    }
    
    return NextResponse.json(fallbackPosts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(fallbackPosts)
  }
}

export async function POST(request: NextRequest) {
  const authError = await authMiddleware(request)
  if (authError) return authError

  try {
    const formData = await request.formData()
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const excerpt = formData.get('excerpt') as string
    const category = formData.get('category') as string
    const published = formData.get('published') === 'true'
    const pdfFile = formData.get('pdf') as File | null

    let pdfUrl = null

    if (pdfFile && pdfFile.size > 0) {
      const blob = await put(`blog/${slug}.pdf`, pdfFile, {
        access: 'public',
      })
      pdfUrl = blob.url
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        category: category || 'Development',
        published,
        pdfUrl,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
