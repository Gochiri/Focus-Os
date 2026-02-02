import { useState, useEffect } from 'react'
import { GoalKanban } from '../components/goals/GoalKanban'
import { GoalForm } from '../components/goals/GoalForm'
import { goalService } from '../services/goalService'
import type { Goal, GoalStatus } from '../types'

export function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [, setError] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<Goal | undefined>()
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  useEffect(() => {
    loadGoals()

    // Subscribe to real-time updates
    const unsubscribe = goalService.subscribeToGoals(() => {
      loadGoals()
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const loadGoals = async () => {
    try {
      setLoading(true)
      const data = await goalService.getGoals()
      setGoals(data)
      setError(null)
    } catch (err) {
      console.error('Failed to load goals:', err)
      setError('Error al cargar metas')
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
      loadGoals()
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Eliminar esta meta?')) {
      try {
        setGoals(prev => prev.filter(g => g.id !== id))
        await goalService.deleteGoal(id)
      } catch (err) {
        console.error('Failed to delete goal:', err)
        loadGoals()
      }
    }
  }

  const handleSave = async (goalData: any) => {
    if (editingGoal) {
      await goalService.updateGoal(editingGoal.id, goalData)
    } else {
      await goalService.createGoal(goalData)
    }
    loadGoals()
  }

  const handleEdit = (id: string) => {
    const goal = goals.find(g => g.id === id)
    if (goal) {
      setEditingGoal(goal)
      setIsFormOpen(true)
    }
  }

  const filteredGoals = goals.filter(g => {
    if (filter === 'all') return true
    if (filter === 'active') return g.status !== 'completada'
    if (filter === 'completed') return g.status === 'completada'
    return true
  })

  if (loading && goals.length === 0) {
    return <div className="p-8 text-center text-slate-500">Cargando metas...</div>
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mis Metas</h1>
          <p className="text-slate-500">Visualiza y gestiona tus objetivos de alto nivel.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                filter === f 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {f === 'all' ? 'Todas' : f === 'active' ? 'Activas' : 'Completadas'}
            </button>
          ))}
        </div>
      </div>

      <GoalKanban
        goals={filteredGoals}
        onCreate={() => {
          setEditingGoal(undefined)
          setIsFormOpen(true)
        }}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onView={handleEdit}
        onEdit={handleEdit}
      />

      {isFormOpen && (
        <GoalForm
          goal={editingGoal}
          onClose={() => {
            setIsFormOpen(false)
            setEditingGoal(undefined)
          }}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
