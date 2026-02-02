import { goalService } from './goalService'
import { taskService } from './taskService'
import { focusService } from './focusService'

export const coachService = {
  async getContext() {
    const [goals, tasks, recentSessions] = await Promise.all([
      goalService.getGoals(),
      taskService.getTasks(),
      focusService.getRecentSessions(10)
    ])

    const activeGoals = goals.filter(g => g.status !== 'completada')
    const pendingTasks = tasks.filter(t => t.status !== 'completed')
    const highImpactTasks = pendingTasks.filter(t => t.priority === 'high')

    return {
      activeGoalsCount: activeGoals.length,
      activeGoals: activeGoals.map(g => ({ title: g.title, progress: g.progress, dueDate: g.dueDate })),
      pendingTasksCount: pendingTasks.length,
      highImpactTasks: highImpactTasks.map(t => ({ title: t.title, deadline: t.deadline })),
      recentSessionsCount: recentSessions.length,
      recentSessions: recentSessions.map(s => ({ task: s.task?.title, duration: s.durationMinutes, date: s.date }))
    }
  },

  async generateResponse(userMessage: string, context: any) {
    // In a real implementation, this would call an API like OpenAI
    // Here we simulate a "context-aware" response
    console.log('Generating response with context:', context)
    
    const lowerMsg = userMessage.toLowerCase()
    
    if (lowerMsg.includes('que hago') || lowerMsg.includes('prioridad')) {
      if (context.highImpactTasks.length > 0) {
        return `Veo que tienes ${context.highImpactTasks.length} tareas de alto impacto. Deberías enfocarte en "${context.highImpactTasks[0].title}" ahora mismo.`
      }
      return 'No tienes tareas de alto impacto pendientes. ¿Quieres que revisemos tus metas para definir el siguiente paso?'
    }

    if (lowerMsg.includes('meta') || lowerMsg.includes('objetivo')) {
      if (context.activeGoals.length > 0) {
        return `Actualmente estás trabajando en ${context.activeGoalsCount} metas. Tu meta "${context.activeGoals[0].title}" tiene un ${context.activeGoals[0].progress}% de avance.`
      }
      return 'No tienes metas activas. ¿Te gustaría definir una meta SMART ahora?'
    }

    return `He recibido tu mensaje: "${userMessage}". Como tu coach, te sugiero que revises tus tareas pendientes (${context.pendingTasksCount}) para mantener el ritmo.`
  }
}
