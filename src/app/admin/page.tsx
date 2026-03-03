'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FolderKanban, FileText, MessageSquare, Package, ArrowRight } from 'lucide-react'
import Link from 'next/link'

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
    { name: 'Projects', value: stats.projects, icon: FolderKanban, href: '/admin/projects', color: 'text-parchment' },
    { name: 'Blog Posts', value: stats.posts, icon: FileText, href: '/admin/blog', color: 'text-parchment' },
    { name: 'Messages', value: stats.messages, icon: MessageSquare, href: '/admin/messages', color: 'text-blood' },
    { name: 'Services', value: stats.services, icon: Package, href: '/admin/services', color: 'text-parchment' },
  ]

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="font-display text-5xl md:text-6xl text-parchment tracking-wider uppercase">Dashboard</h1>
        <p className="font-mono text-mist mt-3 uppercase tracking-widest text-sm">Welcome back, INQ</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="bg-ink border border-parchment/[0.04] p-6 group hover:border-blood/30 transition-colors flex flex-col items-center justify-center text-center h-full">
              <stat.icon className={`mb-4 ${stat.color} group-hover:text-flame transition-colors`} size={24} />
              <div className="font-display text-5xl text-parchment tracking-wider mb-2">
                {loading ? '...' : stat.value}
              </div>
              <div className="font-mono text-xs text-mist uppercase tracking-widest">{stat.name}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <Link href={item.href} data-cursor-hover>
              <div className="bg-ink border border-parchment/[0.04] p-8 h-full group hover:border-blood/50 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blood/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h3 className="font-display text-2xl tracking-wider text-parchment mb-3 group-hover:text-flame transition-colors uppercase">
                        {item.title}
                      </h3>
                      <p className="text-mist text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <item.icon className="text-ash group-hover:text-blood transition-colors shrink-0" size={24} />
                  </div>
                  <div className="flex items-center text-blood text-sm font-mono tracking-widest uppercase mt-4 gap-2 group-hover:gap-4 transition-all">
                    Manage <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
