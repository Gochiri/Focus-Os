import { useState, useEffect } from 'react'
import { TaskPriorityView } from '../components/tasks/TaskPriorityView'
import { TaskForm } from '../components/tasks/TaskForm'
import { taskService } from '../services/taskService'
import { projectService } from '../services/projectService'
import { goalService } from '../services/goalService'
import { tagService } from '../services/tagService'
import type { Task, Project, Goal, Tag, TaskPriority } from '../types'

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>()

  useEffect(() => {
    loadData()

    // Subscribe to real-time updates
    const unsubscribe = taskService.subscribeToTasks(() => {
      loadData()
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [loadedTasks, loadedProjects, loadedGoals, loadedTags] = await Promise.all([
        taskService.getTasks(),
        projectService.getProjects(),
        goalService.getGoals(),
        tagService.getTags()
      ])
      setTasks(loadedTasks)
      setProjects(loadedProjects)
      setGoals(loadedGoals)
      setTags(loadedTags)
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCompleteTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    const newStatus = task.status === 'completed' ? 'pending' : 'completed'
    const newProgress = newStatus === 'completed' ? 100 : 0

    try {
      setTasks(prev => prev.map(t =>
        t.id === taskId
          ? { ...t, status: newStatus, progress: newProgress }
          : t
      ))
      await taskService.updateTask(taskId, { status: newStatus, progress: newProgress })
    } catch (err) {
      console.error('Failed to update task:', err)
      loadData()
    }
  }

  const handleChangePriority = async (taskId: string, priority: TaskPriority) => {
    try {
      setTasks(prev => prev.map(t =>
        t.id === taskId ? { ...t, priority } : t
      ))
      await taskService.updateTask(taskId, { priority })
    } catch (err) {
      console.error('Failed to update priority:', err)
      loadData()
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      try {
        setTasks(prev => prev.filter(t => t.id !== taskId))
        await taskService.deleteTask(taskId)
      } catch (err) {
        console.error('Failed to delete task:', err)
        loadData()
      }
    }
  }

  const handleSave = async (taskData: any) => {
    try {
      if (editingTask) {
        await taskService.updateTask(editingTask.id, taskData)
      } else {
        await taskService.createTask(taskData)
      }
      loadData()
    } catch (err) {
      console.error('Failed to save task:', err)
      alert('Error al guardar la tarea')
    }
  }

  const handleEditTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      setEditingTask(task)
      setIsFormOpen(true)
    }
  }

  if (loading && tasks.length === 0) {
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
        onCreateTask={() => {
          setEditingTask(undefined)
          setIsFormOpen(true)
        }}
        onEditTask={handleEditTask}
      />

      {isFormOpen && (
        <TaskForm
          task={editingTask}
          projects={projects}
          goals={goals}
          tags={tags}
          onClose={() => {
            setIsFormOpen(false)
            setEditingTask(undefined)
          }}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
