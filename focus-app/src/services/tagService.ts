import { supabase, isOffline } from '../lib/supabase'
import type { Tag } from '../types'

export const tagService = {
  async getTags() {
    if (isOffline) return []

    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name', { ascending: true })
    
    if (error) throw error
    return data as Tag[]
  },

  async createTag(tag: Omit<Tag, 'id'>) {
    if (isOffline) {
      return {
        ...tag,
        id: `offline-tag-${Date.now()}`
      } as Tag
    }

    const { data, error } = await supabase
      .from('tags')
      .insert([tag])
      .select()
      .single()
    
    if (error) throw error
    return data as Tag
  },

  async deleteTag(id: string) {
    if (isOffline) return

    const { error } = await supabase
      .from('tags')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
