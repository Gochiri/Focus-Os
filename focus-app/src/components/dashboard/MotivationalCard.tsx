import { Sparkles, RefreshCw, Quote } from 'lucide-react'
import type { MotivationalCard as MotivationalCardType } from '../../types'

interface MotivationalCardProps {
    card: MotivationalCardType
    onRefresh?: () => void
}

export function MotivationalCard({ card, onRefresh }: MotivationalCardProps) {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-violet-800 dark:from-violet-700 dark:to-violet-950 p-6 text-white shadow-lg shadow-violet-500/20">
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
                        <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                            Motivación Diaria
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
                    <p className="text-lg font-semibold leading-relaxed mb-2 font-heading italic">
                        "{card.quote}"
                    </p>
                    <footer className="text-sm font-medium text-white/70">
                        — {card.author}
                    </footer>
                </blockquote>

                {/* AI Insight */}
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                    <div className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-amber-300 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-white/90 leading-relaxed font-medium">
                            {card.aiInsight}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
