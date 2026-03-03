import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const passwordHash = await bcrypt.hash('fuckingrich@2026', 10)
  
  const existingAdmin = await prisma.admin.findUnique({
    where: { username: 'INQ' },
  })

  if (!existingAdmin) {
    await prisma.admin.create({
      data: {
        username: 'INQ',
        passwordHash,
      },
    })
    console.log('Admin user created')
  } else {
    console.log('Admin user already exists')
  }

  // Create default services
  const services = [
    {
      title: 'Landing Page',
      description: 'Single-page presence that converts',
      priceMin: 99,
      priceMax: 149,
      features: ['Responsive design', 'Custom animations', 'Contact form', 'Basic SEO', '3-5 day delivery'],
      popular: false,
      order: 1,
    },
    {
      title: 'Business Site',
      description: 'Multi-page website with CMS',
      priceMin: 199,
      priceMax: 299,
      features: ['Up to 5 pages', 'Admin panel', 'Blog integration', 'Content management', 'Advanced SEO', '7-10 day delivery'],
      popular: true,
      order: 2,
    },
    {
      title: 'Web Application',
      description: 'Custom full-stack application',
      priceMin: 400,
      priceMax: 800,
      features: ['Database design', 'User authentication', 'REST API', 'Admin dashboard', 'Email notifications', '2-4 week delivery'],
      popular: false,
      order: 3,
    },
    {
      title: 'SaaS MVP',
      description: 'Multi-tenant product ready to scale',
      priceMin: 800,
      priceMax: 1500,
      features: ['Multi-tenant architecture', 'Payment integration', 'Full backend', 'Production deployment', 'Scalable design', '4-8 week delivery'],
      popular: false,
      order: 4,
    },
  ]

  for (const service of services) {
    const existing = await prisma.service.findFirst({
      where: { title: service.title },
    })

    if (!existing) {
      await prisma.service.create({ data: service })
      console.log(`Service "${service.title}" created`)
    }
  }

  // Create default projects
  const projects = [
    {
      title: 'BizTrackr PRO',
      description: 'Multi-tenant SaaS commerce platform unifying Inventory, POS, CRM, and Financial Ledgers with enterprise security and real-time analytics',
      stack: ['Next.js 14', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker', 'SQLAlchemy'],
      githubUrl: 'https://github.com/inqgamerz48/biztrackr-grand-enterprise',
      liveUrl: null,
      featured: true,
      order: 1,
    },
    {
      title: 'UNI Manager',
      description: 'Enterprise university management system with multi-role portals, RBAC, attendance tracking, grade management, and PDF analytics generation',
      stack: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma', 'Firebase'],
      githubUrl: 'https://github.com/inqgamerz48/final-unimamanger',
      liveUrl: null,
      featured: true,
      order: 2,
    },
    {
      title: 'INQ Portfolio V1',
      description: 'Original cinematic portfolio with gamification, anime themes, easter eggs, and integrated service store',
      stack: ['HTML', 'CSS', 'Vanilla JS', 'FastAPI', 'SQLite'],
      githubUrl: null,
      liveUrl: 'https://portfolio-inq.pages.dev',
      featured: true,
      order: 3,
    },
    {
      title: 'TaskFlow',
      description: 'Minimalist project management tool with real-time collaboration, Kanban boards, and team analytics',
      stack: ['Next.js', 'React', 'Firebase', 'Tailwind'],
      githubUrl: 'https://github.com/inqgamerz48/taskflow',
      liveUrl: null,
      featured: false,
      order: 4,
    },
    {
      title: 'DevConnect',
      description: 'Developer networking platform with matching algorithm, portfolio showcase, and chat functionality',
      stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
      githubUrl: 'https://github.com/inqgamerz48/devconnect',
      liveUrl: null,
      featured: false,
      order: 5,
    },
    {
      title: 'CodeSnippets',
      description: 'Personal code library with syntax highlighting, tags, and cloud sync across devices',
      stack: ['React', 'Node.js', 'MongoDB', 'Monaco Editor'],
      githubUrl: 'https://github.com/inqgamerz48/codesnippets',
      liveUrl: null,
      featured: false,
      order: 6,
    },
    {
      title: 'WeatherPulse',
      description: 'Beautiful weather dashboard with forecasts, historical data visualization, and location-based alerts',
      stack: ['React', 'Weather APIs', 'D3.js', 'Tailwind'],
      githubUrl: 'https://github.com/inqgamerz48/weatherpulse',
      liveUrl: null,
      featured: false,
      order: 7,
    },
    {
      title: 'URLShortner',
      description: 'Fast URL shortening service with custom aliases, analytics dashboard, and QR code generation',
      stack: ['Node.js', 'Express', 'Redis', 'PostgreSQL'],
      githubUrl: 'https://github.com/inqgamerz48/urlshortner',
      liveUrl: null,
      featured: false,
      order: 8,
    },
  ]

  for (const project of projects) {
    const existing = await prisma.project.findFirst({
      where: { title: project.title },
    })

    if (!existing) {
      await prisma.project.create({ data: project })
      console.log(`Project "${project.title}" created`)
    }
  }

  // Create sample blog posts
  const posts = [
    {
      title: 'Building Production-Ready APIs with FastAPI',
      slug: 'building-production-ready-apis',
      excerpt: 'A comprehensive guide to building APIs that actually work in production, with error handling, validation, and documentation.',
      category: 'Development',
      published: true,
    },
    {
      title: 'The Future of AI in Web Development',
      slug: 'ai-in-web-development',
      excerpt: 'How AI is reshaping the landscape of web development and what it means for developers.',
      category: 'AI',
      published: true,
    },
    {
      title: 'From Solo Developer to Production Deployments',
      slug: 'solo-developer-deployments',
      excerpt: 'Lessons learned from shipping 150+ production deployments without a team.',
      category: 'Projects',
      published: true,
    },
  ]

  for (const post of posts) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug: post.slug },
    })

    if (!existing) {
      await prisma.blogPost.create({ data: post })
      console.log(`Blog post "${post.title}" created`)
    }
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
