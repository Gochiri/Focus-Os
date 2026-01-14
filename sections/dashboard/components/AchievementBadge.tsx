import { Calendar, Sunrise, Zap, Brain, Target, Lock } from 'lucide-react'
import type { Achievement } from '@/../product/sections/dashboard/types'

interface AchievementBadgeProps {
  achievement: Achievement
  onClick?: () => void
}

const iconMap: Record<string, React.ElementType> = {
  calendar: Calendar,
  sunrise: Sunrise,
  zap: Zap,
  brain: Brain,
  target: Target,
}

const categoryColors = {
  streak: 'from-amber-400 to-orange-500',
  habit: 'from-emerald-400 to-teal-500',
  productivity: 'from-violet-400 to-purple-500',
  focus: 'from-blue-400 to-indigo-500',
  goals: 'from-rose-400 to-pink-500',
}

export function AchievementBadge({ achievement, onClick }: AchievementBadgeProps) {
  const isUnlocked = achievement.unlockedAt !== null
  const Icon = iconMap[achievement.icon] || Target
  const gradientColor = categoryColors[achievement.category] || categoryColors.productivity

  return (
    <button
      onClick={onClick}
      disabled={!isUnlocked}
      className={`
        relative flex flex-col items-center p-4 rounded-xl transition-all
        ${isUnlocked
          ? 'hover:scale-105 cursor-pointer'
          : 'opacity-50 cursor-not-allowed'
        }
      `}
    >
      {/* Badge circle */}
      <div className={`
        relative w-16 h-16 rounded-full flex items-center justify-center mb-2
        ${isUnlocked
          ? `bg-gradient-to-br ${gradientColor} shadow-lg`
          : 'bg-slate-200 dark:bg-slate-700'
        }
      `}>
        {isUnlocked ? (
          <Icon className="w-7 h-7 text-white" />
        ) : (
          <Lock className="w-6 h-6 text-slate-400 dark:text-slate-500" />
        )}

        {/* Shine effect for unlocked */}
        {isUnlocked && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
        )}
      </div>

      {/* Title */}
      <p className={`
        text-xs font-medium text-center line-clamp-2
        ${isUnlocked
          ? 'text-slate-900 dark:text-slate-100'
          : 'text-slate-400 dark:text-slate-500'
        }
      `}>
        {achievement.title}
      </p>

      {/* Unlock date */}
      {isUnlocked && achievement.unlockedAt && (
        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
          {new Date(achievement.unlockedAt).toLocaleDateString('es', { day: 'numeric', month: 'short' })}
        </p>
      )}
    </button>
  )
}
