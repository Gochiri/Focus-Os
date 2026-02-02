import { supabase, isOffline } from '../lib/supabase'
import type { Task } from '../types'

export const taskService = {
  async getTasks(projectId?: string, goalId?: string) {
    if (isOffline) return []

    let query = supabase
      .from('tasks')
      .select('*, task_tags(tag_id)')
      .order('created_at', { ascending: false })
    
    if (projectId) query = query.eq('project_id', projectId)
    if (goalId) query = query.eq('goal_id', goalId)

    const { data, error } = await query
    
    if (error) throw error
    
    return data.map((t: any) => ({
      id: t.id,
      title: t.title,
      notes: t.notes,
      priority: t.priority,
      status: t.status,
      deadline: t.deadline,
      estimatedMinutes: t.estimated_minutes,
      progress: t.progress,
      projectId: t.project_id,
      goalId: t.goal_id,
      tagIds: t.task_tags?.map((tt: any) => tt.tag_id) || [],
      blockedBy: t.blocked_by || [],
      createdAt: t.created_at,
      updatedAt: t.updated_at
    })) as Task[]
  },

  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'tagIds'> & { tagIds?: string[] }) {
    const { tagIds, ...taskData } = task
    
    if (isOffline) {
      console.log('[Offline] Creating task:', task)
      return {
        ...taskData,
        tagIds: tagIds || [],
        id: `offline-task-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as Task
    }

    const dbTask = {
      title: taskData.title,
      notes: taskData.notes,
      priority: taskData.priority,
      status: taskData.status,
      deadline: taskData.deadline,
      estimated_minutes: taskData.estimatedMinutes,
      progress: taskData.progress,
      project_id: taskData.projectId,
      goal_id: taskData.goalId,
      blocked_by: taskData.blockedBy
    }
    
    const { data: newTask, error: taskError } = await supabase
      .from('tasks')
      .insert([dbTask])
      .select()
      .single()
    
    if (taskError) throw taskError

    if (tagIds && tagIds.length > 0) {
      const taskTags = tagIds.map(tagId => ({
        task_id: newTask.id,
        tag_id: tagId
      }))
      const { error: tagError } = await supabase
        .from('task_tags')
        .insert(taskTags)
      
      if (tagError) throw tagError
    }

    const t = newTask as any
    return {
      id: t.id,
      title: t.title,
      notes: t.notes,
      priority: t.priority,
      status: t.status,
      deadline: t.deadline,
      estimatedMinutes: t.estimated_minutes,
      progress: t.progress,
      projectId: t.project_id,
      goalId: t.goal_id,
      tagIds: tagIds || [],
      blockedBy: t.blocked_by || [],
      createdAt: t.created_at,
      updatedAt: t.updated_at
    } as Task
  },

  async updateTask(id: string, updates: Partial<Task> & { tagIds?: string[] }) {
    const { tagIds, ...taskData } = updates
    
    if (isOffline) {
      console.log('[Offline] Updating task:', id, updates)
      return {
        id,
        ...taskData,
        tagIds: tagIds,
        updatedAt: new Date().toISOString()
      } as Task
    }

    const dbUpdates: any = {}
    if (taskData.title !== undefined) dbUpdates.title = taskData.title
    if (taskData.notes !== undefined) dbUpdates.notes = taskData.notes
    if (taskData.priority !== undefined) dbUpdates.priority = taskData.priority
    if (taskData.status !== undefined) dbUpdates.status = taskData.status
    if (taskData.deadline !== undefined) dbUpdates.deadline = taskData.deadline
    if (taskData.estimatedMinutes !== undefined) dbUpdates.estimated_minutes = taskData.estimatedMinutes
    if (taskData.progress !== undefined) dbUpdates.progress = taskData.progress
    if (taskData.projectId !== undefined) dbUpdates.project_id = taskData.projectId
    if (taskData.goalId !== undefined) dbUpdates.goal_id = taskData.goalId
    if (taskData.blockedBy !== undefined) dbUpdates.blocked_by = taskData.blockedBy

    const { data, error } = await supabase
      .from('tasks')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error

    if (tagIds) {
      // Refresh tags
      await supabase.from('task_tags').delete().eq('task_id', id)
      if (tagIds.length > 0) {
        const taskTags = tagIds.map(tagId => ({
          task_id: id,
          tag_id: tagId
        }))
        await supabase.from('task_tags').insert(taskTags)
      }
    }

    const t = data as any
    // Note: We might want to return the updated tags if we just updated them, 
    // but data doesn't include the join unless we select it again.
    // For now we assume optimistic updates or that the caller knows what they sent.
    return {
      id: t.id,
      title: t.title,
      notes: t.notes,
      priority: t.priority,
      status: t.status,
      deadline: t.deadline,
      estimatedMinutes: t.estimated_minutes,
      progress: t.progress,
      projectId: t.project_id,
      goalId: t.goal_id,
      tagIds: tagIds || [], // This might be stale if we didn't send tagIds but they exist
      blockedBy: t.blocked_by || [],
      createdAt: t.created_at,
      updatedAt: t.updated_at
    } as Task
  },

  async deleteTask(id: string) {
    if (isOffline) {
      console.log('[Offline] Deleting task:', id)
      return
    }

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  subscribeToTasks(onUpdate: () => void) {
    if (isOffline) return () => {}

    const channel = supabase
      .channel('public:tasks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
        onUpdate()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }
}
