import { Target, ChevronRight, Plus, CheckCircle2, Circle } from 'lucide-react'
import type { Goal } from '../types'

const goals: Goal[] = [
  {
    id: 'goal-001',
    title: 'Lanzar la app móvil en App Store y Play Store',
    description: 'Publicar la primera versión de FocusAI en ambas tiendas de aplicaciones.',
    status: 'en_progreso',
    progress: 65,
    dueDate: '2024-03-15',
    tags: ['Producto', 'Q1'],
    smart: {
      specific: 'Publicar FocusAI v1.0 con gestión de tareas, metas y focus mode en iOS y Android',
      measurable: 'App aprobada en ambas tiendas con rating inicial de 4+ estrellas',
      achievable: 'Equipo de 3 desarrolladores, diseño completado, backend listo',
      relevant: 'Es el canal principal para llegar a usuarios móviles',
      timeBound: '15 de marzo 2024'
    },
    rpm: {
      result: 'App publicada y funcionando con primeros 100 usuarios activos',
      purpose: 'Demostrar que podemos ejecutar y entregar valor real a usuarios.',
      massiveActionPlan: '1) Completar testing, 2) Preparar assets, 3) Submit a review'
    },
    milestones: [
      { id: 'ms-001', title: 'Diseño UI/UX completo', completed: true },
      { id: 'ms-002', title: 'Backend y API listos', completed: true },
      { id: 'ms-003', title: 'Testing de integración', completed: false },
      { id: 'ms-004', title: 'Submit a App Store', completed: false }
    ],
    linkedTasks: [
      { id: 'task-001', title: 'Finalizar diseño de onboarding', completed: false },
      { id: 'task-003', title: 'Implementar autenticación OAuth', completed: false }
    ]
  },
  {
    id: 'goal-002',
    title: 'Cerrar ronda seed de $500K',
    description: 'Conseguir financiamiento inicial para escalar el equipo.',
    status: 'en_progreso',
    progress: 40,
    dueDate: '2024-04-30',
    tags: ['Fundraising', 'Q1'],
    smart: {
      specific: 'Cerrar ronda seed de $500K con 2-3 inversionistas',
      measurable: '$500K comprometidos con term sheet firmado',
      achievable: 'Tenemos tracción inicial y equipo sólido',
      relevant: 'Capital necesario para contratar más devs',
      timeBound: '30 de abril 2024'
    },
    rpm: {
      result: 'Ronda cerrada y runway de 18 meses asegurado',
      purpose: 'Libertad financiera para enfocarnos en el producto.',
      massiveActionPlan: '1) Preparar deck, 2) Lista de inversionistas, 3) 20 reuniones'
    },
    milestones: [
      { id: 'ms-006', title: 'Deck de inversión listo', completed: true },
      { id: 'ms-007', title: '20 reuniones con inversionistas', completed: false },
      { id: 'ms-008', title: 'Term sheet recibido', completed: false }
    ],
    linkedTasks: [
      { id: 'task-002', title: 'Preparar presentación para inversores', completed: false }
    ]
  },
  {
    id: 'goal-003',
    title: 'Establecer rutina de ejercicio 4x por semana',
    description: 'Mejorar salud física y energía mediante ejercicio constante.',
    status: 'en_progreso',
    progress: 75,
    dueDate: '2024-06-30',
    tags: ['Salud', 'Personal'],
    smart: {
      specific: 'Hacer ejercicio 4 veces por semana: 2 días gym, 1 cardio, 1 yoga',
      measurable: '16 sesiones de ejercicio por mes',
      achievable: 'Gym a 10 min de casa',
      relevant: 'Más energía = mejor rendimiento',
      timeBound: 'Fin de Q2 2024'
    },
    rpm: {
      result: 'Ejercicio como parte natural de mi rutina',
      purpose: 'Sentirme fuerte y con energía.',
      massiveActionPlan: '1) Preparar ropa, 2) Alarma 6am, 3) No negociar'
    },
    milestones: [
      { id: 'ms-010', title: 'Primera semana completa', completed: true },
      { id: 'ms-011', title: 'Primer mes consistente', completed: true },
      { id: 'ms-012', title: '3 meses sin fallar más de 2 días', completed: false }
    ],
    linkedTasks: []
  }
]

function getStatusBadge(status: Goal['status']) {
  const styles = {
    por_iniciar: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    en_progreso: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
    pausada: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    completada: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
  }
  const labels = {
    por_iniciar: 'Por iniciar',
    en_progreso: 'En progreso',
    pausada: 'Pausada',
    completada: 'Completada'
  }

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

export function GoalsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Metas y Planificación
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Metodología SMART + Framework RPM
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          Nueva meta
        </button>
      </div>

      <div className="space-y-4">
        {goals.map(goal => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  )
}

function GoalCard({ goal }: { goal: Goal }) {
  const completedMilestones = goal.milestones.filter(m => m.completed).length

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
            <Target className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                {goal.title}
              </h3>
              {getStatusBadge(goal.status)}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {goal.description}
            </p>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-slate-500 dark:text-slate-400">Progreso</span>
          <span className="font-medium text-slate-700 dark:text-slate-300">{goal.progress}%</span>
        </div>
        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-500 rounded-full transition-all"
            style={{ width: `${goal.progress}%` }}
          />
        </div>
      </div>

      {/* Milestones */}
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Hitos ({completedMilestones}/{goal.milestones.length})
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Fecha límite: {goal.dueDate}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {goal.milestones.slice(0, 4).map(milestone => (
            <span
              key={milestone.id}
              className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                milestone.completed
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}
            >
              {milestone.completed ? (
                <CheckCircle2 className="w-3 h-3" />
              ) : (
                <Circle className="w-3 h-3" />
              )}
              {milestone.title}
            </span>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="mt-3 flex gap-2">
        {goal.tags.map(tag => (
          <span
            key={tag}
            className="text-xs text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
