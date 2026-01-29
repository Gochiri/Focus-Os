import { useState, useRef, useEffect } from 'react'
import {
    X,
    Send,
    Bot,
    Flame,
    Clock,
    Sparkles,
} from 'lucide-react'
import type { Message, ProactiveSuggestion, CoachState, ActionType } from '../../types'
import { ChatMessage } from './ChatMessage'
import { ProactiveSuggestionCard } from './ProactiveSuggestionCard'

export interface AICoachPanelProps {
    messages: Message[]
    proactiveSuggestions: ProactiveSuggestion[]
    coachState: CoachState
    isOpen?: boolean
    onSendMessage?: (content: string) => void
    onQuickAction?: (action: ActionType, taskId?: string) => void
    onSuggestionAction?: (suggestionId: string, action: ActionType, taskId?: string) => void
    onDismissSuggestion?: (suggestionId: string) => void
    onClose?: () => void
}

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
            <div className="flex-shrink-0 px-4 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-violet-600 to-violet-800 shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="font-bold text-white font-heading tracking-tight">AI Coach</h2>
                            <p className="text-[10px] text-violet-100 uppercase font-bold tracking-widest">Tu asistente de productividad</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all font-heading"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/90">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatFocusTime(coachState.todayFocusMinutes)} foco</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/90">
                        <Flame className="w-3.5 h-3.5 text-amber-300" />
                        <span>{coachState.currentStreak} días racha</span>
                    </div>
                </div>
            </div>

            {/* Proactive suggestions */}
            {proactiveSuggestions.length > 0 && (
                <div className="flex-shrink-0 p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Sugerencias Proactivas</span>
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
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/30 dark:bg-slate-950/20 custom-scrollbar">
                {messages.map(message => (
                    <ChatMessage
                        key={message.id}
                        message={message}
                        onQuickAction={onQuickAction}
                    />
                ))}

                {/* Typing indicator */}
                {coachState.isTyping && (
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center shadow-sm">
                            <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="px-5 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-2xl rounded-bl-md shadow-sm">
                            <div className="flex gap-1.5">
                                <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex-shrink-0 p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg">
                <div className="flex items-center gap-3">
                    <textarea
                        ref={inputRef as any}
                        rows={1}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all resize-none max-h-32"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputValue.trim()}
                        className="p-3 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:cursor-not-allowed text-white rounded-2xl transition-all shadow-md shadow-violet-500/20 hover:shadow-lg hover:-translate-y-0.5"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                <p className="mt-3 text-[10px] text-center font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Enfoque • Claridad • Acción
                </p>
            </div>
        </div>
    )
}
