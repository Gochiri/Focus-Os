import { Sparkles, RefreshCw, Quote } from 'lucide-react'
import type { MotivationalCard as MotivationalCardType } from '@/../product/sections/dashboard/types'

interface MotivationalCardProps {
  card: MotivationalCardType
  onRefresh?: () => void
}

export function MotivationalCard({ card, onRefresh }: MotivationalCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 to-violet-700 dark:from-violet-600 dark:to-violet-900 p-6 text-white">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/20">
              <Quote className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-white/80">
              Motivación del día
            </span>
          </div>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Nueva frase"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quote */}
        <blockquote className="mb-4">
          <p className="text-lg font-medium leading-relaxed mb-2">
            "{card.quote}"
          </p>
          <footer className="text-sm text-white/70">
            — {card.author}
          </footer>
        </blockquote>

        {/* AI Insight */}
        <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-300 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-white/90 leading-relaxed">
              {card.aiInsight}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
