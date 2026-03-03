'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Edit, Check, Plus } from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string
  priceMin: number
  priceMax: number
  features: string[]
  popular: boolean
  order: number
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priceMin: 0,
    priceMax: 0,
    features: '',
    popular: false,
    order: 0,
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      setServices(data)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const method = editingId ? 'PUT' : 'POST'
      await fetch(`/api/services`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingId,
          ...formData,
          features: formData.features.split('\n').filter(f => f.trim()),
        }),
      })

      fetchServices()
      resetForm()
    } catch (error) {
      console.error('Error saving service:', error)
    }
  }

  const handleEdit = (service: Service) => {
    setEditingId(service.id)
    setIsAddingNew(false)
    setFormData({
      title: service.title,
      description: service.description,
      priceMin: service.priceMin,
      priceMax: service.priceMax,
      features: service.features.join('\n'),
      popular: service.popular,
      order: service.order,
    })
    document.body.style.overflow = 'hidden'
  }

  const handleAddNew = () => {
    resetForm()
    setIsAddingNew(true)
    document.body.style.overflow = 'hidden'
  }

  const resetForm = () => {
    setEditingId(null)
    setIsAddingNew(false)
    setFormData({
      title: '',
      description: '',
      priceMin: 0,
      priceMax: 0,
      features: '',
      popular: false,
      order: 0,
    })
    document.body.style.overflow = 'auto'
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
      >
        <div>
          <h1 className="font-display text-5xl md:text-6xl text-parchment tracking-wider uppercase">Services</h1>
          <p className="font-mono text-mist mt-3 uppercase tracking-widest text-sm">Manage service offerings</p>
        </div>
        <button onClick={handleAddNew} data-cursor-hover className="btn-blade bg-parchment text-void self-start sm:self-auto py-3 px-6">
          <span className="flex items-center gap-2"><Plus size={18} /> NEW SERVICE</span>
        </button>
      </motion.div>

      {isLoading ? (
        <div className="flex items-center justify-center py-24 text-blood">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blood"></div>
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-parchment/20 text-mist font-mono uppercase tracking-widest text-sm">
          NO SERVICES FOUND. CREATE ONE TO BEGIN.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.sort((a, b) => a.order - b.order).map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={`bg-ink border p-8 h-full flex flex-col transition-colors group ${service.popular ? 'border-blood relative shadow-[0_0_30px_-5px_var(--blood)] shadow-blood/10' : 'border-parchment/[0.04] hover:border-parchment/20'}`}>
                {service.popular && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-blood text-parchment text-[10px] font-mono tracking-[0.2em] px-3 py-1 uppercase">
                    Most Popular
                  </div>
                )}

                <div className="flex items-start justify-between mb-6">
                  <h3 className="font-display text-4xl text-parchment uppercase tracking-wider group-hover:text-flame transition-colors">
                    {service.title}
                  </h3>
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 text-mist hover:text-blood transition-colors -mr-2"
                  >
                    <Edit size={18} />
                  </button>
                </div>

                <div className="mb-6 pb-6 border-b border-parchment/[0.04]">
                  <span className="font-display text-5xl text-gold tracking-wider">
                    ${service.priceMin}
                  </span>
                  <span className="font-mono text-mist ml-2 uppercase tracking-widest text-sm"> - ${service.priceMax}</span>
                </div>

                <p className="text-mist text-sm leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>

                <div className="space-y-3 mt-auto pt-6">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 text-sm text-parchment/80 font-mono"
                    >
                      <Check size={16} className="text-blood shrink-0 mt-0.5" />
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {(isAddingNew || editingId) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 backdrop-blur-sm p-4 overflow-y-auto"
        >
          <div className="bg-ink border border-parchment/10 w-full max-w-2xl my-8 relative">
            <div className="p-8 sm:p-12">
              <h2 className="font-display text-4xl text-parchment uppercase tracking-wider mb-8 flex items-center gap-3">
                {editingId ? <><Edit size={24} className="text-blood" /> Edit Service</> : <><Plus size={24} className="text-blood" /> New Service</>}
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
                    placeholder="SERVICE NAME"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-mono-sm text-mist tracking-widest uppercase ml-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                    className="input-dark w-full resize-none"
                    placeholder="Short description of this service tier..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-mono-sm text-mist tracking-widest uppercase ml-1">Min Price ($)</label>
                    <input
                      type="number"
                      value={formData.priceMin}
                      onChange={(e) => setFormData({ ...formData, priceMin: parseInt(e.target.value) || 0 })}
                      required
                      className="input-dark w-full text-gold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-mono-sm text-mist tracking-widest uppercase ml-1">Max Price ($)</label>
                    <input
                      type="number"
                      value={formData.priceMax}
                      onChange={(e) => setFormData({ ...formData, priceMax: parseInt(e.target.value) || 0 })}
                      required
                      className="input-dark w-full text-gold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-mono-sm text-mist tracking-widest uppercase ml-1">
                    Features (One per line)
                  </label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    className="input-dark w-full min-h-[150px] font-mono text-sm leading-relaxed whitespace-pre"
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  />
                </div>

                <div className="flex items-center gap-8 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-5 h-5 border border-parchment/20 bg-void group-hover:border-blood transition-colors rounded-sm">
                      <input
                        type="checkbox"
                        className="absolute opacity-0 cursor-pointer w-full h-full"
                        checked={formData.popular}
                        onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                      />
                      {formData.popular && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 bg-blood rounded-sm" />
                      )}
                    </div>
                    <span className="text-mono-sm text-mist uppercase tracking-widest group-hover:text-parchment transition-colors">Mark as Most Popular</span>
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

                <div className="flex gap-4 pt-6 mt-6 border-t border-parchment/[0.04]">
                  <button type="submit" data-cursor-hover className="flex-1 btn-blade bg-blood text-parchment">
                    {editingId ? 'UPDATE SERVICE' : 'CREATE SERVICE'}
                  </button>
                  <button type="button" onClick={resetForm} className="px-8 py-3 font-mono text-sm uppercase tracking-widest text-mist hover:text-flame border border-parchment/20 hover:border-blood/50 transition-colors">
                    CANCEL
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
