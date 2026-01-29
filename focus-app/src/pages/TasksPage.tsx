import { CheckCircle2, Clock, AlertCircle, Circle, Plus } from 'lucide-react'
import type { Task, Project, Tag } from '../types'

const tasks: Task[] = [
  {
    id: 'task-001',
    title: 'Finalizar diseño de onboarding',
    notes: 'Incluir los 3 pasos principales: bienvenida, configuración de metas, y primera tarea.',
    priority: 'high',
    status: 'in_progress',
    deadline: '2024-01-18',
    estimatedMinutes: 180,
    progress: 65,
    projectId: 'proj-001',
    goalId: 'goal-001',
    tagIds: ['tag-005', 'tag-002'],
    blockedBy: []
  },
  {
    id: 'task-002',
    title: 'Preparar presentación para inversores',
    notes: 'Deck de 12 slides máximo. Incluir métricas de tracción.',
    priority: 'high',
    status: 'pending',
    deadline: '2024-01-20',
    estimatedMinutes: 240,
    progress: 0,
    projectId: null,
    goalId: 'goal-002',
    tagIds: ['tag-001', 'tag-003'],
    blockedBy: []
  },
  {
    id: 'task-003',
    title: 'Implementar autenticación OAuth',
    notes: 'Soporte para Google y Apple sign-in.',
    priority: 'high',
    status: 'blocked',
    deadline: '2024-01-22',
    estimatedMinutes: 300,
    progress: 0,
    projectId: 'proj-001',
    goalId: 'goal-001',
    tagIds: ['tag-005'],
    blockedBy: ['task-001']
  },
  {
    id: 'task-004',
    title: 'Revisar contrato con proveedor',
    notes: 'Verificar cláusulas de SLA y penalizaciones.',
    priority: 'medium',
    status: 'pending',
    deadline: '2024-01-19',
    estimatedMinutes: 60,
    progress: 0,
    projectId: 'proj-003',
    goalId: null,
    tagIds: ['tag-004', 'tag-006'],
    blockedBy: []
  },
  {
    id: 'task-005',
    title: 'Crear contenido para redes sociales',
    notes: '10 posts para Instagram, 5 para LinkedIn.',
    priority: 'medium',
    status: 'pending',
    deadline: '2024-01-25',
    estimatedMinutes: 120,
    progress: 0,
    projectId: 'proj-002',
    goalId: 'goal-003',
    tagIds: ['tag-002'],
    blockedBy: []
  },
  {
    id: 'task-009',
    title: 'Reunión semanal con equipo',
    notes: 'Agenda: revisión de OKRs, blockers actuales.',
    priority: 'medium',
    status: 'completed',
    deadline: '2024-01-15',
    estimatedMinutes: 60,
    progress: 100,
    projectId: null,
    goalId: null,
    tagIds: ['tag-003'],
    blockedBy: []
  }
]

const projects: Project[] = [
  { id: 'proj-001', name: 'Lanzamiento App Móvil', color: 'violet' },
  { id: 'proj-002', name: 'Marketing Q1', color: 'amber' },
  { id: 'proj-003', name: 'Operaciones', color: 'emerald' }
]

const tags: Tag[] = [
  { id: 'tag-001', name: 'Urgente', color: 'red' },
  { id: 'tag-002', name: 'Cliente', color: 'blue' },
  { id: 'tag-003', name: 'Reunión', color: 'purple' },
  { id: 'tag-004', name: 'Documentación', color: 'slate' },
  { id: 'tag-005', name: 'Desarrollo', color: 'green' },
  { id: 'tag-006', name: 'Revisión', color: 'orange' }
]

function getStatusIcon(status: Task['status']) {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="w-5 h-5 text-emerald-500" />
    case 'in_progress':
      return <Clock className="w-5 h-5 text-violet-500" />
    case 'blocked':
      return <AlertCircle className="w-5 h-5 text-red-500" />
    default:
      return <Circle className="w-5 h-5 text-slate-400" />
  }
}

function getPriorityBadge(priority: Task['priority']) {
  const styles = {
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
  }
  const labels = { high: 'Alto', medium: 'Medio', low: 'Bajo' }

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[priority]}`}>
      {labels[priority]}
    </span>
  )
}

function getProject(projectId: string | null) {
  return projects.find(p => p.id === projectId)
}

function getTag(tagId: string) {
  return tags.find(t => t.id === tagId)
}

export function TasksPage() {
  const highPriorityTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'completed')
  const otherTasks = tasks.filter(t => t.priority !== 'high' || t.status === 'completed')

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Tareas y Prioridades
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Enfócate en lo que más impacta (Principio Pareto)
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          Nueva tarea
        </button>
      </div>

      {/* High Impact Section */}
      {highPriorityTasks.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wide mb-3">
            Alto Impacto (Top 20%)
          </h2>
          <div className="space-y-3">
            {highPriorityTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

      {/* Other Tasks */}
      <div>
        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
          Otras tareas
        </h2>
        <div className="space-y-3">
          {otherTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  )
}

function TaskCard({ task }: { task: Task }) {
  const project = getProject(task.projectId)

  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow ${task.status === 'completed' ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-3">
        <button className="mt-0.5 flex-shrink-0">
          {getStatusIcon(task.status)}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-medium text-slate-900 dark:text-slate-100 ${task.status === 'completed' ? 'line-through' : ''}`}>
              {task.title}
            </h3>
            {getPriorityBadge(task.priority)}
          </div>

          {task.notes && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {task.notes}
            </p>
          )}

          <div className="flex items-center gap-3 mt-3 flex-wrap">
            {project && (
              <span className="text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                {project.name}
              </span>
            )}

            {task.tagIds.map(tagId => {
              const tag = getTag(tagId)
              if (!tag) return null
              return (
                <span key={tagId} className="text-xs text-slate-500 dark:text-slate-400">
                  #{tag.name}
                </span>
              )
            })}

            <span className="text-xs text-slate-400 dark:text-slate-500 ml-auto">
              {task.deadline}
            </span>
          </div>

          {task.progress > 0 && task.progress < 100 && (
            <div className="mt-3">
              <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-500 rounded-full transition-all"
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
