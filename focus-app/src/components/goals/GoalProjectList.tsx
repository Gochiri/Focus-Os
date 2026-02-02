import { useState, useEffect } from 'react'
import { Plus, X, Pencil } from 'lucide-react'
import { projectService } from '../../services/projectService'
import type { Project } from '../../types'

interface GoalProjectListProps {
  goalId: string
  initialProjects?: Project[]
  onUpdate?: () => void
}

export function GoalProjectList({ goalId, initialProjects = [], onUpdate }: GoalProjectListProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    color: '#3b82f6'
  })

  useEffect(() => {
    setProjects(initialProjects)
  }, [initialProjects])

  const handleSave = async () => {
    if (!formData.name.trim() || !goalId) return

    try {
      setLoading(true)
      if (editingId) {
        await projectService.updateProject(editingId, { ...formData })
      } else {
        await projectService.createProject({
          ...formData,
          goalId
        })
      }
      
      // Refresh list
      const updatedList = await projectService.getProjects(goalId)
      setProjects(updatedList)
      
      setFormData({ name: '', color: '#3b82f6' })
      setIsAdding(false)
      setEditingId(null)
      onUpdate?.()
    } catch (err) {
      console.error('Failed to save project', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (project: Project) => {
    setFormData({ name: project.name, color: project.color })
    setEditingId(project.id)
    setIsAdding(true)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Eliminar este proyecto?')) return
    try {
      await projectService.deleteProject(id)
      setProjects(prev => prev.filter(p => p.id !== id))
      onUpdate?.()
    } catch (err) {
      console.error('Failed to delete project', err)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-slate-700">Proyectos Vinculados</h4>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="text-xs flex items-center gap-1 text-violet-600 hover:text-violet-700 font-bold"
          >
            <Plus size={14} />
            Añadir Proyecto
          </button>
        )}
      </div>

      {isAdding && (
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Nombre del proyecto..."
            className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500">Color:</label>
            <input
              type="color"
              value={formData.color}
              onChange={e => setFormData(prev => ({ ...prev, color: e.target.value }))}
              className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
            />
            <div className="flex-1" />
            <button
              onClick={() => { setIsAdding(false); setEditingId(null); setFormData({ name: '', color: '#3b82f6' }) }}
              className="text-xs px-3 py-1.5 text-slate-500 hover:text-slate-700 font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={loading || !formData.name.trim()}
              className="text-xs px-3 py-1.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50"
            >
              {editingId ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {projects.length === 0 && !isAdding && (
          <p className="text-sm text-slate-400 text-center py-4 italic">No hay proyectos asociados a esta meta.</p>
        )}
        {projects.map(project => (
          <div key={project.id} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl hover:border-slate-200 transition-colors group">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 truncate">{project.name}</p>
              <div className="w-full bg-slate-100 h-1 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="h-full bg-slate-400 transition-all" 
                  style={{ width: `${project.progress}%` }} 
                />
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-400">{project.progress}%</span>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEdit(project)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="p-1 text-slate-400 hover:text-red-500"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
