'use client'

import { useState, useRef, useEffect } from 'react'
import { messages, proactiveSuggestions, coachState } from '@/data/sample-data'
import { Message, ProactiveSuggestion, ActionType } from '@/types'
import {
  Bot,
  Send,
  Clock,
  Flame,
  AlertTriangle,
  Sparkles,
  X
} from 'lucide-react'

function ProactiveSuggestionCard({
  suggestion,
  onAction,
  onDismiss
}: {
  suggestion: ProactiveSuggestion
  onAction: (action: ActionType, taskId?: string) => void
  onDismiss: () => void
}) {
  const typeStyles = {
    procrastination_alert: 'bg-amber-50 border-amber-200',
    check_in: 'bg-violet-50 border-violet-200',
    suggestion: 'bg-blue-50 border-blue-200',
    reflection: 'bg-green-50 border-green-200',
  }

  const typeIcons = {
    procrastination_alert: <AlertTriangle size={18} className="text-amber-500" />,
    check_in: <Sparkles size={18} className="text-violet-500" />,
    suggestion: <Bot size={18} className="text-blue-500" />,
    reflection: <Sparkles size={18} className="text-green-500" />,
  }

  return (
    <div className={`border rounded-xl p-4 ${typeStyles[suggestion.type]}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {typeIcons[suggestion.type]}
          <span className="font-medium text-slate-900">{suggestion.title}</span>
        </div>
        <button onClick={onDismiss} className="text-slate-400 hover:text-slate-600">
          <X size={16} />
        </button>
      </div>

      {suggestion.referencedTask && (
        <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
          {suggestion.referencedTask.title}
        </p>
      )}

      <p className="text-sm text-slate-600 mb-3">{suggestion.message}</p>

      <div className="flex flex-wrap gap-2">
        {suggestion.actions.map(action => (
          <button
            key={action.id}
            onClick={() => onAction(action.action, action.taskId)}
            className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
              action.action === 'start_focus' || action.action === 'break_down_task'
                ? 'bg-violet-600 text-white hover:bg-violet-700'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.type === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        {!isUser && (
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center">
              <Bot size={14} className="text-violet-600" />
            </div>
            <span className="text-xs text-slate-500">AI Coach</span>
          </div>
        )}

        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-violet-600 text-white rounded-br-md'
              : 'bg-white border border-slate-200 text-slate-700 rounded-bl-md'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>

        {message.quickActions && message.quickActions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.quickActions.map(action => (
              <button
                key={action.id}
                className="text-xs px-3 py-1.5 bg-violet-100 text-violet-700 rounded-full hover:bg-violet-200 transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        <p className="text-xs text-slate-400 mt-1">
          {new Date(message.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  )
}

export default function CoachPage() {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState(proactiveSuggestions)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleAction = (action: ActionType, taskId?: string) => {
    console.log('Action:', action, taskId)
  }

  const handleDismiss = (id: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== id))
  }

  const handleSend = () => {
    if (!inputValue.trim()) return
    console.log('Send:', inputValue)
    setInputValue('')
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
            <Bot size={24} className="text-violet-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>
              AI Coach
            </h1>
            <p className="text-sm text-slate-500">Tu asistente de productividad</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock size={16} className="text-violet-500" />
            <span className="text-slate-600">{Math.floor(coachState.todayFocusMinutes / 60)}h {coachState.todayFocusMinutes % 60}m en foco hoy</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Flame size={16} className="text-amber-500" />
            <span className="text-slate-600">{coachState.currentStreak} días de racha</span>
          </div>
        </div>
      </div>

      {/* Proactive suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
            <Sparkles size={14} />
            Sugerencias para ti
          </p>
          <div className="space-y-3">
            {suggestions.map(suggestion => (
              <ProactiveSuggestionCard
                key={suggestion.id}
                suggestion={suggestion}
                onAction={handleAction}
                onDismiss={() => handleDismiss(suggestion.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Chat area */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
        {/* Messages */}
        <div className="h-[400px] overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-slate-200 p-4 bg-white">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe un mensaje..."
              className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="p-2.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2 text-center">
            Presiona Enter para enviar
          </p>
        </div>
      </div>
    </div>
  )
}
