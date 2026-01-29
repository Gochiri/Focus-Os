import { useState } from 'react'
import { TaskPriorityView } from '../components/tasks/TaskPriorityView'
import type { Task, Project, Tag, TaskPriority } from '../types'

const initialTasks: Task[] = [
  {
    id: 'task-001',
    title: 'Finalizar diseño de onboarding',
    notes: 'Incluir los 3 pasos principales: bienvenida, configuración de metas, y primera tarea.',
    priority: 'high',
    status: 'in_progress',
    deadline: '2024-01-28',
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
    deadline: '2024-01-30',
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
    deadline: '2024-02-02',
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
    deadline: '2024-01-29',
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
    deadline: '2024-02-05',
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
    deadline: '2024-01-25',
    estimatedMinutes: 60,
    progress: 100,
    projectId: null,
    goalId: null,
    tagIds: ['tag-003'],
    blockedBy: []
  }
]

const initialProjects: Project[] = [
  { id: 'proj-001', name: 'Lanzamiento App Móvil', color: 'violet' },
  { id: 'proj-002', name: 'Marketing Q1', color: 'amber' },
  { id: 'proj-003', name: 'Operaciones', color: 'emerald' }
]

const initialTags: Tag[] = [
  { id: 'tag-001', name: 'Urgente', color: 'red' },
  { id: 'tag-002', name: 'Cliente', color: 'blue' },
  { id: 'tag-003', name: 'Reunión', color: 'purple' },
  { id: 'tag-004', name: 'Documentación', color: 'slate' },
  { id: 'tag-005', name: 'Desarrollo', color: 'green' },
  { id: 'tag-006', name: 'Revisión', color: 'orange' }
]

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [projects] = useState<Project[]>(initialProjects)
  const [tags] = useState<Tag[]>(initialTags)

  const handleCompleteTask = (taskId: string) => {
    setTasks(prev => prev.map(t =>
      t.id === taskId
        ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed', progress: t.status === 'completed' ? 0 : 100 }
        : t
    ))
  }

  const handleChangePriority = (taskId: string, priority: TaskPriority) => {
    setTasks(prev => prev.map(t =>
      t.id === taskId ? { ...t, priority } : t
    ))
  }

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      setTasks(prev => prev.filter(t => t.id !== taskId))
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <TaskPriorityView
        tasks={tasks}
        projects={projects}
        tags={tags}
        workBlocks={[]}
        onCompleteTask={handleCompleteTask}
        onChangePriority={handleChangePriority}
        onDeleteTask={handleDeleteTask}
        onCreateTask={() => console.log('Create task')}
        onEditTask={(id) => console.log('Edit task', id)}
      />
    </div>
  )
}
