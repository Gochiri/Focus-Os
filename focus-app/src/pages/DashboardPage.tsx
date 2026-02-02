import { useState, useEffect } from 'react'
import { Dashboard } from '../components/dashboard/Dashboard'
import { dashboardService } from '../services/dashboardService'
import type { Period, PeriodMetrics, TrendDataPoint, GoalProgress, MotivationalCard, Achievement, AIInsight } from '../types'

export function DashboardPage() {
  const [period, setPeriod] = useState<Period>('today')
  const [metrics, setMetrics] = useState<Record<Period, PeriodMetrics> | null>(null)
  const [goalProgress, setGoalProgress] = useState<GoalProgress[]>([])
  const [loading, setLoading] = useState(true)
  
  // Keep some mock data for UI elements not yet connected to services
  const [insights, setInsights] = useState<AIInsight[]>([
    { id: 'ins-1', type: 'celebration', title: '¡Bienvenido!', message: 'Tu dashboard ahora refleja tus datos reales.', priority: 'high' }
  ])

  useEffect(() => {
    loadDashboardData()
  }, [period])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const [currentMetrics, currentGoals] = await Promise.all([
        dashboardService.getMetrics(period),
        dashboardService.getGoalProgress()
      ])
      
      setMetrics(prev => ({
        ...(prev || {}),
        [period]: currentMetrics
      }) as any)
      
      setGoalProgress(currentGoals)
    } catch (err) {
      console.error('Failed to load dashboard data', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDismissInsight = (id: string) => {
    setInsights(prev => prev.filter(i => i.id !== id))
  }

  if (loading && !metrics) {
    return <div className="p-8 text-center text-slate-500">Cargando métricas...</div>
  }

  return (
    <div className="p-4 sm:p-6">
      <Dashboard
        currentPeriod={period}
        metrics={metrics || {} as any}
        trendData={[]}
        goalProgress={goalProgress}
        motivationalCard={{
            quote: "La mejor manera de predecir el futuro es creándolo.",
            author: "Peter Drucker",
            aiInsight: "Tus datos sugieren que estás manteniendo un buen ritmo en tus tareas de alto impacto.",
            date: new Date().toISOString()
        }}
        achievements={[]}
        aiInsights={insights}
        onPeriodChange={setPeriod}
        onDismissInsight={handleDismissInsight}
        onGoalClick={(id) => console.log('Goal clicked', id)}
        onAchievementClick={(id) => console.log('Achievement clicked', id)}
        onRefreshMotivation={() => console.log('Refresh motivation')}
      />
    </div>
  )
}
