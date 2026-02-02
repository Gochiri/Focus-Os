import { supabase, isOffline } from '../lib/supabase'
import type { Project } from '../types'

export const projectService = {
  async getProjects(goalId?: string) {
    if (isOffline) return []

    let query = supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (goalId) {
      query = query.eq('goal_id', goalId)
    }

    const { data, error } = await query
    
    if (error) throw error
    return data.map((p: any) => ({
      id: p.id,
      name: p.name,
      color: p.color,
      goalId: p.goal_id,
      progress: p.progress,
      createdAt: p.created_at,
      updatedAt: p.updated_at
    })) as Project[]
  },

  async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'progress'>) {
    if (isOffline) {
      return {
        ...project,
        id: `offline-project-${Date.now()}`,
        progress: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as Project
    }

    const dbProject = {
      name: project.name,
      color: project.color,
      goal_id: project.goalId
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([dbProject])
      .select()
      .single()
    
    if (error) throw error
    
    const p = data as any
    return {
      id: p.id,
      name: p.name,
      color: p.color,
      goalId: p.goal_id,
      progress: p.progress,
      createdAt: p.created_at,
      updatedAt: p.updated_at
    } as Project
  },

  async updateProject(id: string, updates: Partial<Project>) {
    if (isOffline) {
      return {
        id,
        ...updates,
        updatedAt: new Date().toISOString()
      } as Project
    }

    const dbUpdates: any = {}
    if (updates.name !== undefined) dbUpdates.name = updates.name
    if (updates.color !== undefined) dbUpdates.color = updates.color
    if (updates.goalId !== undefined) dbUpdates.goal_id = updates.goalId
    // progress is usually handled by triggers, but allow manual update if needed
    if (updates.progress !== undefined) dbUpdates.progress = updates.progress

    const { data, error } = await supabase
      .from('projects')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    
    const p = data as any
    return {
      id: p.id,
      name: p.name,
      color: p.color,
      goalId: p.goal_id,
      progress: p.progress,
      createdAt: p.created_at,
      updatedAt: p.updated_at
    } as Project
  },

  async deleteProject(id: string) {
    if (isOffline) return

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  subscribeToProjects(onUpdate: () => void) {
    if (isOffline) return () => {}

    const channel = supabase
      .channel('public:projects')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        onUpdate()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }
}
