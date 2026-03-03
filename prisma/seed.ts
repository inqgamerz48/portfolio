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
      description: 'Single page, responsive, animations, contact form, fast delivery',
      priceMin: 99,
      priceMax: 149,
      features: ['Responsive Design', 'Custom Animations', 'Contact Form', 'SEO Optimized', '3-5 Days Delivery'],
      popular: false,
      order: 1,
    },
    {
      title: 'Business Site + CMS',
      description: 'Multi-page site, admin panel, blog, content management, SEO optimized',
      priceMin: 199,
      priceMax: 299,
      features: ['Multi-page Website', 'Admin Panel', 'Blog Integration', 'Content Management', 'SEO Optimization', '7-10 Days Delivery'],
      popular: true,
      order: 2,
    },
    {
      title: 'Full Stack Web App',
      description: 'Custom web application, database, auth, API, admin dashboard',
      priceMin: 400,
      priceMax: 800,
      features: ['Custom Web Application', 'Database Design', 'User Authentication', 'REST API Development', 'Admin Dashboard', '2-4 Weeks Delivery'],
      popular: false,
      order: 3,
    },
    {
      title: 'SaaS MVP',
      description: 'Multi-tenant SaaS, payment integration, full backend, production deployment',
      priceMin: 800,
      priceMax: 1500,
      features: ['Multi-tenant Architecture', 'Payment Integration', 'Full Backend', 'Production Deployment', 'Scalable Infrastructure', '4-8 Weeks Delivery'],
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
      description: 'Multi-tenant SaaS commerce platform unifying Inventory, POS, CRM, and Financial Ledgers with enterprise security',
      stack: ['Next.js 14', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker', 'SQLAlchemy'],
      githubUrl: 'https://github.com/inqgamerz48/biztrackr-grand-enterprise',
      liveUrl: null,
      featured: true,
      order: 1,
    },
    {
      title: 'UNI Manager',
      description: 'Enterprise university management system with multi-role portals, RBAC, attendance, grades, and PDF analytics',
      stack: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma', 'Firebase Auth'],
      githubUrl: 'https://github.com/inqgamerz48/final-unimamanger',
      liveUrl: null,
      featured: true,
      order: 2,
    },
    {
      title: 'CyberSentinel',
      description: 'Real-time monitoring and analytics dashboard integrating third-party APIs and AI tools',
      stack: ['React', 'Python', 'FastAPI', 'AI APIs'],
      githubUrl: null,
      liveUrl: null,
      featured: false,
      order: 3,
    },
    {
      title: 'INQ Portfolio V1',
      description: 'Cinematic portfolio with gamification, anime themes, easter eggs, and service store',
      stack: ['HTML', 'CSS', 'Vanilla JS', 'FastAPI', 'SQLite'],
      githubUrl: null,
      liveUrl: 'https://portfolio-inq.pages.dev',
      featured: false,
      order: 4,
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
