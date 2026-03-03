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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-background">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed left-0 top-0 z-50 w-full bg-card/95 backdrop-blur-md border-b border-card-border"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="group">
            <span className="font-cinzel text-2xl font-bold text-primary text-glow">
              INQ Admin
            </span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-red-500 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md md:hidden"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-6 top-6 text-text"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 font-cinzel text-xl ${
                    pathname === item.href
                      ? 'text-primary'
                      : 'text-text'
                  }`}
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 font-cinzel text-xl text-red-500"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24 px-6 pb-12">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  )
}
