# FocusAI — Product Overview

## Summary

Un administrador de tareas con IA integrada que actúa como coach de productividad personal. Va más allá de listar pendientes: te ayuda activamente a cumplir tus objetivos más importantes mediante frameworks probados y acompañamiento inteligente.

### Problems Solved

1. **Listas interminables que abruman** — La IA aplica el Principio de Pareto (80/20) para identificar automáticamente el 20% de tareas que generarán el 80% de resultados.

2. **Metas vagas sin estructura** — Guía al usuario para establecer objetivos SMART y aplicar el método RPM de Tony Robbins.

3. **Procrastinación y trabajo en lo menos importante** — Detección inteligente de patrones de procrastinación con intervenciones proactivas.

4. **Falta de accountability y reflexión** — Preguntas de reflexión periódicas y dashboard completo para visualizar progreso.

5. **Burnout por trabajo continuo sin pausas** — Sugerencias de pausas estratégicas basadas en la técnica Pomodoro.

### Key Features

- Priorización automática con análisis Pareto (80/20)
- Framework de metas SMART y método RPM
- Chat conversacional con el coach de IA
- Sugerencias proactivas contextuales según tipo de tarea y momento del día
- Detección inteligente de procrastinación
- Dashboard de productividad (score diario/semanal, tiempo en foco, progreso hacia metas)
- Técnica Pomodoro con pausas inteligentes adaptadas al usuario

## Planned Sections

1. **Tasks & Priorities** — Gestión de tareas con priorización automática Pareto (80/20) que identifica el 20% de tareas de alto impacto.

2. **Goals & Planning** — Sistema de metas SMART y método RPM para estructurar objetivos con propósito y plan de acción masiva.

3. **AI Coach** — Chat conversacional con la IA, sugerencias proactivas contextuales y detección inteligente de procrastinación.

4. **Focus Mode** — Sesiones de trabajo con técnica Pomodoro, pausas inteligentes adaptadas y tracking de tiempo en foco.

5. **Dashboard** — Métricas de productividad: score diario/semanal, tiempo en foco y visualización de progreso hacia metas.

## Data Model

### Core Entities

- **Task** — Una tarea individual con prioridad Pareto calculada por IA, estado y fecha límite opcional.
- **Goal** — Un objetivo estructurado usando SMART y/o RPM. Agrupa tareas relacionadas.
- **FocusSession** — Sesión de trabajo usando técnica Pomodoro con duración, pausas y estado.
- **CoachInteraction** — Interacción con el coach de IA: mensajes, sugerencias, reflexiones o alertas.
- **ProductivityMetrics** — Datos agregados para el dashboard: score, tiempo en foco, progreso.

### Relationships

- Goal has many Tasks (como parte del plan de acción)
- Task optionally belongs to Goal (puede ser independiente)
- FocusSession optionally links to Task
- CoachInteraction can reference Task or Goal
- ProductivityMetrics aggregates from Tasks, FocusSessions, and Goals

## Design System

**Colors:**
- Primary: `violet` — Used for buttons, links, key accents
- Secondary: `amber` — Used for tags, highlights, warnings
- Neutral: `slate` — Used for backgrounds, text, borders

**Typography:**
- Heading: Space Grotesk
- Body: Inter
- Mono: JetBrains Mono

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, routing structure, and application shell
2. **Tasks & Priorities** — Core task management with Pareto prioritization
3. **Goals & Planning** — SMART goals and RPM methodology
4. **AI Coach** — Conversational coach panel with proactive suggestions
5. **Focus Mode** — Pomodoro sessions and focus tracking
6. **Dashboard** — Productivity metrics and progress visualization

Each milestone has a dedicated instruction document in `product-plan/instructions/`.
