import { useState } from 'react'
import { AICoachPanel } from '../components/coach/AICoachPanel'
import type { Message, ProactiveSuggestion, CoachState, ActionType } from '../types'

const initialMessages: Message[] = [
  {
    id: 'msg-001',
    type: 'ai',
    content: '¡Hola! Soy tu AI Coach. Estoy aquí para ayudarte a maximizar tu enfoque hoy. Veo que tienes **3 tareas de alto impacto** pendientes para esta tarde.',
    timestamp: new Date().toISOString(),
    quickActions: [
      { id: 'qa-001', label: 'Iniciar Focus Mode', action: 'start_focus' },
      { id: 'qa-002', label: 'Revisar tareas', action: 'view_task' }
    ]
  },
  {
    id: 'msg-002',
    type: 'reflection',
    content: '¿Cuál de estas tareas te daría el mayor sentimiento de logro si las terminaras en los próximos 90 minutos?',
    timestamp: new Date().toISOString()
  }
]

const initialSuggestions: ProactiveSuggestion[] = [
  {
    id: 'sug-001',
    type: 'procrastination_alert',
    title: 'Posible bloqueo detectado',
    message: 'Has pospuesto "Rediseño de landing page" por 3 días seguidos. ¿Quieres dividirla en tareas más pequeñas?',
    priority: 'high',
    createdAt: new Date().toISOString(),
    actions: [
      { id: 'sact-001', label: 'Dividir tarea', action: 'view_task' },
      { id: 'sact-002', label: 'Ignorar', action: 'view_task' }
    ]
  },
  {
    id: 'sug-002',
    type: 'check_in',
    title: 'Revisión de Flow',
    message: 'Llevas 45 minutos de trabajo profundo. ¿Cómo te sientes para otros 45?',
    priority: 'medium',
    createdAt: new Date().toISOString(),
    actions: [
      { id: 'sact-003', label: 'Seguir así', action: 'start_focus' },
      { id: 'sact-004', label: 'Tomar break', action: 'start_break' }
    ]
  }
]

export function CoachPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [suggestions, setSuggestions] = useState<ProactiveSuggestion[]>(initialSuggestions)
  const [coachState, setCoachState] = useState<CoachState>({
    isTyping: false,
    currentStreak: 15,
    todayFocusMinutes: 240,
    unreadSuggestions: 2,
    lastCheckIn: new Date().toISOString()
  })

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date().toISOString()
    }
    setMessages(prev => [...prev, userMsg])

    // Simulate AI response
    setCoachState(prev => ({ ...prev, isTyping: true }))
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Entendido. He procesado tu mensaje sobre "**${content}**". ¿Te gustaría que programemos un bloque de trabajo para esto ahora mismo?`,
        timestamp: new Date().toISOString(),
        quickActions: [
          { id: 'qa-3', label: 'Sí, programar', action: 'start_focus' },
          { id: 'qa-4', label: 'Más tarde', action: 'view_task' }
        ]
      }
      setMessages(prev => [...prev, aiResponse])
      setCoachState(prev => ({ ...prev, isTyping: false }))
    }, 1500)
  }

  const handleQuickAction = (action: ActionType, taskId?: string) => {
    console.log('Quick action:', action, taskId)
    if (action === 'start_focus') {
      // Simulate action executed message
      const actionMsg: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: '¡Excelente! He iniciado un bloque de **Focus Mode** de 25 minutos.',
        timestamp: new Date().toISOString(),
        actionExecuted: {
          type: 'focus_started',
          duration: 25
        }
      }
      setMessages(prev => [...prev, actionMsg])
    }
  }

  const handleDismissSuggestion = (id: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden">
      {/* 
          In a real app, this might be a sidebar, but here we show it 
          as a main view or we could use the AICoachPanel inside a container.
          Given it's a fixed panel, it might overlap other UI if not handled.
          For the /coach route, we'll render it "relative" or inside a container 
          so it doesn't float over the whole app but stays in the content area.
      */}
      <div className="relative w-full h-full flex justify-center bg-slate-50 dark:bg-slate-950">
        <AICoachPanel
          isOpen={true}
          messages={messages}
          proactiveSuggestions={suggestions}
          coachState={coachState}
          onSendMessage={handleSendMessage}
          onQuickAction={handleQuickAction}
          onDismissSuggestion={handleDismissSuggestion}
          onClose={() => console.log('Close coach')}
        />
      </div>
    </div>
  )
}
