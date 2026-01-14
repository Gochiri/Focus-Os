# Dashboard

## Overview

Centro de métricas de productividad con score visual tipo gauge, progreso hacia metas, tiempo en foco, y elementos motivacionales. Permite ver datos de hoy, semana o mes. Incluye insights de la IA y cards de motivación.

## User Flows

- Ver score de productividad en gráfico circular (gauge)
- Cambiar período de visualización: Hoy / Semana / Mes
- Ver progreso hacia cada meta activa con porcentaje
- Revisar tiempo total en foco y sesiones completadas
- Ver tareas de alto impacto completadas vs pendientes
- Leer card de motivación diaria (frase + insight de IA)
- Ver logros/achievements desbloqueados
- Comparar rendimiento actual vs período anterior

## Design Decisions

- Productivity score as large circular gauge (0-100)
- Period toggle at top right
- Metrics in grid: focus time, sessions, tasks, high-impact ratio
- Goal progress as clickable cards (navigate to goal)
- AI insights dismissable cards
- Achievements as icon badges (locked/unlocked)
- Motivational quote with refresh option

## Data Used

**Entities:** PeriodMetrics, TrendDataPoint, GoalProgress, MotivationalCard, Achievement, AIInsight

**From global model:** Aggregates from Task, FocusSession, Goal entities

## Visual Reference

See `screenshot.png` for the target UI design (if available).

## Components Provided

- `Dashboard.tsx` — Main dashboard layout
- `ProductivityGauge.tsx` — Circular score gauge
- `MetricCard.tsx` — Individual metric card
- `TrendChart.tsx` — 7-day trend line chart
- `GoalProgressCard.tsx` — Goal with progress bar
- `MotivationalCard.tsx` — Quote and insight
- `AIInsightCard.tsx` — AI observation card
- `AchievementBadge.tsx` — Unlocked achievement

## Callback Props

| Callback | Description |
|----------|-------------|
| `onPeriodChange` | Called when user changes time period |
| `onGoalClick` | Called when user clicks a goal card |
| `onAchievementClick` | Called when user clicks an achievement |
| `onDismissInsight` | Called when user dismisses an AI insight |
| `onRefreshMotivation` | Called when user wants new quote |
