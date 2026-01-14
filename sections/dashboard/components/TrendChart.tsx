import type { TrendDataPoint } from '@/../product/sections/dashboard/types'

interface TrendChartProps {
  data: TrendDataPoint[]
}

export function TrendChart({ data }: TrendChartProps) {
  if (!data || data.length === 0) return null

  const maxScore = Math.max(...data.map(d => d.score))
  const minScore = Math.min(...data.map(d => d.score))
  const range = maxScore - minScore || 1

  const width = 100
  const height = 50
  const padding = 4

  const points = data.map((point, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2)
    const y = height - padding - ((point.score - minScore) / range) * (height - padding * 2)
    return { x, y, ...point }
  })

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ')

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es', { weekday: 'short' }).slice(0, 2)
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
      <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">
        Tendencia de productividad
      </h3>

      <div className="relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-24">
          {/* Gradient fill */}
          <defs>
            <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path
            d={areaD}
            fill="url(#trendGradient)"
            className="dark:opacity-50"
          />

          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke="rgb(139, 92, 246)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="3"
              fill="rgb(139, 92, 246)"
              className="transition-all hover:r-4"
            />
          ))}
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between mt-2 px-1">
          {data.map((point, index) => (
            <span
              key={index}
              className="text-xs text-slate-400 dark:text-slate-500"
            >
              {formatDate(point.date)}
            </span>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Mínimo</p>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{minScore}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">Promedio</p>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {Math.round(data.reduce((acc, d) => acc + d.score, 0) / data.length)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 dark:text-slate-400">Máximo</p>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{maxScore}</p>
        </div>
      </div>
    </div>
  )
}
