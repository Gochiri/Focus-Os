# Focus AI

## What This Is

App personal de productividad que te ayuda a mantener claridad sobre tus metas y las tareas necesarias para lograrlas. Estructura jerárquica: Metas → Proyectos → Tareas. Incluye un Coach IA con contexto completo que te ayuda cuando te pierdes.

## Core Value

**Claridad diaria sobre qué hacer para avanzar hacia tus metas, con un coach IA que tiene todo el contexto cuando necesitas ayuda.**

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ UI components para Dashboard, Tasks, Goals, Focus, Coach — existing
- ✓ Type definitions para todas las entidades — existing
- ✓ App shell con navegación entre secciones — existing

### Active

<!-- Current scope. Building toward these. -->

**Jerarquía Meta → Proyecto → Tarea:**
- [ ] CRUD completo de Metas con campos SMART + RPM
- [ ] CRUD completo de Proyectos vinculados a Metas
- [ ] CRUD completo de Tareas vinculadas a Proyectos
- [ ] Sistema de Tags para organizar tareas
- [ ] Cálculo de progreso hacia arriba (tareas → proyecto → meta)

**Persistencia:**
- [ ] Backend con Supabase o Firebase
- [ ] Sincronización de datos en tiempo real
- [ ] Esquema de base de datos para la jerarquía

**Coach IA:**
- [ ] Integración con OpenAI o Claude API
- [ ] Coach con contexto completo (metas, proyectos, tareas, progreso)
- [ ] Capacidad de priorizar ("¿qué hago ahora?")
- [ ] Capacidad de desbloquear ("estoy atascado con X")
- [ ] Capacidad de motivar ("no tengo ganas")

**Focus Sessions:**
- [ ] Timer tipo Pomodoro funcional
- [ ] Asociar sesión a tarea específica
- [ ] Tracking de tiempo por tarea/proyecto/meta

**Dashboard:**
- [ ] Métricas de productividad reales
- [ ] Visualización de progreso por meta
- [ ] Streaks y achievements

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Multi-usuario / autenticación — app personal, no necesario ahora
- App móvil nativa — web-first, mobile puede venir después
- Notificaciones push — simplificar v1
- Integraciones externas (calendario, email) — después de core funcional
- Modo offline — requiere complejidad adicional

## Context

**Estado actual del código:**
- Frontend React + TypeScript + Vite
- Componentes UI existentes pero no pulidos
- Construido iterativamente con Antigravity + Gemini Flash
- Sin backend, sin persistencia real
- Sin integración IA real

**Estructura de datos actual:**
- Task tiene projectId y goalId (relación plana)
- Necesita ajustarse a jerarquía Goal → Project → Task

**Usuario objetivo:**
- Personal (el desarrollador mismo)
- Necesita claridad diaria sobre metas y tareas

## Constraints

- **Stack frontend**: React + TypeScript + Vite (ya establecido)
- **Backend**: Supabase o Firebase (BaaS para velocidad)
- **IA**: OpenAI o Claude API (requiere API key)
- **Presupuesto**: Minimizar costos de API/hosting

## Key Decisions

<!-- Decisions that constrain future work. Add throughout project lifecycle. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Jerarquía Meta → Proyecto → Tarea | Refleja cómo el usuario piensa sobre productividad | — Pending |
| Supabase/Firebase como backend | BaaS acelera desarrollo vs backend custom | — Pending |
| IA real desde el inicio | Core value requiere coach inteligente | — Pending |
| App personal sin auth | Simplifica v1, auth se puede agregar después | — Pending |

---
*Last updated: 2025-01-29 after initialization*
