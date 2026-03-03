import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await authMiddleware(request)
  if (authError) return authError

  try {
    const { id } = await params
    const data = await request.json()
    const project = await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        stack: data.stack || [],
        githubUrl: data.githubUrl || null,
        liveUrl: data.liveUrl || null,
        featured: data.featured || false,
        order: data.order || 0,
      },
    })
    return NextResponse.json(project)
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await authMiddleware(request)
  if (authError) return authError

  try {
    const { id } = await params
    await prisma.project.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
