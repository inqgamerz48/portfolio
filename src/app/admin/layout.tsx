'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Package,
  MessageSquare,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { CustomCursor } from '@/components/CustomCursor'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { name: 'Blog', href: '/admin/blog', icon: FileText },
  { name: 'Services', href: '/admin/services', icon: Package },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        setIsAuthenticated(true)
      } else if (pathname !== '/admin/login') {
        router.push('/admin/login')
      }
    } catch {
      if (pathname !== '/admin/login') {
        router.push('/admin/login')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    router.push('/admin/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blood"></div>
      </div>
    )
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-void text-parchment relative overflow-x-hidden">
      <CustomCursor />
      <div className="grain-overlay" aria-hidden="true" />
      <div className="grid-overlay opacity-50" />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed left-0 top-0 z-50 w-full bg-void/90 backdrop-blur-md border-b border-parchment/[0.04]"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 h-16">
          <Link href="/admin" className="group flex items-center gap-3" data-cursor-hover>
            <span className="font-display text-2xl text-parchment tracking-wider group-hover:text-flame transition-colors">
              INQ ADMIN
            </span>
            <span className="status-dot w-1.5 h-1.5" />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-parchment flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <motion.span animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block w-5 h-[1px] bg-parchment origin-center" />
            <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-[1px] bg-parchment" />
            <motion.span animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block w-5 h-[1px] bg-parchment origin-center" />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                data-cursor-hover
                className={`flex items-center gap-2 text-mono-sm transition-all duration-300 relative group ${pathname === item.href
                    ? 'text-parchment'
                    : 'text-mist hover:text-parchment'
                  }`}
              >
                <item.icon size={14} className={pathname === item.href ? 'text-blood' : 'text-ash group-hover:text-flame transition-colors'} />
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-blood transition-all duration-300 ${pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}

            <div className="w-[1px] h-4 bg-parchment/[0.06] mx-2" />

            <button
              onClick={handleLogout}
              data-cursor-hover
              className="flex items-center gap-2 text-mono-sm text-mist hover:text-blood transition-colors"
            >
              <LogOut size={14} />
              LOGOUT
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-void flex flex-col items-start justify-center px-8 md:hidden"
          >
            <div className="space-y-6 w-full max-w-sm mx-auto">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-4 font-display text-4xl tracking-wider transition-colors ${pathname === item.href ? 'text-flame' : 'text-parchment hover:text-flame'
                      }`}
                  >
                    <item.icon size={24} className={pathname === item.href ? 'text-blood' : 'text-mist'} />
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="pt-8 mt-8 border-t border-parchment/[0.06]"
              >
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-4 font-display text-3xl tracking-wider text-mist hover:text-blood transition-colors"
                >
                  <LogOut size={20} />
                  LOGOUT
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-24 px-6 lg:px-8 pb-20 min-h-screen">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  )
}
