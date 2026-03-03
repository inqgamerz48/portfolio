'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Edit, Trash2, Eye, Upload } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'

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
        className="mb-8"
      >
        <h1 className="font-cinzel text-3xl font-bold text-text">Blog</h1>
        <p className="font-inter text-text-muted mt-1">Manage your blog posts with PDF upload</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <h2 className="font-cinzel text-xl font-semibold text-text mb-4">
              {isEditing ? 'Edit Post' : 'Add New Post'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
              />

              <Input
                label="Slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />

              <Textarea
                label="Excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              />

              <div className="w-full">
                <label className="mb-2 block text-sm font-medium text-text-muted">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-lg border border-card-border bg-background px-4 py-3 text-text input-glow"
                >
                  <option value="Development">Development</option>
                  <option value="AI">AI</option>
                  <option value="Projects">Projects</option>
                  <option value="Tips">Tips</option>
                </select>
              </div>

              <div className="w-full">
                <label className="mb-2 block text-sm font-medium text-text-muted">
                  PDF File (optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center justify-center w-full h-12 border border-card-border rounded-lg bg-card hover:border-primary transition-colors">
                    <Upload size={18} className="mr-2 text-text-muted" />
                    <span className="text-sm text-text-muted">
                      {formData.pdf ? formData.pdf.name : 'Upload PDF'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 accent-primary"
                />
                <label htmlFor="published" className="text-sm text-text-muted">
                  Published
                </label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={uploading} className="flex-1">
                  {uploading ? 'Saving...' : isEditing ? 'Update' : 'Create'} Post
                </Button>
                {isEditing && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          {isLoading ? (
            <div className="text-center py-12 text-text-muted">Loading...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 text-text-muted">No posts yet</div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-cinzel text-lg font-semibold text-text">
                      {post.title}
                      {post.pdfUrl && (
                        <span className="ml-2 text-xs px-2 py-0.5 bg-accent/20 text-accent rounded">
                          PDF
                        </span>
                      )}
                      {!post.published && (
                        <span className="ml-2 text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-500 rounded">
                          Draft
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded">
                        {post.category}
                      </span>
                      <span className="text-xs text-text-muted">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {post.pdfUrl && (
                      <a
                        href={post.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-text-muted hover:text-primary transition-colors"
                      >
                        <Eye size={18} />
                      </a>
                    )}
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 text-text-muted hover:text-accent transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      className="p-2 text-text-muted hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
