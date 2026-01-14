import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface ProductivityGaugeProps {
  score: number
  previousScore: number
  periodLabel: string
}

export function ProductivityGauge({ score, previousScore, periodLabel }: ProductivityGaugeProps) {
  const difference = score - previousScore
  const percentage = (score / 100) * 100

  // Calculate the stroke dasharray for the circular progress
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const getScoreColor = () => {
    if (score >= 80) return { stroke: 'stroke-emerald-500', text: 'text-emerald-500', bg: 'bg-emerald-500' }
    if (score >= 60) return { stroke: 'stroke-violet-500', text: 'text-violet-500', bg: 'bg-violet-500' }
    if (score >= 40) return { stroke: 'stroke-amber-500', text: 'text-amber-500', bg: 'bg-amber-500' }
    return { stroke: 'stroke-red-500', text: 'text-red-500', bg: 'bg-red-500' }
  }

  const colors = getScoreColor()

  const getScoreLabel = () => {
    if (score >= 90) return 'Excepcional'
    if (score >= 80) return 'Excelente'
    if (score >= 70) return 'Muy bien'
    if (score >= 60) return 'Bien'
    if (score >= 50) return 'Regular'
    return 'Necesita mejora'
  }

  return (
    <div className="flex flex-col items-center">
      {/* Gauge */}
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-slate-100 dark:text-slate-800"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            strokeWidth="12"
            strokeLinecap="round"
            className={`${colors.stroke} transition-all duration-1000 ease-out`}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-5xl font-bold ${colors.text}`}>
            {score}
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            de 100
          </span>
        </div>
      </div>

      {/* Label */}
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {getScoreLabel()}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Score de productividad • {periodLabel}
        </p>
      </div>

      {/* Comparison */}
      <div className={`
        mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
        ${difference > 0
          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
          : difference < 0
          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
        }
      `}>
        {difference > 0 ? (
          <TrendingUp className="w-4 h-4" />
        ) : difference < 0 ? (
          <TrendingDown className="w-4 h-4" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
        <span>
          {difference > 0 ? '+' : ''}{difference} vs período anterior
        </span>
      </div>
    </div>
  )
}
