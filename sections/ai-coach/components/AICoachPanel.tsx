import { useState, useRef, useEffect } from 'react'
import {
  X,
  Send,
  Bot,
  Flame,
  Clock,
  Sparkles,
} from 'lucide-react'
import type { AICoachPanelProps, ActionType } from '@/../product/sections/ai-coach/types'
import { ChatMessage } from './ChatMessage'
import { ProactiveSuggestionCard } from './ProactiveSuggestionCard'

export function AICoachPanel({
  messages,
  proactiveSuggestions,
  coachState,
  isOpen = true,
  onSendMessage,
  onQuickAction,
  onSuggestionAction,
  onDismissSuggestion,
  onClose,
}: AICoachPanelProps) {
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage?.(inputValue.trim())
      setInputValue('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatFocusTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-violet-600 to-violet-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-white">AI Coach</h2>
              <p className="text-xs text-violet-200">Tu asistente de productividad</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/20">
          <div className="flex items-center gap-1.5 text-xs text-white/90">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatFocusTime(coachState.todayFocusMinutes)} en foco hoy</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/90">
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            <span>{coachState.currentStreak} días de racha</span>
          </div>
        </div>
      </div>

      {/* Proactive suggestions */}
      {proactiveSuggestions.length > 0 && (
        <div className="flex-shrink-0 p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-3 max-h-[300px] overflow-y-auto">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sugerencias para ti</span>
          </div>
          {proactiveSuggestions.map(suggestion => (
            <ProactiveSuggestionCard
              key={suggestion.id}
              suggestion={suggestion}
              onAction={(action, taskId) => onSuggestionAction?.(suggestion.id, action, taskId)}
              onDismiss={() => onDismissSuggestion?.(suggestion.id)}
            />
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message}
            onQuickAction={onQuickAction}
          />
        ))}

        {/* Typing indicator */}
        {coachState.isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-md">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe un mensaje..."
            className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="p-2.5 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-2 text-xs text-center text-slate-400 dark:text-slate-500">
          Presiona Enter para enviar
        </p>
      </div>
    </div>
  )
}

// FAB Button component
export function AICoachFAB({
  unreadCount,
  isOpen,
  onClick,
}: {
  unreadCount: number
  isOpen?: boolean
  onClick?: () => void
}) {
  if (isOpen) return null

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white rounded-full shadow-lg shadow-violet-500/30 flex items-center justify-center transition-all duration-200 hover:scale-105 z-40"
    >
      <Bot className="w-6 h-6" />

      {/* Badge */}
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
          {unreadCount}
        </span>
      )}
    </button>
  )
}
