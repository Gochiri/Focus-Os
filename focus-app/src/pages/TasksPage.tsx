import { useState, useEffect } from 'react'
import { TaskPriorityView } from '../components/tasks/TaskPriorityView'
import { taskService } from '../services/taskService'
import { projectService } from '../services/projectService'
import { tagService } from '../services/tagService'
import type { Task, Project, Tag, TaskPriority } from '../types'

const MOCK_TASKS: Task[] = [
  {
    id: 'task-001',
    title: 'Finalizar diseño de onboarding',
    notes: 'Incluir los 3 pasos principales.',
    priority: 'high',
    status: 'in_progress',
    deadline: '2024-01-28',
    estimatedMinutes: 180,
    progress: 65,
    projectId: null,
    goalId: null,
    tagIds: [],
    blockedBy: []
  }
]

const MOCK_PROJECTS: Project[] = [
  { id: 'proj-001', name: 'Lanzamiento App Móvil', color: 'violet' }
]

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [loadedTasks, loadedProjects, loadedTags] = await Promise.all([
        taskService.getTasks(),
        projectService.getProjects(),
        tagService.getTags()
      ])
      setTasks(loadedTasks.length > 0 ? loadedTasks : MOCK_TASKS)
      setProjects(loadedProjects.length > 0 ? loadedProjects : MOCK_PROJECTS)
      setTags(loadedTags)
    } catch (err) {
      console.error('Failed to load data, using mocks:', err)
      setTasks(MOCK_TASKS)
      setProjects(MOCK_PROJECTS)
    } finally {
      setLoading(false)
    }
  }

  const handleCompleteTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    const newStatus = task.status === 'completed' ? 'pending' : 'completed'
    const newProgress = newStatus === 'completed' ? 100 : 0

    // Optimistic update
    setTasks(prev => prev.map(t =>
      t.id === taskId
        ? { ...t, status: newStatus, progress: newProgress }
        : t
    ))

    try {
      await taskService.updateTask(taskId, { status: newStatus, progress: newProgress })
    } catch (err) {
      console.error('Failed to update task:', err)
      loadData() // Revert
    }
  }

  const handleChangePriority = async (taskId: string, priority: TaskPriority) => {
    setTasks(prev => prev.map(t =>
      t.id === taskId ? { ...t, priority } : t
    ))

    try {
      await taskService.updateTask(taskId, { priority })
    } catch (err) {
      console.error('Failed to update priority:', err)
      loadData()
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      setTasks(prev => prev.filter(t => t.id !== taskId))
      try {
        await taskService.deleteTask(taskId)
      } catch (err) {
        console.error('Failed to delete task:', err)
        loadData()
      }
    }
  }

  const handleCreateTask = async () => {
    const title = prompt('Título de la nueva tarea:')
    if (!title) return

    try {
      const newTask = await taskService.createTask({
        title,
        notes: '',
        priority: 'medium',
        status: 'pending',
        deadline: new Date().toISOString(),
        estimatedMinutes: 30,
        progress: 0,
        projectId: null,
        goalId: null,
        tagIds: [],
        blockedBy: []
      })
      setTasks(prev => [newTask, ...prev])
    } catch (err) {
      console.error('Failed to create task:', err)
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Cargando tareas...</div>
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
        onCreateTask={handleCreateTask}
        onEditTask={(id) => console.log('Edit task', id)}
      />
    </div>
  )
}
