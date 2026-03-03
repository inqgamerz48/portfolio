'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, ExternalLink, Github } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'

interface Project {
  id: string
  title: string
  description: string
  stack: string[]
  githubUrl: string | null
  liveUrl: string | null
  featured: boolean
  order: number
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    stack: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    order: 0,
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const payload = {
      ...formData,
      stack: formData.stack.split(',').map(s => s.trim()).filter(Boolean),
    }

    try {
      if (editingProject) {
        await fetch(`/api/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }

      fetchProjects()
      resetForm()
    } catch (error) {
      console.error('Error saving project:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      fetchProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      stack: project.stack.join(', '),
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      featured: project.featured,
      order: project.order,
    })
    setIsEditing(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      stack: '',
      githubUrl: '',
      liveUrl: '',
      featured: false,
      order: 0,
    })
    setEditingProject(null)
    setIsEditing(false)
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-cinzel text-3xl font-bold text-text">Projects</h1>
        <p className="font-inter text-text-muted mt-1">Manage your portfolio projects</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <h2 className="font-cinzel text-xl font-semibold text-text mb-4">
              {isEditing ? 'Edit Project' : 'Add New Project'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />

              <Textarea
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />

              <Input
                label="Tech Stack (comma separated)"
                value={formData.stack}
                onChange={(e) => setFormData({ ...formData, stack: e.target.value })}
                placeholder="Next.js, TypeScript, PostgreSQL"
              />

              <Input
                label="GitHub URL"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              />

              <Input
                label="Live URL"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 accent-primary"
                />
                <label htmlFor="featured" className="text-sm text-text-muted">
                  Featured Project
                </label>
              </div>

              <Input
                label="Order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              />

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {isEditing ? 'Update' : 'Add'} Project
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
          ) : projects.length === 0 ? (
            <div className="text-center py-12 text-text-muted">No projects yet</div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <Card key={project.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-cinzel text-lg font-semibold text-text">
                      {project.title}
                      {project.featured && (
                        <span className="ml-2 text-xs px-2 py-0.5 bg-primary/20 text-primary rounded">
                          Featured
                        </span>
                      )}
                    </h3>
                    <p className="font-inter text-sm text-text-muted line-clamp-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 bg-card-border text-text-muted rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-text-muted hover:text-primary transition-colors"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-text-muted hover:text-primary transition-colors"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 text-text-muted hover:text-accent transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
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
