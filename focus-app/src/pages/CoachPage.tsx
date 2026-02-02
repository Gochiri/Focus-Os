import { useState, useEffect } from 'react'
import { AICoachPanel } from '../components/coach/AICoachPanel'
import { coachService } from '../services/coachService'
import { focusService } from '../services/focusService'
import type { Message, ProactiveSuggestion, CoachState, ActionType } from '../types'

export function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      type: 'ai',
      content: '¡Hola! Soy tu AI Coach. Estoy analizando tu contexto actual para ayudarte a ser más productivo...',
      timestamp: new Date().toISOString()
    }
  ])
  const [suggestions, setSuggestions] = useState<ProactiveSuggestion[]>([])
  const [coachState, setCoachState] = useState<CoachState>({
    isTyping: false,
    currentStreak: 0,
    todayFocusMinutes: 0,
    unreadSuggestions: 0,
    lastCheckIn: new Date().toISOString()
  })

  useEffect(() => {
    loadCoachData()
  }, [])

  const loadCoachData = async () => {
    try {
      const sessions = await focusService.getRecentSessions()
      const today = new Date().toISOString().split('T')[0]
      const todayMinutes = sessions
        .filter(s => s.date === today && s.status === 'completed')
        .reduce((acc, s) => acc + s.durationMinutes, 0)

      setCoachState(prev => ({
        ...prev,
        todayFocusMinutes: todayMinutes,
        currentStreak: 12 // Placeholder for streak logic
      }))

      // Initial context-aware greeting
      const context = await coachService.getContext()
      if (context.highImpactTasks.length > 0) {
        const greeting: Message = {
          id: 'msg-greet-context',
          type: 'ai',
          content: `Veo que tienes **${context.highImpactTasks.length} tareas de alto impacto** pendientes. ¿Quieres que te ayude a priorizar una de ellas para empezar a trabajar?`,
          timestamp: new Date().toISOString(),
          quickActions: [
            { id: 'qa-1', label: 'Ver prioridades', action: 'show_high_impact' },
            { id: 'qa-2', label: 'Iniciar Focus', action: 'start_focus' }
          ]
        }
        setMessages(prev => [...prev, greeting])
      }
    } catch (err) {
      console.error('Failed to load coach data', err)
    }
  }

  const handleSendMessage = async (content: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date().toISOString()
    }
    setMessages(prev => [...prev, userMsg])

    setCoachState(prev => ({ ...prev, isTyping: true }))
    try {
      const context = await coachService.getContext()
      const response = await coachService.generateResponse(content, context)
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response,
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, aiResponse])
    } catch (err) {
      console.error('Coach error', err)
    } finally {
      setCoachState(prev => ({ ...prev, isTyping: false }))
    }
  }

  const handleQuickAction = (action: ActionType, taskId?: string) => {
    console.log('Coach action:', action, taskId)
    // Implementation for specific actions could go here
  }

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden">
      <div className="relative w-full h-full flex justify-center bg-slate-50 dark:bg-slate-950">
        <AICoachPanel
          isOpen={true}
          messages={messages}
          proactiveSuggestions={suggestions}
          coachState={coachState}
          onSendMessage={handleSendMessage}
          onQuickAction={handleQuickAction}
          onDismissSuggestion={(id) => setSuggestions(prev => prev.filter(s => s.id !== id))}
          onClose={() => {}}
        />
      </div>
    </div>
  )
}
