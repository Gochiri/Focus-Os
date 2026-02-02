import { supabase, isOffline } from '../lib/supabase'
import type { Milestone } from '../types'

export const milestoneService = {
  async getMilestones(goalId: string) {
    if (isOffline) return []

    const { data, error } = await supabase
      .from('milestones')
      .select('*')
      .eq('goal_id', goalId)
      .order('created_at', { ascending: true })
    
    if (error) throw error
    
    return data.map((m: any) => ({
      id: m.id,
      title: m.title,
      completed: m.completed,
      goalId: m.goal_id
    })) as Milestone[]
  },

  async createMilestone(milestone: Omit<Milestone, 'id'>) {
    if (isOffline) {
      return {
        ...milestone,
        id: `offline-milestone-${Date.now()}`
      } as Milestone
    }

    const { data, error } = await supabase
      .from('milestones')
      .insert([{
        goal_id: milestone.goalId,
        title: milestone.title,
        completed: milestone.completed
      }])
      .select()
      .single()
    
    if (error) throw error
    
    const m = data as any
    return {
      id: m.id,
      title: m.title,
      completed: m.completed,
      goalId: m.goal_id
    } as Milestone
  },

  async updateMilestone(id: string, updates: Partial<Milestone>) {
    if (isOffline) {
      return {
        id,
        ...updates
      } as Milestone
    }

    const dbUpdates: any = {}
    if (updates.title !== undefined) dbUpdates.title = updates.title
    if (updates.completed !== undefined) dbUpdates.completed = updates.completed

    const { data, error } = await supabase
      .from('milestones')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    
    const m = data as any
    return {
      id: m.id,
      title: m.title,
      completed: m.completed,
      goalId: m.goal_id
    } as Milestone
  },

  async deleteMilestone(id: string) {
    if (isOffline) return

    const { error } = await supabase
      .from('milestones')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
