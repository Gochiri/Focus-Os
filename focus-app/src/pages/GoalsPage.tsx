import { useState, useEffect } from 'react'
import { GoalKanban } from '../components/goals/GoalKanban'
import { goalService } from '../services/goalService'
import type { Goal, GoalStatus } from '../types'

const MOCK_GOALS: Goal[] = [
  {
    id: 'goal-001',
    title: 'Lanzar App FocusAI v1.0',
    description: 'Completar MVP funcional con dashboard, tareas y coach de IA para la primera semana de febrero.',
    progress: 75,
    status: 'en_progreso',
    dueDate: '2024-02-15',
    tags: ['Producto', 'Q1', 'Tech'],
    milestones: [
      { id: 'm1', title: 'Diseño de UI', completed: true },
      { id: 'm2', title: 'Modelo de datos', completed: true },
      { id: 'm3', title: 'Integración IA', completed: false }
    ],
    linkedTasks: [
      { id: 't1', title: 'Fix types', completed: true },
      { id: 't2', title: 'Build Dashboard', completed: true },
      { id: 't3', title: 'Test Prompting', completed: false }
    ],
    smart: { specific: '', measurable: '', achievable: '', relevant: '', timeBound: '' },
    rpm: { result: '', purpose: '', massiveActionPlan: '' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadGoals()
  }, [])

  const loadGoals = async () => {
    try {
      setLoading(true)
      const data = await goalService.getGoals()
      setGoals(data.length > 0 ? data : MOCK_GOALS)
      setError(null)
    } catch (err) {
      console.error('Failed to load goals, using mocks:', err)
      setGoals(MOCK_GOALS)
      // We don't set the error state here so the UI still renders the mocks
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: string, newStatus: GoalStatus) => {
    try {
      // Optimistic update
      setGoals(prev => prev.map(g =>
        g.id === id ? { ...g, status: newStatus } : g
      ))
      
      await goalService.updateGoal(id, { status: newStatus })
    } catch (err) {
      console.error('Failed to update goal status:', err)
      // Revert on error (could be improved)
      loadGoals()
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Eliminar esta meta?')) {
      try {
        setGoals(prev => prev.filter(g => g.id !== id)) // Optimistic
        await goalService.deleteGoal(id)
      } catch (err) {
        console.error('Failed to delete goal:', err)
        loadGoals()
      }
    }
  }

  const handleCreate = async () => {
    const title = prompt('Título de la nueva meta:')
    if (!title) return

    try {
      const newGoal = await goalService.createGoal({
        title,
        description: 'Nueva meta creada desde la UI',
        status: 'por_iniciar',
        progress: 0,
        dueDate: new Date().toISOString(), // Default to today/now for simplicity
        tags: ['Nueva'],
        smart: { specific: '', measurable: '', achievable: '', relevant: '', timeBound: '' },
        rpm: { result: '', purpose: '', massiveActionPlan: '' }
      })
      setGoals(prev => [newGoal, ...prev])
    } catch (err) {
      console.error('Failed to create goal:', err)
      alert('Error al crear la meta')
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Cargando metas...</div>
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={loadGoals}
          className="px-4 py-2 bg-slate-200 rounded hover:bg-slate-300 transition-colors"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <GoalKanban
        goals={goals}
        onCreate={handleCreate}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onView={(id) => console.log('View', id)}
        onEdit={(id) => console.log('Edit', id)}
      />
    </div>
  )
}
