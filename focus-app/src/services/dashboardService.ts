import { goalService } from './goalService'
import { taskService } from './taskService'
import { focusService } from './focusService'
import type { Period, PeriodMetrics, GoalProgress } from '../types'

export const dashboardService = {
  async getMetrics(period: Period): Promise<PeriodMetrics> {
    const [tasks, sessions] = await Promise.all([
      taskService.getTasks(),
      focusService.getRecentSessions(100)
    ])

    const now = new Date()
    const todayStr = now.toISOString().split('T')[0]
    
    // Filter by period
    const filteredSessions = sessions.filter(s => {
      if (period === 'today') return s.date === todayStr
      // Simplified week/month filtering
      return true 
    })

    const filteredTasks = tasks.filter(t => t.status === 'completed') // Simplified

    const focusMinutes = filteredSessions.reduce((acc, s) => acc + s.durationMinutes, 0)
    const tasksCompleted = filteredTasks.length
    
    // Simple score logic
    const productivityScore = Math.min(100, Math.round((focusMinutes / 120) * 50 + (tasksCompleted * 10)))

    return {
      productivityScore,
      previousScore: 70,
      focusMinutes,
      previousFocusMinutes: 180,
      sessionsCompleted: filteredSessions.length,
      previousSessions: 5,
      tasksCompleted,
      previousTasksCompleted: 8,
      highImpactCompleted: tasks.filter(t => t.priority === 'high' && t.status === 'completed').length,
      highImpactTotal: tasks.filter(t => t.priority === 'high').length,
      streakDays: 12
    }
  },

  async getGoalProgress(): Promise<GoalProgress[]> {
    const goals = await goalService.getGoals()
    return goals.map(g => ({
      id: g.id,
      title: g.title,
      progress: g.progress,
      dueDate: g.dueDate,
      status: g.status,
      tasksCompleted: g.linkedTasks?.filter(t => t.completed).length || 0,
      tasksTotal: g.linkedTasks?.length || 0
    }))
  }
}
