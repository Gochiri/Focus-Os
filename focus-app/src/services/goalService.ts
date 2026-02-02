import { supabase, isOffline } from '../lib/supabase'
import type { Goal } from '../types'

export const goalService = {
  async getGoals() {
    if (isOffline) return [] // Return empty so page uses its own mock fallback or we could return mock here

    const { data, error } = await supabase
      .from('goals')
      .select('*, milestones(*), tasks(id, title, status), projects(*)')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    // Map response to match Goal type
    return data.map((g: any) => ({
      id: g.id,
      title: g.title,
      description: g.description,
      status: g.status,
      progress: g.progress,
      dueDate: g.due_date,
      tags: g.tags || [],
      smart: g.smart,
      rpm: g.rpm,
      milestones: g.milestones || [],
      projects: g.projects?.map((p: any) => ({
        id: p.id,
        name: p.name,
        color: p.color,
        goalId: p.goal_id,
        progress: p.progress
      })) || [],
      createdAt: g.created_at,
      updatedAt: g.updated_at,
      linkedTasks: g.tasks?.map((t: any) => ({
        id: t.id,
        title: t.title,
        completed: t.status === 'completed'
      })) || []
    })) as Goal[]
  },

  async getGoalById(id: string) {
    const { data, error } = await supabase
      .from('goals')
      .select('*, milestones(*), tasks(id, title, status), projects(*)')
      .eq('id', id)
      .single()
    
    if (error) throw error
    
    const g = data as any
    return {
      id: g.id,
      title: g.title,
      description: g.description,
      status: g.status,
      progress: g.progress,
      dueDate: g.due_date,
      tags: g.tags || [],
      smart: g.smart,
      rpm: g.rpm,
      milestones: g.milestones || [],
      projects: g.projects?.map((p: any) => ({
        id: p.id,
        name: p.name,
        color: p.color,
        goalId: p.goal_id,
        progress: p.progress
      })) || [],
      createdAt: g.created_at,
      updatedAt: g.updated_at,
      linkedTasks: g.tasks?.map((t: any) => ({
        id: t.id,
        title: t.title,
        completed: t.status === 'completed'
      })) || []
    } as Goal
  },

  async createGoal(goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'milestones' | 'linkedTasks'>) {
    if (isOffline) {
      console.log('[Offline] Creating goal:', goal)
      return {
        ...goal,
        id: `offline-goal-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        milestones: [],
        linkedTasks: []
      } as Goal
    }

    // Map camelCase to snake_case for DB
    const dbGoal = {
      title: goal.title,
      description: goal.description,
      status: goal.status,
      progress: goal.progress,
      due_date: goal.dueDate,
      tags: goal.tags,
      smart: goal.smart,
      rpm: goal.rpm
    }

    const { data, error } = await supabase
      .from('goals')
      .insert([dbGoal])
      .select()
      .single()
    
    if (error) throw error
    
    const g = data as any
    // Return with empty arrays for consistency
    return {
      id: g.id,
      title: g.title,
      description: g.description,
      status: g.status,
      progress: g.progress,
      dueDate: g.due_date,
      tags: g.tags || [],
      smart: g.smart,
      rpm: g.rpm,
      milestones: [],
      linkedTasks: [],
      createdAt: g.created_at,
      updatedAt: g.updated_at
    } as Goal
  },

  async updateGoal(id: string, updates: Partial<Goal>) {
    // Exclude relational fields that can't be updated directly on the goal table
    const { milestones, linkedTasks, ...goalFields } = updates
    
    if (isOffline) {
      console.log('[Offline] Updating goal:', id, updates)
      return {
        id,
        ...updates,
        updatedAt: new Date().toISOString()
      } as Goal
    }

    // Map updates to snake_case
    const dbUpdates: any = {}
    if (goalFields.title !== undefined) dbUpdates.title = goalFields.title
    if (goalFields.description !== undefined) dbUpdates.description = goalFields.description
    if (goalFields.status !== undefined) dbUpdates.status = goalFields.status
    if (goalFields.progress !== undefined) dbUpdates.progress = goalFields.progress
    if (goalFields.dueDate !== undefined) dbUpdates.due_date = goalFields.dueDate
    if (goalFields.tags !== undefined) dbUpdates.tags = goalFields.tags
    if (goalFields.smart !== undefined) dbUpdates.smart = goalFields.smart
    if (goalFields.rpm !== undefined) dbUpdates.rpm = goalFields.rpm

    const { data, error } = await supabase
      .from('goals')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    
    // We would typically refetch or merge the existing relations, 
    // but for now let's just return what we have (or fetch fresh if critical)
    // We return the partial updated object merged with what we sent, strictly speaking we should refetch or map back.
    // For simplicity, I'll just map the DB response back.
    const g = data as any
    return {
      ...updates, // optimistically include what we sent (like relations if we didn't touch them)
      id: g.id,
      title: g.title,
      description: g.description,
      status: g.status,
      progress: g.progress,
      dueDate: g.due_date,
      tags: g.tags,
      smart: g.smart,
      rpm: g.rpm,
      createdAt: g.created_at,
      updatedAt: g.updated_at
    } as Goal
  },

  async deleteGoal(id: string) {
    if (isOffline) {
      console.log('[Offline] Deleting goal:', id)
      return
    }

    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  subscribeToGoals(onUpdate: () => void) {
    if (isOffline) return () => {}

    const channel = supabase
      .channel('public:goals')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'goals' }, () => {
        onUpdate()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }
}
