import { supabase, isOffline } from '../lib/supabase'
import type { FocusSession } from '../types'

export const focusService = {
  async getRecentSessions(limit = 20) {
    if (isOffline) return []

    const { data, error } = await supabase
      .from('focus_sessions')
      .select('*, tasks(id, title)')
      .order('start_time', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    
    return data.map((s: any) => ({
      id: s.id,
      date: s.start_time.split('T')[0],
      startTime: s.start_time,
      endTime: s.end_time,
      durationMinutes: s.duration_minutes,
      breakMinutes: s.break_minutes,
      status: s.status,
      task: s.tasks ? { id: s.tasks.id, title: s.tasks.title } : null,
      pauseCount: s.pause_count,
      notes: s.notes
    })) as FocusSession[]
  },

  async createSession(session: Omit<FocusSession, 'id'>) {
    if (isOffline) {
      return {
        ...session,
        id: `offline-session-${Date.now()}`
      } as FocusSession
    }

    const dbSession = {
      task_id: session.task?.id || null,
      start_time: session.startTime,
      end_time: session.endTime,
      duration_minutes: session.durationMinutes,
      break_minutes: session.breakMinutes,
      status: session.status,
      pause_count: session.pauseCount,
      notes: session.notes
    }

    const { data, error } = await supabase
      .from('focus_sessions')
      .insert([dbSession])
      .select('*, tasks(id, title)')
      .single()
    
    if (error) throw error
    
    const s = data as any
    return {
      id: s.id,
      date: s.start_time.split('T')[0],
      startTime: s.start_time,
      endTime: s.end_time,
      duration_minutes: s.duration_minutes,
      break_minutes: s.break_minutes,
      status: s.status,
      task: s.tasks ? { id: s.tasks.id, title: s.tasks.title } : null,
      pauseCount: s.pause_count,
      notes: s.notes
    } as unknown as FocusSession
  },

  async updateSession(id: string, updates: Partial<FocusSession>) {
    if (isOffline) return

    const dbUpdates: any = {}
    if (updates.endTime !== undefined) dbUpdates.end_time = updates.endTime
    if (updates.status !== undefined) dbUpdates.status = updates.status
    if (updates.pauseCount !== undefined) dbUpdates.pause_count = updates.pauseCount
    if (updates.notes !== undefined) dbUpdates.notes = updates.notes

    const { error } = await supabase
      .from('focus_sessions')
      .update(dbUpdates)
      .eq('id', id)
    
    if (error) throw error
  },

  subscribeToFocusSessions(onUpdate: () => void) {
    if (isOffline) return () => {}

    const channel = supabase
      .channel('public:focus_sessions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'focus_sessions' }, () => {
        onUpdate()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }
}
