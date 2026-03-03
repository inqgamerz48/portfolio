'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Edit, Check } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

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
      await fetch(`/api/services`, {
        method: 'PUT',
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
    setFormData({
      title: service.title,
      description: service.description,
      priceMin: service.priceMin,
      priceMax: service.priceMax,
      features: service.features.join('\n'),
      popular: service.popular,
      order: service.order,
    })
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      title: '',
      description: '',
      priceMin: 0,
      priceMax: 0,
      features: '',
      popular: false,
      order: 0,
    })
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-cinzel text-3xl font-bold text-text">Services</h1>
        <p className="font-inter text-text-muted mt-1">Manage your service offerings</p>
      </motion.div>

      {isLoading ? (
        <div className="text-center py-12 text-text-muted">Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className={service.popular ? 'border-accent' : ''}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-cinzel text-xl font-semibold text-text">
                      {service.title}
                    </h3>
                    {service.popular && (
                      <span className="text-xs px-2 py-0.5 bg-accent/20 text-accent rounded">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 text-text-muted hover:text-accent transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                </div>

                <div className="mb-4">
                  <span className="font-cinzel text-2xl font-bold text-primary">
                    ${service.priceMin}
                  </span>
                  <span className="text-text-muted"> - ${service.priceMax}</span>
                </div>

                <p className="font-inter text-sm text-text-muted mb-4">
                  {service.description}
                </p>

                <div className="space-y-1">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-text-muted"
                    >
                      <Check size={14} className="text-primary flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {editingId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <Card className="w-full max-w-lg">
            <h2 className="font-cinzel text-xl font-semibold text-text mb-4">
              Edit Service
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />

              <Input
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Min Price"
                  type="number"
                  value={formData.priceMin}
                  onChange={(e) => setFormData({ ...formData, priceMin: parseInt(e.target.value) || 0 })}
                  required
                />
                <Input
                  label="Max Price"
                  type="number"
                  value={formData.priceMax}
                  onChange={(e) => setFormData({ ...formData, priceMax: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>

              <div className="w-full">
                <label className="mb-2 block text-sm font-medium text-text-muted">
                  Features (one per line)
                </label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full rounded-lg border border-card-border bg-background px-4 py-3 text-text input-glow min-h-[100px]"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="popular"
                  checked={formData.popular}
                  onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                  className="w-4 h-4 accent-primary"
                />
                <label htmlFor="popular" className="text-sm text-text-muted">
                  Mark as Most Popular
                </label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Update Service
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
