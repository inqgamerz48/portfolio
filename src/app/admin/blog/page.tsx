'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Edit, Trash2, Eye, Upload, Plus } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  pdfUrl: string | null
  category: string
  published: boolean
  createdAt: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    category: 'Development',
    published: false,
    pdf: null as File | null,
  })
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: editingPost ? formData.slug : slugify(title),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('slug', formData.slug)
      formDataToSend.append('excerpt', formData.excerpt)
      formDataToSend.append('category', formData.category)
      formDataToSend.append('published', String(formData.published))

      if (formData.pdf) {
        formDataToSend.append('pdf', formData.pdf)
      }

      if (editingPost) {
        await fetch(`/api/blog/${editingPost.slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: formData.title,
            slug: formData.slug,
            excerpt: formData.excerpt,
            category: formData.category,
            published: formData.published,
          }),
        })
      } else {
        await fetch('/api/blog', {
          method: 'POST',
          body: formDataToSend,
        })
      }

      fetchPosts()
      resetForm()
    } catch (error) {
      console.error('Error saving post:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      await fetch(`/api/blog/${slug}`, { method: 'DELETE' })
      fetchPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      category: post.category,
      published: post.published,
      pdf: null,
    })
    setIsEditing(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      category: 'Development',
      published: false,
      pdf: null,
    })
    setEditingPost(null)
    setIsEditing(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setFormData({ ...formData, pdf: file })
    }
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="font-display text-5xl md:text-6xl text-parchment tracking-wider uppercase">Journal</h1>
        <p className="font-mono text-mist mt-3 uppercase tracking-widest text-sm">Manage blog & PDF publications</p>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:sticky top-24 h-fit"
        >
          <div className="bg-ink border border-parchment/[0.04] p-6 sm:p-8">
            <h2 className="font-display text-3xl text-parchment uppercase tracking-wider mb-8 flex items-center gap-3">
              {isEditing ? <><Edit size={24} className="text-blood" /> Edit Post</> : <><Plus size={24} className="text-blood" /> New Post</>}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-mono-sm text-mist tracking-widest uppercase ml-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  className="input-dark w-full"
                  placeholder="POST TITLE"
                />
              </div>

              <div className="space-y-2">
                <label className="text-mono-sm text-mist tracking-widest uppercase ml-1">Slug URL</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  className="input-dark w-full text-mist/70 font-mono text-sm"
                  placeholder="post-url-slug"
                />
              </div>

              <div className="space-y-2">
                <label className="text-mono-sm text-mist tracking-widest uppercase ml-1">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  className="input-dark w-full resize-none"
                  placeholder="Brief summary..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-mono-sm text-mist tracking-widest uppercase ml-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-void border border-parchment/10 text-parchment px-4 py-3 font-mono text-sm tracking-widest uppercase focus:border-blood focus:outline-none transition-colors rounded-none appearance-none cursor-pointer hover:border-parchment/30"
                >
                  <option value="Development" className="bg-ink text-parchment">Development</option>
                  <option value="AI" className="bg-ink text-parchment">AI</option>
                  <option value="Projects" className="bg-ink text-parchment">Projects</option>
                  <option value="Systems" className="bg-ink text-parchment">Systems</option>
                  <option value="Design" className="bg-ink text-parchment">Design</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-mono-sm text-mist tracking-widest uppercase ml-1">Attach PDF</label>
                <div className="relative group">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex items-center justify-center w-full h-14 border border-dashed border-parchment/20 bg-void group-hover:border-blood group-hover:bg-blood/5 transition-all">
                    <Upload size={18} className="mr-3 text-mist group-hover:text-blood transition-colors" />
                    <span className="font-mono text-sm text-mist uppercase tracking-widest group-hover:text-parchment transition-colors truncate px-4">
                      {formData.pdf ? formData.pdf.name : 'CLICK TO UPLOAD PDF'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 border border-parchment/20 bg-void group-hover:border-blood transition-colors rounded-sm">
                    <input
                      type="checkbox"
                      className="absolute opacity-0 cursor-pointer w-full h-full"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    />
                    {formData.published && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 bg-blood rounded-sm" />
                    )}
                  </div>
                  <span className="text-mono-sm text-mist uppercase tracking-widest group-hover:text-parchment transition-colors">Published (Live)</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4 border-t border-parchment/[0.04]">
                <button type="submit" disabled={uploading} data-cursor-hover className="flex-1 btn-blade bg-blood text-parchment disabled:opacity-50">
                  {uploading ? 'UPLOADING...' : isEditing ? 'UPDATE POST' : 'CREATE POST'}
                </button>
                {isEditing && (
                  <button type="button" onClick={resetForm} className="px-6 py-3 font-mono text-sm uppercase tracking-widest text-mist hover:text-parchment border border-parchment/20 hover:border-parchment/50 transition-colors">
                    CANCEL
                  </button>
                )}
              </div>
            </form>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-24 text-blood">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blood"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-parchment/20 text-mist font-mono uppercase tracking-widest text-sm">
              NO POSTS YET. START WRITING.
            </div>
          ) : (
            <div className="flex flex-col border-t border-parchment/[0.04]">
              {posts.map((post) => (
                <div key={post.id} className="py-6 border-b border-parchment/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-ink/50 transition-colors px-4 -mx-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="font-mono text-xs text-mist uppercase tracking-widest">
                        {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                      </span>
                      <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 border border-parchment/10 text-ash">
                        {post.category}
                      </span>
                      {!post.published && (
                        <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                          Draft
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-2xl text-parchment tracking-wider uppercase group-hover:text-flame transition-colors">
                      {post.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {post.pdfUrl && (
                      <a
                        href={post.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View PDF"
                        className="p-3 bg-void border border-parchment/5 text-mist hover:text-parchment hover:border-parchment/20 transition-all rounded-sm flex items-center gap-2 group/btn"
                      >
                        <Eye size={16} />
                        <span className="hidden leading-none sm:block font-mono text-[10px] tracking-widest uppercase">PDF</span>
                      </a>
                    )}
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-3 bg-void border border-parchment/5 text-mist hover:text-parchment hover:border-parchment/20 transition-all rounded-sm"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      className="p-3 bg-void border border-blood/10 text-blood hover:bg-blood hover:text-parchment transition-all rounded-sm"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
