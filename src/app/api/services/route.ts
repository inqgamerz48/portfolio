import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

const fallbackServices = [
  {
    id: '1',
    title: 'Landing Page',
    description: 'Single-page presence that converts',
    priceMin: 99,
    priceMax: 149,
    features: ['Responsive design', 'Custom animations', 'Contact form', 'Basic SEO', '3-5 day delivery'],
    popular: false,
    order: 1,
  },
  {
    id: '2',
    title: 'Business Site',
    description: 'Multi-page website with CMS',
    priceMin: 199,
    priceMax: 299,
    features: ['Up to 5 pages', 'Admin panel', 'Blog integration', 'Content management', 'Advanced SEO', '7-10 day delivery'],
    popular: true,
    order: 2,
  },
  {
    id: '3',
    title: 'Web Application',
    description: 'Custom full-stack application',
    priceMin: 400,
    priceMax: 800,
    features: ['Database design', 'User authentication', 'REST API', 'Admin dashboard', 'Email notifications', '2-4 week delivery'],
    popular: false,
    order: 3,
  },
  {
    id: '4',
    title: 'SaaS MVP',
    description: 'Multi-tenant product ready to scale',
    priceMin: 800,
    priceMax: 1500,
    features: ['Multi-tenant architecture', 'Payment integration', 'Full backend', 'Production deployment', 'Scalable design', '4-8 week delivery'],
    popular: false,
    order: 4,
  },
]

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    })
    
    if (services.length > 0) {
      return NextResponse.json(services)
    }
    
    return NextResponse.json(fallbackServices)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(fallbackServices)
  }
}

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
