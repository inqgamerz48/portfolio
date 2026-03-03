'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, CheckCircle, ExternalLink } from 'lucide-react'

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
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, read: true })
      }
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
        className="mb-12"
      >
        <h1 className="font-display text-5xl md:text-6xl text-parchment tracking-wider uppercase">Inbox</h1>
        <div className="flex items-center gap-3 mt-3">
          <p className="font-mono text-mist uppercase tracking-widest text-sm">
            Client Inquiries
          </p>
          <span className="text-mist/30">|</span>
          <p className="font-mono text-blood/80 uppercase tracking-widest text-sm">
            {unreadCount > 0 ? `${unreadCount} UNREAD` : 'ALL READ'}
          </p>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="flex items-center justify-center py-24 text-blood">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blood"></div>
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-parchment/20 text-mist font-mono uppercase tracking-widest text-sm">
          NO MESSAGES YET
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12">
          {/* Messages List - Compact Left Side */}
          <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2 scrollbar-thin">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  className={`bg-ink border p-6 cursor-pointer group transition-all duration-300 ${!message.read ? 'border-blood relative shadow-[0_0_15px_-5px_var(--blood)] shadow-blood/10' : 'border-parchment/[0.04] hover:border-parchment/20'
                    } ${selectedMessage?.id === message.id ? 'bg-void border-parchment/30' : ''}`}
                  onClick={() => {
                    setSelectedMessage(message)
                    if (!message.read) markAsRead(message.id)
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`font-display text-2xl tracking-wide uppercase transition-colors ${!message.read ? 'text-parchment group-hover:text-flame' : 'text-parchment/80 group-hover:text-parchment'}`}>
                        {message.name}
                      </h3>
                      <p className="font-mono text-[10px] text-mist tracking-widest uppercase mt-1">
                        {new Date(message.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                      </p>
                    </div>
                    {!message.read && (
                      <span className="relative flex h-3 w-3 mt-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-sm bg-blood opacity-75"></span>
                        <span className="relative inline-flex rounded-sm h-3 w-3 bg-blood"></span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 border border-parchment/10 text-ash">
                      {message.projectType}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 border border-parchment/10 text-gold/80">
                      {message.budget}
                    </span>
                  </div>

                  <p className={`font-mono text-sm line-clamp-2 leading-relaxed ${!message.read ? 'text-mist' : 'text-mist/60'}`}>
                    {message.message}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Reading Pane - Sticky Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            {selectedMessage ? (
              <div className="bg-ink border border-parchment/10 p-8 sm:p-12 relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blood/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="flex items-start justify-between mb-8 pb-8 border-b border-parchment/[0.04]">
                  <div>
                    <h2 className="font-display text-4xl text-parchment uppercase tracking-wider">
                      {selectedMessage.name}
                    </h2>
                    <p className="font-mono text-xs text-mist tracking-widest uppercase mt-2">
                      {new Date(selectedMessage.createdAt).toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  {selectedMessage.read && (
                    <div className="flex items-center gap-2 text-mist/50">
                      <CheckCircle size={16} />
                      <span className="font-mono text-[10px] tracking-widest uppercase">Read</span>
                    </div>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-8 mb-10 text-sm">
                  <div>
                    <span className="font-mono text-mist/60 text-[10px] tracking-widest uppercase block mb-1">Email</span>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="font-mono text-parchment hover:text-blood transition-colors inline-block pb-0.5 border-b border-transparent hover:border-blood/30"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>

                  <div>
                    <span className="font-mono text-mist/60 text-[10px] tracking-widest uppercase block mb-1">Project Match</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-parchment">
                        {selectedMessage.projectType}
                      </span>
                      <span className="text-mist/30">/</span>
                      <span className="font-mono text-gold">
                        {selectedMessage.budget}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-12">
                  <h3 className="font-mono text-mist/60 text-[10px] tracking-widest uppercase mb-4">Message Content</h3>
                  <div className="font-mono text-sm md:text-base text-mist leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-parchment/[0.04]">
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    data-cursor-hover
                    className="flex-1 btn-blade bg-parchment text-void flex justify-center py-4"
                  >
                    <span className="flex items-center gap-2">
                      <Mail size={16} />
                      REPLY VIA EMAIL
                    </span>
                  </a>
                  <a
                    href={`https://wa.me/${selectedMessage.email.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="sm:w-auto px-8 py-4 bg-void border border-parchment/20 text-mist hover:text-parchment hover:border-parchment overflow-hidden group relative flex items-center justify-center transition-colors"
                  >
                    <div className="absolute inset-0 bg-green-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                    <span className="relative flex items-center gap-2 font-mono text-sm tracking-widest uppercase z-10">
                      <Phone size={16} className="group-hover:-rotate-12 transition-transform" />
                      WHATSAPP
                    </span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-ink/50 border border-dashed border-parchment/10 h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full border border-parchment/10 flex items-center justify-center mb-6">
                  <Mail size={24} className="text-mist/50" />
                </div>
                <p className="font-display text-2xl text-parchment/50 tracking-widest uppercase mb-2">Select a message</p>
                <p className="font-mono text-xs text-mist/50 tracking-widest uppercase">View full inquiry details here</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}
