import { TrendingUp, TrendingDown, Clock, CheckCircle2, Target, Flame, Award, Zap, Calendar, Sunrise } from 'lucide-react'

const metrics = {
  productivityScore: 78,
  previousScore: 65,
  focusMinutes: 145,
  previousFocusMinutes: 120,
  tasksCompleted: 7,
  previousTasksCompleted: 5,
  streakDays: 12
}

const goalProgress = [
  { id: '1', title: 'Lanzar la app móvil', progress: 70, dueDate: '2024-03-15' },
  { id: '2', title: 'Cerrar ronda seed', progress: 40, dueDate: '2024-04-30' },
  { id: '3', title: 'Rutina de ejercicio', progress: 75, dueDate: '2024-06-30' }
]

const achievements = [
  { id: '1', title: 'Primera semana', icon: Calendar, unlocked: true },
  { id: '2', title: 'Madrugador', icon: Sunrise, unlocked: true },
  { id: '3', title: 'Pareto Master', icon: Zap, unlocked: true },
  { id: '4', title: 'Meta Crusher', icon: Target, unlocked: false }
]

const aiInsights = [
  {
    type: 'positive',
    title: 'Tu mejor momento es la mañana',
    message: 'El 70% de tus tareas de alto impacto las completas antes de las 12pm.'
  },
  {
    type: 'suggestion',
    title: 'Oportunidad de mejora',
    message: 'Los miércoles tienes 40% menos productividad. ¿Hay distracciones ese día?'
  }
]

function getChangeIndicator(current: number, previous: number) {
  const change = ((current - previous) / previous) * 100
  const isPositive = change > 0

  return (
    <span className={`flex items-center gap-1 text-sm ${
      isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
    }`}>
      {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
      {Math.abs(change).toFixed(0)}%
    </span>
  )
}

export function DashboardPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Tu progreso de productividad
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Productividad"
          value={metrics.productivityScore}
          suffix="/100"
          icon={Zap}
          change={getChangeIndicator(metrics.productivityScore, metrics.previousScore)}
          color="violet"
        />
        <MetricCard
          title="Tiempo en foco"
          value={metrics.focusMinutes}
          suffix=" min"
          icon={Clock}
          change={getChangeIndicator(metrics.focusMinutes, metrics.previousFocusMinutes)}
          color="blue"
        />
        <MetricCard
          title="Tareas completadas"
          value={metrics.tasksCompleted}
          icon={CheckCircle2}
          change={getChangeIndicator(metrics.tasksCompleted, metrics.previousTasksCompleted)}
          color="emerald"
        />
        <MetricCard
          title="Racha"
          value={metrics.streakDays}
          suffix=" días"
          icon={Flame}
          color="amber"
          highlight
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Goals Progress */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Progreso de metas
          </h2>
          <div className="space-y-4">
            {goalProgress.map(goal => (
              <div key={goal.id}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {goal.title}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {goal.progress}%
                  </span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-500 rounded-full transition-all"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Fecha límite: {goal.dueDate}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Logros
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map(achievement => {
              const Icon = achievement.icon
              return (
                <div
                  key={achievement.id}
                  className={`flex flex-col items-center p-3 rounded-lg ${
                    achievement.unlocked
                      ? 'bg-violet-50 dark:bg-violet-900/20'
                      : 'bg-slate-100 dark:bg-slate-800 opacity-50'
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-1 ${
                    achievement.unlocked
                      ? 'text-violet-600 dark:text-violet-400'
                      : 'text-slate-400'
                  }`} />
                  <span className={`text-xs text-center ${
                    achievement.unlocked
                      ? 'text-slate-700 dark:text-slate-300'
                      : 'text-slate-500'
                  }`}>
                    {achievement.title}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="mt-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
        <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-violet-500" />
          Insights de tu Coach IA
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiInsights.map((insight, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg ${
                insight.type === 'positive'
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
              }`}
            >
              <h3 className={`font-medium mb-1 ${
                insight.type === 'positive'
                  ? 'text-emerald-800 dark:text-emerald-200'
                  : 'text-amber-800 dark:text-amber-200'
              }`}>
                {insight.title}
              </h3>
              <p className={`text-sm ${
                insight.type === 'positive'
                  ? 'text-emerald-700 dark:text-emerald-300'
                  : 'text-amber-700 dark:text-amber-300'
              }`}>
                {insight.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  suffix = '',
  icon: Icon,
  change,
  color,
  highlight
}: {
  title: string
  value: number
  suffix?: string
  icon: React.ComponentType<{ className?: string }>
  change?: React.ReactNode
  color: 'violet' | 'blue' | 'emerald' | 'amber'
  highlight?: boolean
}) {
  const colorStyles = {
    violet: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400',
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
  }

  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 ${
      highlight ? 'ring-2 ring-amber-400 dark:ring-amber-500' : ''
    }`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-slate-500 dark:text-slate-400">{title}</span>
        <div className={`p-2 rounded-lg ${colorStyles[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {value}{suffix}
        </span>
        {change}
      </div>
    </div>
  )
}
