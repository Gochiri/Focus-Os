import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { TasksPage } from './pages/TasksPage'
import { GoalsPage } from './pages/GoalsPage'
import { CoachPage } from './pages/CoachPage'
import { FocusPage } from './pages/FocusPage'
import { DashboardPage } from './pages/DashboardPage'
import type { NavigationItem } from './components/MainNav'

const navigationItems: NavigationItem[] = [
  { label: 'Tareas', href: '/tasks', icon: 'CheckSquare' },
  { label: 'Metas', href: '/goals', icon: 'Target' },
  { label: 'AI Coach', href: '/coach', icon: 'Bot' },
  { label: 'Focus Mode', href: '/focus', icon: 'Timer' },
  { label: 'Dashboard', href: '/dashboard', icon: 'BarChart3' }
]

const user = {
  name: 'Usuario Demo',
  email: 'demo@focusai.app'
}

function AppContent() {
  const navigate = useNavigate()
  const location = useLocation()

  const navItemsWithActive = navigationItems.map(item => ({
    ...item,
    isActive: location.pathname === item.href || (location.pathname === '/' && item.href === '/tasks')
  }))

  return (
    <AppShell
      navigationItems={navItemsWithActive}
      user={user}
      onNavigate={(href) => navigate(href)}
      onLogout={() => console.log('Logout')}
      onCoachClick={() => navigate('/coach')}
    >
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/coach" element={<CoachPage />} />
        <Route path="/focus" element={<FocusPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </AppShell>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
