import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth'

const fallbackProjects = [
  {
    id: '1',
    title: 'BizTrackr PRO',
    description: 'Multi-tenant SaaS commerce platform unifying Inventory, POS, CRM, and Financial Ledgers with enterprise security and real-time analytics',
    stack: ['Next.js 14', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker', 'SQLAlchemy'],
    githubUrl: 'https://github.com/inqgamerz48/biztrackr-grand-enterprise',
    liveUrl: null,
    featured: true,
    order: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'UNI Manager',
    description: 'Enterprise university management system with multi-role portals, RBAC, attendance tracking, grade management, and PDF analytics generation',
    stack: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma', 'Firebase'],
    githubUrl: 'https://github.com/inqgamerz48/final-unimamanger',
    liveUrl: null,
    featured: true,
    order: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'INQ Portfolio V1',
    description: 'Original cinematic portfolio with gamification, anime themes, easter eggs, and integrated service store',
    stack: ['HTML', 'CSS', 'Vanilla JS', 'FastAPI', 'SQLite'],
    githubUrl: null,
    liveUrl: 'https://portfolio-inq.pages.dev',
    featured: true,
    order: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'TaskFlow',
    description: 'Minimalist project management tool with real-time collaboration, Kanban boards, and team analytics',
    stack: ['Next.js', 'React', 'Firebase', 'Tailwind'],
    githubUrl: 'https://github.com/inqgamerz48/taskflow',
    liveUrl: null,
    featured: false,
    order: 4,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'DevConnect',
    description: 'Developer networking platform with matching algorithm, portfolio showcase, and chat functionality',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
    githubUrl: 'https://github.com/inqgamerz48/devconnect',
    liveUrl: null,
    featured: false,
    order: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'CodeSnippets',
    description: 'Personal code library with syntax highlighting, tags, and cloud sync across devices',
    stack: ['React', 'Node.js', 'MongoDB', 'Monaco Editor'],
    githubUrl: 'https://github.com/inqgamerz48/codesnippets',
    liveUrl: null,
    featured: false,
    order: 6,
    createdAt: new Date().toISOString(),
  },
  {
    id: '7',
    title: 'WeatherPulse',
    description: 'Beautiful weather dashboard with forecasts, historical data visualization, and location-based alerts',
    stack: ['React', 'Weather APIs', 'D3.js', 'Tailwind'],
    githubUrl: 'https://github.com/inqgamerz48/weatherpulse',
    liveUrl: null,
    featured: false,
    order: 7,
    createdAt: new Date().toISOString(),
  },
  {
    id: '8',
    title: 'URLShortner',
    description: 'Fast URL shortening service with custom aliases, analytics dashboard, and QR code generation',
    stack: ['Node.js', 'Express', 'Redis', 'PostgreSQL'],
    githubUrl: 'https://github.com/inqgamerz48/urlshortner',
    liveUrl: null,
    featured: false,
    order: 8,
    createdAt: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
    })
    
    if (projects.length > 0) {
      return NextResponse.json(projects)
    }
    
    return NextResponse.json(fallbackProjects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(fallbackProjects)
  }
}

export async function POST(request: NextRequest) {
  const authError = await authMiddleware(request)
  if (authError) return authError

  try {
    const data = await request.json()
    const project = await prisma.project.create({
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
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
