import { useState } from 'react'
import { Dashboard } from '../components/dashboard/Dashboard'
import type { Period, PeriodMetrics, TrendDataPoint, GoalProgress, MotivationalCard, Achievement, AIInsight } from '../types'

const mockMetrics: Record<Period, PeriodMetrics> = {
  today: {
    productivityScore: 85,
    previousScore: 78,
    focusMinutes: 240,
    previousFocusMinutes: 180,
    sessionsCompleted: 8,
    previousSessions: 6,
    tasksCompleted: 12,
    previousTasksCompleted: 10,
    highImpactCompleted: 3,
    highImpactTotal: 4,
    streakDays: 15
  },
  week: {
    productivityScore: 82,
    previousScore: 75,
    focusMinutes: 1450,
    previousFocusMinutes: 1200,
    sessionsCompleted: 42,
    previousSessions: 38,
    tasksCompleted: 68,
    previousTasksCompleted: 60,
    highImpactCompleted: 18,
    highImpactTotal: 22,
    streakDays: 15
  },
  month: {
    productivityScore: 79,
    previousScore: 72,
    focusMinutes: 5800,
    previousFocusMinutes: 5200,
    sessionsCompleted: 165,
    previousSessions: 150,
    tasksCompleted: 245,
    previousTasksCompleted: 220,
    highImpactCompleted: 65,
    highImpactTotal: 75,
    streakDays: 15
  }
}

const mockTrendData: TrendDataPoint[] = [
  { date: '2024-01-22', score: 72, focusMinutes: 180 },
  { date: '2024-01-23', score: 78, focusMinutes: 210 },
  { date: '2024-01-24', score: 65, focusMinutes: 150 },
  { date: '2024-01-25', score: 85, focusMinutes: 240 },
  { date: '2024-01-26', score: 82, focusMinutes: 230 },
  { date: '2024-01-27', score: 90, focusMinutes: 280 },
  { date: '2024-01-28', score: 88, focusMinutes: 260 },
]

const mockGoals: GoalProgress[] = [
  {
    id: 'goal-001',
    title: 'Lanzar App FocusAI v1.0',
    progress: 75,
    dueDate: '2024-02-15',
    status: 'en_progreso',
    tasksCompleted: 15,
    tasksTotal: 20
  },
  {
    id: 'goal-002',
    title: 'Cerrar 3 clientes Beta',
    progress: 33,
    dueDate: '2024-01-31',
    status: 'en_progreso',
    tasksCompleted: 1,
    tasksTotal: 3
  },
  {
    id: 'goal-003',
    title: 'Establecer rutina de mañana',
    progress: 90,
    dueDate: '2024-02-01',
    status: 'en_progreso',
    tasksCompleted: 18,
    tasksTotal: 20
  }
]

const mockMotivation: MotivationalCard = {
  quote: "La productividad no es ser capaz de hacer muchas cosas, sino ser capaz de hacer las cosas correctas.",
  author: "Gary Keller",
  aiInsight: "Hoy has completado todas tus tareas de alto impacto temprano. Mantén este ritmo para liberar la tarde.",
  date: '2024-01-28'
}

const mockAchievements: Achievement[] = [
  {
    id: 'ach-001',
    title: 'Madrugador',
    description: 'Empezaste una sesión de foco antes de las 7:00 AM',
    icon: 'sunrise',
    unlockedAt: '2024-01-25',
    category: 'habit'
  },
  {
    id: 'ach-002',
    title: 'Imparable',
    description: 'Completaste 10 sesiones de foco en un solo día',
    icon: 'zap',
    unlockedAt: '2024-01-20',
    category: 'focus'
  },
  {
    id: 'ach-003',
    title: 'Semana Perfecta',
    description: 'Cumpliste tus metas diarias durante 7 días seguidos',
    icon: 'calendar',
    unlockedAt: '2024-01-27',
    category: 'streak'
  },
  {
    id: 'ach-004',
    title: 'Mente Clara',
    description: 'Entraste en estado de Flow profundo por más de 2 horas',
    icon: 'brain',
    unlockedAt: null,
    category: 'focus'
  }
]

const mockInsights: AIInsight[] = [
  {
    id: 'ins-001',
    type: 'celebration',
    title: '¡Récord de concentración!',
    message: 'Ayer tuviste tu sesión de foco más larga hasta la fecha (95 min).',
    priority: 'high'
  },
  {
    id: 'ins-002',
    type: 'suggestion',
    title: 'Patrón detectado',
    message: 'Eres un 25% más productivo los martes por la mañana.',
    priority: 'medium'
  },
  {
    id: 'ins-003',
    type: 'warning',
    title: 'Fatiga potencial',
    message: 'Has trabajado 4 horas sin descanso. Considera un break largo.',
    priority: 'high'
  }
]

export function DashboardPage() {
  const [period, setPeriod] = useState<Period>('today')
  const [insights, setInsights] = useState(mockInsights)

  const handleDismissInsight = (id: string) => {
    setInsights(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div className="p-4 sm:p-6">
      <Dashboard
        currentPeriod={period}
        metrics={mockMetrics}
        trendData={mockTrendData}
        goalProgress={mockGoals}
        motivationalCard={mockMotivation}
        achievements={mockAchievements}
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
