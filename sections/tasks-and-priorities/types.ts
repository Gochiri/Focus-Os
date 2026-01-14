// =============================================================================
// Data Types
// =============================================================================

export type TaskPriority = 'high' | 'medium' | 'low'

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'blocked'

export interface Project {
  id: string
  name: string
  color: string
}

export interface Tag {
  id: string
  name: string
  color: string
}

export interface Task {
  id: string
  title: string
  notes: string
  priority: TaskPriority
  status: TaskStatus
  deadline: string
  estimatedMinutes: number
  progress: number
  projectId: string | null
  goalId: string | null
  tagIds: string[]
  blockedBy: string[]
}

export interface WorkBlock {
  id: string
  taskId: string
  date: string
  startTime: string
  endTime: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface TasksAndPrioritiesProps {
  /** Lista de tareas a mostrar */
  tasks: Task[]
  /** Lista de proyectos disponibles */
  projects: Project[]
  /** Lista de etiquetas disponibles */
  tags: Tag[]
  /** Bloques de trabajo programados en el calendario */
  workBlocks: WorkBlock[]

  // Task actions
  /** Llamado cuando el usuario quiere crear una nueva tarea */
  onCreateTask?: () => void
  /** Llamado cuando el usuario quiere editar una tarea */
  onEditTask?: (taskId: string) => void
  /** Llamado cuando el usuario quiere eliminar una tarea */
  onDeleteTask?: (taskId: string) => void
  /** Llamado cuando el usuario marca una tarea como completada */
  onCompleteTask?: (taskId: string) => void
  /** Llamado cuando el usuario quiere posponer una tarea */
  onPostponeTask?: (taskId: string, newDeadline: string) => void
  /** Llamado cuando el usuario quiere duplicar una tarea */
  onDuplicateTask?: (taskId: string) => void
  /** Llamado cuando el usuario cambia la prioridad de una tarea */
  onChangePriority?: (taskId: string, priority: TaskPriority) => void

  // Work block actions
  /** Llamado cuando el usuario programa un bloque de trabajo */
  onScheduleWorkBlock?: (taskId: string, date: string, startTime: string, endTime: string) => void
  /** Llamado cuando el usuario elimina un bloque de trabajo */
  onDeleteWorkBlock?: (workBlockId: string) => void

  // View actions
  /** Llamado cuando el usuario cambia de vista (prioridad/calendario) */
  onChangeView?: (view: 'priority' | 'calendar') => void
  /** Llamado cuando el usuario filtra por proyecto */
  onFilterByProject?: (projectId: string | null) => void
  /** Llamado cuando el usuario filtra por etiquetas */
  onFilterByTags?: (tagIds: string[]) => void
}
