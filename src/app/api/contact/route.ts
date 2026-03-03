import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const message = await prisma.message.create({
      data: {
        name: data.name,
        email: data.email,
        projectType: data.projectType || 'other',
        budget: data.budget || '0-500',
        message: data.message,
      },
    })

    return NextResponse.json(message)
  } catch (error) {
    console.error('Error creating message:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
