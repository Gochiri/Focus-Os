import { useState } from 'react'
import { GoalKanban } from '../components/goals/GoalKanban'
import type { Goal, GoalStatus } from '../types'

const initialGoals: Goal[] = [
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
    smartFields: {
      specific: 'Lanzar app FocusAI',
      measurable: '20 usuarios activos',
      achievable: 'Si, con foco',
      relevant: 'Core business',
      timeBound: '15 Feb'
    },
    rpmFields: {
      result: 'App en producción',
      purpose: 'Ayudar a otros a ser productivos',
      massiveActionPlan: ['Plan', 'Code', 'Launch']
    }
  },
  {
    id: 'goal-002',
    title: 'Cerrar 3 clientes Beta',
    description: 'Conseguir los primeros testimonios de pago para validar el valor de la plataforma.',
    progress: 33,
    status: 'en_progreso',
    dueDate: '2024-01-31',
    tags: ['Growth', 'Q1'],
    milestones: [
      { id: 'm4', title: 'Lead magnet', completed: true },
      { id: 'm5', title: 'Llamadas de ventas', completed: false }
    ],
    linkedTasks: [],
    smartFields: {
      specific: '3 clientes',
      measurable: 'Número de contratos',
      achievable: 'Si',
      relevant: 'Validación',
      timeBound: '31 Ene'
    },
    rpmFields: {
      result: '3 clientes beta',
      purpose: 'Validar PMF',
      massiveActionPlan: ['List leads', 'Cold outreach', 'Demos']
    }
  },
  {
    id: 'goal-003',
    title: 'Establecer rutina de mañana',
    description: 'Mejorar el enfoque matutino mediante meditación y planificación profunda.',
    progress: 90,
    status: 'en_progreso',
    dueDate: '2024-02-01',
    tags: ['Personal', 'Salud'],
    milestones: [],
    linkedTasks: [],
    smartFields: {
      specific: 'Rutina matutina',
      measurable: 'Días cumplidos',
      achievable: 'Si',
      relevant: 'Salud mental',
      timeBound: 'Diario'
    },
    rpmFields: {
      result: 'Enfoque total',
      purpose: 'Paz mental',
      massiveActionPlan: ['Meditación', 'Planning']
    }
  },
  {
    id: 'goal-004',
    title: 'Rediseño de landing page',
    description: 'Nuevos visuales y mejores copys para aumentar la conversión.',
    progress: 0,
    status: 'por_iniciar',
    dueDate: '2024-02-28',
    tags: ['Growth', 'Producto'],
    milestones: [],
    linkedTasks: [],
    smartFields: {
      specific: 'Rediseño web',
      measurable: 'Tasa de conversión',
      achievable: 'Si',
      relevant: 'Crecimiento',
      timeBound: '28 Feb'
    },
    rpmFields: {
      result: 'Web nueva',
      purpose: 'Más leads',
      massiveActionPlan: ['Visuals', 'Copywriting']
    }
  }
]

export function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals)

  const handleStatusChange = (id: string, newStatus: GoalStatus) => {
    setGoals(prev => prev.map(g =>
      g.id === id ? { ...g, status: newStatus } : g
    ))
  }

  const handleDelete = (id: string) => {
    if (window.confirm('¿Eliminar esta meta?')) {
      setGoals(prev => prev.filter(g => g.id !== id))
    }
  }

  const handleCreate = () => {
    console.log('Create goal modal would open here')
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
