'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FolderKanban, FileText, MessageSquare, Package, Plus, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'

interface Stats {
  projects: number
  posts: number
  messages: number
  services: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    posts: 0,
    messages: 0,
    services: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [projectsRes, postsRes, messagesRes, servicesRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/blog'),
        fetch('/api/messages'),
        fetch('/api/services'),
      ])

      const [projects, posts, messages, services] = await Promise.all([
        projectsRes.json(),
        postsRes.json(),
        messagesRes.json(),
        servicesRes.json(),
      ])

      setStats({
        projects: Array.isArray(projects) ? projects.length : 0,
        posts: Array.isArray(posts) ? posts.length : 0,
        messages: Array.isArray(messages) ? messages.length : 0,
        services: Array.isArray(services) ? services.length : 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { name: 'Projects', value: stats.projects, icon: FolderKanban, href: '/admin/projects', color: 'text-primary' },
    { name: 'Blog Posts', value: stats.posts, icon: FileText, href: '/admin/blog', color: 'text-accent' },
    { name: 'Messages', value: stats.messages, icon: MessageSquare, href: '/admin/messages', color: 'text-green-500' },
    { name: 'Services', value: stats.services, icon: Package, href: '/admin/services', color: 'text-purple-500' },
  ]

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-cinzel text-3xl font-bold text-text">Dashboard</h1>
        <p className="font-inter text-text-muted mt-1">Welcome back, INQ</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="text-center">
              <stat.icon className={`mx-auto mb-2 ${stat.color}`} size={32} />
              <div className="font-cinzel text-3xl font-bold text-text">
                {loading ? '...' : stat.value}
              </div>
              <div className="font-inter text-sm text-text-muted">{stat.name}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: 'Manage Projects', description: 'Add, edit, or remove projects from your portfolio', href: '/admin/projects', icon: FolderKanban },
          { title: 'Manage Blog', description: 'Create and publish blog posts with PDF support', href: '/admin/blog', icon: FileText },
          { title: 'Manage Services', description: 'Update your service offerings and pricing', href: '/admin/services', icon: Package },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Link href={item.href}>
              <Card glow className="h-full cursor-pointer group">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-cinzel text-xl font-semibold text-text mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-inter text-sm text-text-muted">
                      {item.description}
                    </p>
                  </div>
                  <item.icon className="text-primary" size={24} />
                </div>
                <div className="flex items-center text-primary text-sm mt-4 group-hover:gap-3 transition-all">
                  Manage <ArrowRight size={16} className="ml-1" />
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
