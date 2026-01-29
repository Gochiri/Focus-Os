import type {
  AllMetrics,
  TrendDataPoint,
  GoalProgress,
  MotivationalCard,
  Achievement,
  AIInsight,
  NavigationItem,
  User
} from '../types/dashboard'

export const sampleMetrics: AllMetrics = {
  today: {
    productivityScore: 78,
    previousScore: 65,
    focusMinutes: 145,
    previousFocusMinutes: 120,
    sessionsCompleted: 5,
    previousSessions: 4,
    tasksCompleted: 7,
    previousTasksCompleted: 5,
    highImpactCompleted: 3,
    highImpactTotal: 4,
    streakDays: 12
  },
  week: {
    productivityScore: 72,
    previousScore: 68,
    focusMinutes: 840,
    previousFocusMinutes: 720,
    sessionsCompleted: 28,
    previousSessions: 24,
    tasksCompleted: 34,
    previousTasksCompleted: 29,
    highImpactCompleted: 12,
    highImpactTotal: 16,
    streakDays: 12
  },
  month: {
    productivityScore: 70,
    previousScore: 62,
    focusMinutes: 3200,
    previousFocusMinutes: 2800,
    sessionsCompleted: 98,
    previousSessions: 85,
    tasksCompleted: 124,
    previousTasksCompleted: 108,
    highImpactCompleted: 42,
    highImpactTotal: 58,
    streakDays: 12
  }
}

export const sampleTrendData: TrendDataPoint[] = [
  { date: "2024-01-09", score: 65, focusMinutes: 90 },
  { date: "2024-01-10", score: 58, focusMinutes: 50 },
  { date: "2024-01-11", score: 72, focusMinutes: 125 },
  { date: "2024-01-12", score: 68, focusMinutes: 100 },
  { date: "2024-01-13", score: 75, focusMinutes: 130 },
  { date: "2024-01-14", score: 82, focusMinutes: 165 },
  { date: "2024-01-15", score: 78, focusMinutes: 145 }
]

export const sampleGoalProgress: GoalProgress[] = [
  {
    id: "goal-001",
    title: "Lanzar la app movil",
    progress: 70,
    dueDate: "2024-03-15",
    status: "en_progreso",
    tasksCompleted: 8,
    tasksTotal: 12
  },
  {
    id: "goal-002",
    title: "Cerrar ronda seed de $500K",
    progress: 40,
    dueDate: "2024-04-30",
    status: "en_progreso",
    tasksCompleted: 4,
    tasksTotal: 10
  },
  {
    id: "goal-003",
    title: "Rutina de ejercicio 4x/semana",
    progress: 75,
    dueDate: "2024-06-30",
    status: "en_progreso",
    tasksCompleted: 9,
    tasksTotal: 12
  },
  {
    id: "goal-006",
    title: "1,000 usuarios activos",
    progress: 0,
    dueDate: "2024-05-31",
    status: "por_iniciar",
    tasksCompleted: 0,
    tasksTotal: 8
  }
]

export const sampleMotivationalCard: MotivationalCard = {
  quote: "El secreto de avanzar es comenzar. El secreto de comenzar es dividir tus tareas complejas en pequenas tareas manejables, y empezar por la primera.",
  author: "Mark Twain",
  aiInsight: "Has completado 3 tareas de alto impacto hoy. Eso te pone en el top 20% de tus dias mas productivos. Sigue asi!",
  date: "2024-01-15"
}

export const sampleAchievements: Achievement[] = [
  {
    id: "ach-001",
    title: "Primera semana",
    description: "Completaste 7 dias consecutivos usando FocusAI",
    icon: "calendar",
    unlockedAt: "2024-01-08",
    category: "streak"
  },
  {
    id: "ach-002",
    title: "Madrugador",
    description: "Iniciaste 5 sesiones de foco antes de las 8am",
    icon: "sunrise",
    unlockedAt: "2024-01-12",
    category: "habit"
  },
  {
    id: "ach-003",
    title: "Pareto Master",
    description: "Completaste 10 tareas de alto impacto en una semana",
    icon: "zap",
    unlockedAt: "2024-01-14",
    category: "productivity"
  },
  {
    id: "ach-004",
    title: "Deep Worker",
    description: "Completaste una sesion de 90 minutos sin pausas",
    icon: "brain",
    unlockedAt: "2024-01-14",
    category: "focus"
  },
  {
    id: "ach-005",
    title: "Meta Crusher",
    description: "Alcanzaste el 50% de progreso en 3 metas simultaneas",
    icon: "target",
    unlockedAt: null,
    category: "goals"
  }
]

export const sampleAiInsights: AIInsight[] = [
  {
    id: "insight-001",
    type: "positive",
    title: "Tu mejor momento es la manana",
    message: "El 70% de tus tareas de alto impacto las completas antes de las 12pm. Considera bloquear tus mananas para trabajo importante.",
    priority: "high"
  },
  {
    id: "insight-002",
    type: "suggestion",
    title: "Oportunidad de mejora",
    message: "Los miercoles tienes 40% menos productividad. Hay reuniones o distracciones ese dia que puedas reducir?",
    priority: "medium"
  },
  {
    id: "insight-003",
    type: "celebration",
    title: "Racha historica!",
    message: "12 dias consecutivos es tu segunda mejor racha. Solo 9 dias mas para superar tu record de 21 dias.",
    priority: "low"
  }
]

export const navigationItems: NavigationItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: 'BarChart3', isActive: true },
  { label: 'Tareas', href: '/tasks', icon: 'CheckSquare', isActive: false },
  { label: 'Metas', href: '/goals', icon: 'Target', isActive: false },
  { label: 'Focus Mode', href: '/focus', icon: 'Timer', isActive: false },
  { label: 'AI Coach', href: '/coach', icon: 'Bot', isActive: false },
]

export const sampleUser: User = {
  name: 'Carlos Rodriguez',
  email: 'carlos@focusai.app',
}
