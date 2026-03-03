'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, ExternalLink, Github } from 'lucide-react'

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
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
        className="mb-12"
      >
        <h1 className="font-display text-5xl md:text-6xl text-parchment tracking-wider uppercase">Projects</h1>
        <p className="font-mono text-mist mt-3 uppercase tracking-widest text-sm">Manage portfolio work</p>
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
              {isEditing ? <><Edit size={24} className="text-blood" /> Edit Project</> : <><Plus size={24} className="text-blood" /> New Project</>}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-mono-sm text-mist tracking-widest uppercase ml-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="input-dark w-full"
                  placeholder="PROJECT NAME"
                />
              </div>

              <div className="space-y-2">
                <label className="text-mono-sm text-mist tracking-widest uppercase ml-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                  className="input-dark w-full resize-none"
                  placeholder="Detailed description of the project..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-mono-sm text-mist tracking-widest uppercase ml-1">Tech Stack</label>
                <input
                  type="text"
                  value={formData.stack}
                  onChange={(e) => setFormData({ ...formData, stack: e.target.value })}
                  className="input-dark w-full"
                  placeholder="Next.js, TypeScript, Tailwind"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-mono-sm text-mist tracking-widest uppercase ml-1">GitHub Repo</label>
                  <input
                    type="text"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="input-dark w-full"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-mono-sm text-mist tracking-widest uppercase ml-1">Live Demo</label>
                  <input
                    type="text"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="input-dark w-full"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 border border-parchment/20 bg-void group-hover:border-blood transition-colors rounded-sm">
                    <input
                      type="checkbox"
                      className="absolute opacity-0 cursor-pointer w-full h-full"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    {formData.featured && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 bg-blood rounded-sm" />
                    )}
                  </div>
                  <span className="text-mono-sm text-mist uppercase tracking-widest group-hover:text-parchment transition-colors">Featured</span>
                </label>

                <div className="flex items-center gap-3">
                  <label className="text-mono-sm text-mist tracking-widest uppercase">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="input-dark w-20 px-3 py-1 text-center"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-parchment/[0.04]">
                <button type="submit" data-cursor-hover className="flex-1 btn-blade bg-blood text-parchment">
                  {isEditing ? 'UPDATE PROJECT' : 'SAVE PROJECT'}
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
          ) : projects.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-parchment/20 text-mist font-mono uppercase tracking-widest text-sm">
              NO PROJECTS FOUND. CREATE ONE TO BEGIN.
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {projects.sort((a, b) => a.order - b.order).map((project) => (
                <div key={project.id} className="bg-ink border border-parchment/[0.04] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group hover:border-parchment/10 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-display text-4xl text-parchment tracking-wider uppercase group-hover:text-flame transition-colors">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="text-xs font-mono tracking-widest uppercase px-2 py-1 bg-blood/10 text-blood border border-blood/20 rounded-sm">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="text-mist text-sm leading-relaxed mb-4 max-w-2xl">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span key={tech} className="text-xs font-mono text-ash uppercase tracking-widest px-2 py-1 bg-void border border-parchment/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center gap-3 shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-parchment/[0.04]">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-3 bg-void border border-parchment/5 text-mist hover:text-parchment hover:border-parchment/20 transition-all rounded-sm flex-1 sm:flex-none flex justify-center"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-void border border-parchment/5 text-mist hover:text-parchment hover:border-parchment/20 transition-all rounded-sm flex-1 sm:flex-none flex justify-center" title="View Source">
                        <Github size={18} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-void border border-parchment/5 text-mist hover:text-parchment hover:border-parchment/20 transition-all rounded-sm flex-1 sm:flex-none flex justify-center" title="View Live">
                        <ExternalLink size={18} />
                      </a>
                    )}
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-3 bg-void border border-blood/10 text-blood hover:bg-blood hover:text-parchment transition-all rounded-sm flex-1 sm:flex-none flex justify-center"
                      title="Delete"
                    >
                      <Trash2 size={18} />
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
