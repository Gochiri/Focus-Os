import { useState } from 'react'
import { Send, Bot, User, Sparkles, Lightbulb, AlertTriangle } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'ai' | 'suggestion'
  content: string
  timestamp: string
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'ai',
    content: '¡Hola! Soy tu coach de productividad con IA. Puedo ayudarte a priorizar tareas, planificar metas, o simplemente conversar sobre cómo mejorar tu productividad. ¿En qué te puedo ayudar hoy?',
    timestamp: '09:00'
  },
  {
    id: '2',
    type: 'user',
    content: 'Tengo demasiadas tareas pendientes y no sé por dónde empezar',
    timestamp: '09:02'
  },
  {
    id: '3',
    type: 'ai',
    content: 'Entiendo esa sensación de agobio. Veo que tienes 3 tareas de alto impacto pendientes. Te sugiero aplicar el principio Pareto: enfocarte en el 20% de tareas que generan el 80% del impacto.\n\nLa tarea "Preparar presentación para inversores" tiene deadline pronto y es crítica para tu meta de fundraising. ¿Empezamos por ahí?',
    timestamp: '09:02'
  },
  {
    id: '4',
    type: 'suggestion',
    content: '💡 Detecté que tienes una reunión en 2 horas. Podrías hacer una sesión de foco de 90 minutos en la presentación antes de eso.',
    timestamp: '09:03'
  }
]

export function CoachPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages([...messages, newMessage])
    setInput('')

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Gracias por compartir eso. Déjame analizar tu situación y darte algunas recomendaciones personalizadas basadas en tus metas y patrones de productividad.',
        timestamp: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-full">
            <Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h1 className="font-semibold text-slate-900 dark:text-slate-100">
              AI Coach
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Tu asistente de productividad personal
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      {/* Quick suggestions */}
      <div className="flex-shrink-0 px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <QuickAction label="¿Qué debo hacer primero?" />
          <QuickAction label="Analiza mi productividad" />
          <QuickAction label="Ayúdame a planificar" />
          <QuickAction label="Estoy procrastinando" />
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu mensaje..."
            className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-0 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <button
            onClick={handleSend}
            className="p-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  if (message.type === 'suggestion') {
    return (
      <div className="flex justify-center">
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-3 max-w-md">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            {message.content}
          </p>
        </div>
      </div>
    )
  }

  const isUser = message.type === 'user'

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser
          ? 'bg-slate-200 dark:bg-slate-700'
          : 'bg-violet-100 dark:bg-violet-900/30'
      }`}>
        {isUser ? (
          <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        ) : (
          <Bot className="w-4 h-4 text-violet-600 dark:text-violet-400" />
        )}
      </div>
      <div className={`max-w-[70%] ${isUser ? 'text-right' : ''}`}>
        <div className={`inline-block px-4 py-2.5 rounded-2xl ${
          isUser
            ? 'bg-violet-600 text-white rounded-br-md'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-md'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
        <p className="text-xs text-slate-400 mt-1">{message.timestamp}</p>
      </div>
    </div>
  )
}

function QuickAction({ label }: { label: string }) {
  return (
    <button className="flex-shrink-0 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm text-slate-700 dark:text-slate-300 hover:border-violet-300 dark:hover:border-violet-600 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
      {label}
    </button>
  )
}
