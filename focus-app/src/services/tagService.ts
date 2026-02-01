import { supabase } from '../lib/supabase'
import type { Tag } from '../types'

export const tagService = {
  async getTags() {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name', { ascending: true })
    
    if (error) throw error
    return data as Tag[]
  },

  async createTag(tag: Omit<Tag, 'id'>) {
    const { data, error } = await supabase
      .from('tags')
      .insert([tag])
      .select()
      .single()
    
    if (error) throw error
    return data as Tag
  },

  async deleteTag(id: string) {
    const { error } = await supabase
      .from('tags')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
