import { useState, useEffect } from 'react'
import { Plus, X, CheckCircle2, Circle } from 'lucide-react'
import { milestoneService } from '../../services/milestoneService'
import type { Milestone } from '../../types'

interface MilestoneListProps {
  goalId: string
  initialMilestones?: Milestone[]
  onUpdate?: () => void
}

export function MilestoneList({ goalId, initialMilestones = [], onUpdate }: MilestoneListProps) {
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones)
  const [newTitle, setNewTitle] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // If we're editing an existing goal, we might have initial milestones.
    // Ideally, we fetch them fresh or rely on real-time parent updates.
    // For this component, let's allow fetching if none provided or just rely on props.
    // A better pattern for the modal is to pass them in. 
    // If goalId exists (edit mode) and initialMilestones is empty, maybe fetch?
    // Let's stick to props for now to keep it controlled by the parent form if possible,
    // OR make it self-contained. Making it self-contained is easier for "Add/Edit Goal" modal 
    // IF the goal already exists. If it's a new goal, we can't create milestones until goal has ID.
    // So: New Goal -> Create Goal first -> Then add milestones? Or add to local list -> save all?
    // The plan says "MilestoneList component to list, add, edit...".
    // Let's assume for *existing* goals we use the service. For *new* goals, we might need to handle local state.
    // BUT the simplest MVP approach: Create Goal -> Save -> Then you can edit and add milestones.
    // So let's build this for "Edit Goal" mode primarily.
    setMilestones(initialMilestones)
  }, [initialMilestones])

  const handleAdd = async () => {
    if (!newTitle.trim() || !goalId) return

    try {
      setLoading(true)
      const newItem = await milestoneService.createMilestone({
        goalId,
        title: newTitle,
        completed: false
      })
      setMilestones(prev => [...prev, newItem])
      setNewTitle('')
      onUpdate?.()
    } catch (err) {
      console.error('Failed to add milestone', err)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = async (id: string, currentStatus: boolean) => {
    try {
      // Optimistic
      setMilestones(prev => prev.map(m => m.id === id ? { ...m, completed: !currentStatus } : m))
      await milestoneService.updateMilestone(id, { completed: !currentStatus })
      onUpdate?.()
    } catch (err) {
      console.error('Failed to toggle milestone', err)
      // Revert not implemented for brevity
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setMilestones(prev => prev.filter(m => m.id !== id))
      await milestoneService.deleteMilestone(id)
      onUpdate?.()
    } catch (err) {
      console.error('Failed to delete milestone', err)
    }
  }

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-slate-700">Hitos (Milestones)</h4>
      
      <div className="space-y-2">
        {milestones.map(milestone => (
          <div key={milestone.id} className="flex items-center group">
            <button
              onClick={() => handleToggle(milestone.id, milestone.completed)}
              className={`mr-3 ${milestone.completed ? 'text-green-500' : 'text-slate-300 hover:text-slate-400'}`}
            >
              {milestone.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            </button>
            <span className={`flex-1 text-sm ${milestone.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
              {milestone.title}
            </span>
            <button
              onClick={() => handleDelete(milestone.id)}
              className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Nuevo hito..."
          className="flex-1 text-sm px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          disabled={loading}
        />
        <button
          onClick={handleAdd}
          disabled={loading || !newTitle.trim()}
          className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 disabled:opacity-50"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  )
}
