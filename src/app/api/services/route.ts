import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

export async function PUT(request: NextRequest) {
  const authError = await authMiddleware(request)
  if (authError) return authError

  try {
    const data = await request.json()
    const { id, ...updateData } = data

    if (!id) {
      return NextResponse.json({ error: 'Service ID required' }, { status: 400 })
    }

    const service = await prisma.service.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(service)
  } catch (error) {
    console.error('Error updating service:', error)
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    )
  }
}
