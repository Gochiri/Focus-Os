import { useState, useEffect } from 'react'
import { X, Calendar, Clock, Flag, Link2, Tag as TagIcon, Layout } from 'lucide-react'
import type { Task, Project, Goal, Tag, TaskStatus, TaskPriority } from '../../types'

interface TaskFormProps {
  task?: Task
  projects: Project[]
  goals: Goal[]
  tags: Tag[]
  onClose: () => void
  onSave: (taskData: any) => Promise<void>
}

export function TaskForm({ task, projects, goals, tags, onClose, onSave }: TaskFormProps) {
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: task?.title || '',
    notes: task?.notes || '',
    status: task?.status || 'pending' as TaskStatus,
    priority: task?.priority || 'medium' as TaskPriority,
    deadline: task?.deadline?.split('T')[0] || new Date().toISOString().split('T')[0],
    estimatedMinutes: task?.estimatedMinutes || 30,
    progress: task?.progress || 0,
    projectId: task?.projectId || null as string | null,
    goalId: task?.goalId || null as string | null,
    tagIds: task?.tagIds || [] as string[],
    blockedBy: task?.blockedBy || [] as string[]
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    try {
      setLoading(true)
      await onSave(formData)
      onClose()
    } catch (err) {
      console.error('Failed to save task', err)
      alert('Error al guardar la tarea')
    } finally {
      setLoading(false)
    }
  }

  const toggleTag = (tagId: string) => {
    setFormData(prev => ({
      ...prev,
      tagIds: prev.tagIds.includes(tagId)
        ? prev.tagIds.filter(id => id !== tagId)
        : [...prev.tagIds, tagId]
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            {task ? 'Editar Tarea' : 'Nueva Tarea'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <form id="task-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Título</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Ej: Revisar reporte semanal"
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none bg-white dark:bg-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Notas</label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Detalles adicionales..."
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none bg-white dark:bg-slate-800 dark:text-slate-100 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Estado</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as TaskStatus }))}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none bg-white dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value="pending">Pendiente</option>
                  <option value="in_progress">En Progreso</option>
                  <option value="completed">Completada</option>
                  <option value="blocked">Bloqueada</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Prioridad</label>
                <select
                  value={formData.priority}
                  onChange={e => setFormData(prev => ({ ...prev, priority: e.target.value as TaskPriority }))}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none bg-white dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value="low">Baja</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta (Impacto)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Fecha Límite</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={e => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none bg-white dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Est. (minutos)</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="number"
                    value={formData.estimatedMinutes}
                    onChange={e => setFormData(prev => ({ ...prev, estimatedMinutes: parseInt(e.target.value) }))}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none bg-white dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  <Layout size={16} className="text-slate-400" />
                  Proyecto
                </label>
                <select
                  value={formData.projectId || ''}
                  onChange={e => setFormData(prev => ({ ...prev, projectId: e.target.value || null }))}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none bg-white dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value="">Sin proyecto</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  <Target size={16} className="text-slate-400" />
                  Meta
                </label>
                <select
                  value={formData.goalId || ''}
                  onChange={e => setFormData(prev => ({ ...prev, goalId: e.target.value || null }))}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none bg-white dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value="">Sin meta</option>
                  {goals.map(g => (
                    <option key={g.id} value={g.id}>{g.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <TagIcon size={16} className="text-slate-400" />
                  Etiquetas
                </label>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                        formData.tagIds.includes(tag.id)
                          ? 'bg-violet-100 border-violet-200 text-violet-700 dark:bg-violet-900/40 dark:border-violet-800'
                          : 'bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-800 dark:border-slate-700'
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex gap-3 justify-end bg-slate-50/50 dark:bg-slate-900/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="task-form"
            disabled={loading}
            className="px-6 py-2 bg-slate-900 dark:bg-violet-600 text-white rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-violet-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Guardando...' : task ? 'Actualizar' : 'Crear Tarea'}
          </button>
        </div>
      </div>
    </div>
  )
}

import { Target } from 'lucide-react'
