import {
  Bot,
  User,
  Sparkles,
  CheckCircle2,
  Play,
  Coffee,
  Target,
  Clock,
} from 'lucide-react'
import type { ChatMessageProps, ActionType } from '@/../product/sections/ai-coach/types'

export function ChatMessage({ message, onQuickAction }: ChatMessageProps) {
  const isUser = message.type === 'user'
  const isReflection = message.type === 'reflection'

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }

  const formatContent = (content: string) => {
    // Simple markdown-like formatting for bold text
    return content.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-slate-900 dark:text-slate-100">
            {part.slice(2, -2)}
          </strong>
        )
      }
      return part
    })
  }

  const getActionIcon = (action: ActionType) => {
    switch (action) {
      case 'start_focus':
        return <Play className="w-3.5 h-3.5" />
      case 'start_break':
        return <Coffee className="w-3.5 h-3.5" />
      case 'complete_task':
        return <CheckCircle2 className="w-3.5 h-3.5" />
      case 'view_task':
        return <Target className="w-3.5 h-3.5" />
      default:
        return null
    }
  }

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`
        flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
        ${isUser
          ? 'bg-violet-100 dark:bg-violet-900/30'
          : isReflection
          ? 'bg-amber-100 dark:bg-amber-900/30'
          : 'bg-gradient-to-br from-violet-500 to-violet-600'
        }
      `}>
        {isUser ? (
          <User className="w-4 h-4 text-violet-600 dark:text-violet-400" />
        ) : isReflection ? (
          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Message content */}
      <div className={`flex-1 max-w-[85%] ${isUser ? 'flex flex-col items-end' : ''}`}>
        <div className={`
          px-4 py-3 rounded-2xl
          ${isUser
            ? 'bg-violet-600 text-white rounded-br-md'
            : isReflection
            ? 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800/50 rounded-bl-md'
            : 'bg-slate-100 dark:bg-slate-800 rounded-bl-md'
          }
        `}>
          {/* Reflection label */}
          {isReflection && (
            <div className="flex items-center gap-1.5 mb-2 text-xs font-medium text-amber-600 dark:text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Momento de reflexión</span>
            </div>
          )}

          {/* Message text */}
          <p className={`
            text-sm leading-relaxed whitespace-pre-wrap
            ${isUser
              ? 'text-white'
              : 'text-slate-700 dark:text-slate-300'
            }
          `}>
            {formatContent(message.content)}
          </p>

          {/* Action executed indicator */}
          {message.actionExecuted && (
            <div className={`
              mt-2 flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs
              ${message.actionExecuted.type === 'task_completed'
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                : 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400'
              }
            `}>
              {message.actionExecuted.type === 'focus_started' && (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Focus Mode iniciado • {message.actionExecuted.duration} min</span>
                </>
              )}
              {message.actionExecuted.type === 'task_completed' && (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Tarea completada</span>
                </>
              )}
              {message.actionExecuted.type === 'break_started' && (
                <>
                  <Coffee className="w-3.5 h-3.5" />
                  <span>Descanso iniciado</span>
                </>
              )}
            </div>
          )}

          {/* Referenced task/goal */}
          {(message.referencedTask || message.referencedGoal) && !message.actionExecuted && (
            <div className="mt-2 flex items-center gap-2 px-2 py-1.5 bg-white/50 dark:bg-slate-700/50 rounded-lg text-xs text-slate-600 dark:text-slate-400">
              <Target className="w-3.5 h-3.5" />
              <span className="truncate">
                {message.referencedTask?.title || message.referencedGoal?.title}
              </span>
            </div>
          )}
        </div>

        {/* Quick actions */}
        {message.quickActions && message.quickActions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => onQuickAction?.(action.action, action.taskId)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-violet-300 dark:hover:border-violet-600 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                {getActionIcon(action.action)}
                {action.label}
              </button>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <span className={`
          mt-1 text-xs text-slate-400 dark:text-slate-500
          ${isUser ? 'text-right' : ''}
        `}>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  )
}
