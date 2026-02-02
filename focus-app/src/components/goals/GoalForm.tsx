import { useState } from 'react'
import { X, Target, Zap, Clock, CheckSquare, Folder } from 'lucide-react'
import type { Goal, GoalStatus, SMARTDetails, RPMDetails } from '../../types'
import { MilestoneList } from './MilestoneList'
import { GoalProjectList } from './GoalProjectList'

interface GoalFormProps {
  goal?: Goal
  onClose: () => void
  onSave: (goalData: any) => Promise<void>
}

export function GoalForm({ goal, onClose, onSave }: GoalFormProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'smart' | 'rpm' | 'milestones' | 'projects'>(goal ? 'basic' : 'basic')
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: goal?.title || '',
    description: goal?.description || '',
    status: goal?.status || 'por_iniciar' as GoalStatus,
    dueDate: goal?.dueDate?.split('T')[0] || new Date().toISOString().split('T')[0],
    tags: goal?.tags || [],
    smart: goal?.smart || { specific: '', measurable: '', achievable: '', relevant: '', timeBound: '' },
    rpm: goal?.rpm || { result: '', purpose: '', massiveActionPlan: '' }
  })

  const handleSmartChange = (key: keyof SMARTDetails, value: string) => {
    setFormData(prev => ({
      ...prev,
      smart: { ...prev.smart, [key]: value }
    }))
  }

  const handleRPMChange = (key: keyof RPMDetails, value: string) => {
    setFormData(prev => ({
      ...prev,
      rpm: { ...prev.rpm, [key]: value }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    try {
      setLoading(true)
      await onSave(formData)
      onClose()
    } catch (err) {
      console.error('Failed to save goal', err)
      alert('Error al guardar la meta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">
            {goal ? 'Editar Meta' : 'Nueva Meta'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-6 border-b border-slate-100 bg-slate-50/50">
          {[
            { id: 'basic', label: 'Básico', icon: <Target size={16} /> },
            { id: 'smart', label: 'SMART', icon: <Clock size={16} /> },
            { id: 'rpm', label: 'RPM', icon: <Zap size={16} /> },
            ...(goal ? [
              { id: 'milestones', label: 'Hitos', icon: <CheckSquare size={16} /> },
              { id: 'projects', label: 'Proyectos', icon: <Folder size={16} /> }
            ] : [])
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.id ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form id="goal-form" onSubmit={handleSubmit}>
            {activeTab === 'basic' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Título</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Ej: Lanzar aplicación v1.0"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="¿De qué trata esta meta?"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 focus:outline-none resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Estado</label>
                    <select
                      value={formData.status}
                      onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as GoalStatus }))}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 focus:outline-none"
                    >
                      <option value="por_iniciar">Por Iniciar</option>
                      <option value="en_progreso">En Progreso</option>
                      <option value="completada">Completada</option>
                      <option value="pausada">Pausada</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Fecha Límite</label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={e => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'smart' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 mb-2">Estructura tu meta usando el marco SMART para mayor claridad.</p>
                {Object.keys(formData.smart).map((key) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <textarea
                      rows={2}
                      value={(formData.smart as any)[key]}
                      onChange={e => handleSmartChange(key as any, e.target.value)}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 focus:outline-none resize-none"
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'rpm' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 mb-2">Result-Purpose-Massive Action Plan (Método Tony Robbins).</p>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 font-bold">R: Result (Resultado Deseado)</label>
                  <textarea
                    rows={2}
                    value={formData.rpm.result}
                    onChange={e => handleRPMChange('result', e.target.value)}
                    placeholder="¿Qué es exactamente lo que quieres lograr?"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 focus:outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 font-bold">P: Purpose (Tu Por Qué)</label>
                  <textarea
                    rows={2}
                    value={formData.rpm.purpose}
                    onChange={e => handleRPMChange('purpose', e.target.value)}
                    placeholder="¿Cuáles son las razones emocionales para lograr esto?"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 focus:outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 font-bold">M: Massive Action Plan (Plan de Acción)</label>
                  <textarea
                    rows={4}
                    value={formData.rpm.massiveActionPlan}
                    onChange={e => handleRPMChange('massiveActionPlan', e.target.value)}
                    placeholder="Pasos clave para llegar allí..."
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 focus:outline-none resize-none"
                  />
                </div>
              </div>
            )}

            {activeTab === 'milestones' && goal && (
              <MilestoneList goalId={goal.id} initialMilestones={goal.milestones} />
            )}

            {activeTab === 'projects' && goal && (
              <GoalProjectList goalId={goal.id} initialProjects={goal.projects} />
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="goal-form"
            disabled={loading}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Guardando...' : goal ? 'Actualizar Meta' : 'Crear Meta'}
          </button>
        </div>
      </div>
    </div>
  )
}
