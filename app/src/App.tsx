import { useState } from 'react'
import { AppShell } from './components/shell/AppShell'
import { Dashboard } from './components/dashboard/Dashboard'
import type { Period, NavigationItem } from './types/dashboard'
import {
  sampleMetrics,
  sampleTrendData,
  sampleGoalProgress,
  sampleMotivationalCard,
  sampleAchievements,
  sampleAiInsights,
  navigationItems as initialNavItems,
  sampleUser
} from './data/sampleData'

function App() {
  const [currentPeriod, setCurrentPeriod] = useState<Period>('today')
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>(initialNavItems)
  const [aiInsights, setAiInsights] = useState(sampleAiInsights)

  const handleNavigate = (href: string) => {
    setNavigationItems(items =>
      items.map(item => ({
        ...item,
        isActive: item.href === href
      }))
    )
  }

  const handleDismissInsight = (insightId: string) => {
    setAiInsights(insights => insights.filter(i => i.id !== insightId))
  }

  const handleCoachClick = () => {
    alert('AI Coach panel would open here!')
  }

  const handleGoalClick = (goalId: string) => {
    alert(`Goal clicked: ${goalId}`)
  }

  const handleAchievementClick = (achievementId: string) => {
    alert(`Achievement clicked: ${achievementId}`)
  }

  const handleRefreshMotivation = () => {
    alert('New motivational quote would load here!')
  }

  return (
    <AppShell
      navigationItems={navigationItems}
      user={sampleUser}
      onNavigate={handleNavigate}
      onLogout={() => alert('Logout clicked!')}
      onCoachClick={handleCoachClick}
    >
      <Dashboard
        currentPeriod={currentPeriod}
        metrics={sampleMetrics}
        trendData={sampleTrendData}
        goalProgress={sampleGoalProgress}
        motivationalCard={sampleMotivationalCard}
        achievements={sampleAchievements}
        aiInsights={aiInsights}
        onPeriodChange={setCurrentPeriod}
        onGoalClick={handleGoalClick}
        onAchievementClick={handleAchievementClick}
        onDismissInsight={handleDismissInsight}
        onRefreshMotivation={handleRefreshMotivation}
      />
    </AppShell>
  )
}

export default App
