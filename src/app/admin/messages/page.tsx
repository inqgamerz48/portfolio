'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, CheckCircle, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/Card'

interface Message {
  id: string
  name: string
  email: string
  projectType: string
  budget: string
  message: string
  read: boolean
  createdAt: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages')
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/messages/${id}/read`, { method: 'PUT' })
      setMessages(messages.map(m =>
        m.id === id ? { ...m, read: true } : m
      ))
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }

  const unreadCount = messages.filter(m => !m.read).length

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-cinzel text-3xl font-bold text-text">Messages</h1>
        <p className="font-inter text-text-muted mt-1">
          {unreadCount > 0 ? `${unreadCount} unread messages` : 'No unread messages'}
        </p>
      </motion.div>

      {isLoading ? (
        <div className="text-center py-12 text-text-muted">Loading...</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 text-text-muted">No messages yet</div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card
                  className={`cursor-pointer transition-all ${
                    !message.read ? 'border-l-4 border-l-primary' : ''
                  } ${selectedMessage?.id === message.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => {
                    setSelectedMessage(message)
                    if (!message.read) markAsRead(message.id)
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-cinzel font-semibold text-text">
                        {message.name}
                      </h3>
                      <p className="text-sm text-text-muted">
                        {new Date(message.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {!message.read && (
                      <span className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">
                      {message.projectType}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-card-border text-text-muted rounded">
                      {message.budget}
                    </span>
                  </div>

                  <p className="font-inter text-sm text-text-muted line-clamp-2">
                    {message.message}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24"
          >
            {selectedMessage ? (
              <Card>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-cinzel text-xl font-semibold text-text">
                      {selectedMessage.name}
                    </h2>
                    <p className="text-sm text-text-muted">
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {selectedMessage.read && (
                    <CheckCircle size={20} className="text-green-500" />
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-primary" />
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-text hover:text-primary transition-colors"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-text-muted">Project:</span>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-sm">
                      {selectedMessage.projectType}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-text-muted">Budget:</span>
                    <span className="px-2 py-0.5 bg-card-border text-text-muted rounded text-sm">
                      {selectedMessage.budget}
                    </span>
                  </div>
                </div>

                <div className="border-t border-card-border pt-4">
                  <h3 className="font-medium text-text mb-2">Message</h3>
                  <p className="font-inter text-text-muted whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Mail size={18} />
                    Reply via Email
                  </a>
                  <a
                    href={`https://wa.me/${selectedMessage.email.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Phone size={18} />
                    WhatsApp
                  </a>
                </div>
              </Card>
            ) : (
              <Card className="text-center py-12">
                <Mail size={48} className="mx-auto mb-4 text-text-muted" />
                <p className="text-text-muted">Select a message to view details</p>
              </Card>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}
