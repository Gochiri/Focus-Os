# Requirements: Focus AI

**Defined:** 2025-01-29
**Core Value:** Claridad diaria sobre qué hacer para avanzar hacia tus metas, con un coach IA que tiene todo el contexto cuando necesitas ayuda.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Backend & Data

- [ ] **DATA-01**: Configurar Supabase/Firebase como backend
- [ ] **DATA-02**: Esquema de base de datos para jerarquía Meta → Proyecto → Tarea
- [ ] **DATA-03**: Sincronización en tiempo real con frontend
- [ ] **DATA-04**: Cálculo automático de progreso (tareas → proyecto → meta)

### Metas (Goals)

- [ ] **META-01**: Crear meta con título y descripción
- [ ] **META-02**: Editar meta existente
- [ ] **META-03**: Eliminar meta
- [ ] **META-04**: Campos SMART (Specific, Measurable, Achievable, Relevant, Time-bound)
- [ ] **META-05**: Campos RPM (Result, Purpose, Massive Action Plan)
- [ ] **META-06**: Milestones/hitos dentro de cada meta
- [ ] **META-07**: Visualizar progreso de la meta (calculado desde proyectos/tareas)
- [ ] **META-08**: Lista de metas con filtros por estado

### Proyectos (Projects)

- [ ] **PROJ-01**: Crear proyecto vinculado a una meta
- [ ] **PROJ-02**: Editar proyecto existente
- [ ] **PROJ-03**: Eliminar proyecto
- [ ] **PROJ-04**: Ver progreso del proyecto (calculado desde tareas)
- [ ] **PROJ-05**: Lista de proyectos con filtro por meta

### Tareas (Tasks)

- [ ] **TASK-01**: Crear tarea vinculada a un proyecto
- [ ] **TASK-02**: Editar tarea existente
- [ ] **TASK-03**: Eliminar tarea
- [ ] **TASK-04**: Estados: pendiente, en progreso, completada, bloqueada
- [ ] **TASK-05**: Prioridad: alta, media, baja
- [ ] **TASK-06**: Fecha límite (deadline)
- [ ] **TASK-07**: Sistema de tags/etiquetas
- [ ] **TASK-08**: Dependencias entre tareas (tarea X bloquea tarea Y)
- [ ] **TASK-09**: Lista de tareas con filtros (por proyecto, estado, prioridad, tags)

### Coach IA

- [ ] **COACH-01**: Integración con OpenAI o Claude API
- [ ] **COACH-02**: Interfaz de chat con el coach
- [ ] **COACH-03**: Coach tiene contexto completo (metas, proyectos, tareas, progreso)
- [ ] **COACH-04**: Priorización: "¿Qué debería hacer ahora?"
- [ ] **COACH-05**: Desbloqueo: ayuda cuando estás atascado
- [ ] **COACH-06**: Motivación: apoyo cuando no tienes ganas
- [ ] **COACH-07**: Sugerencias proactivas del coach

### Focus Sessions

- [ ] **FOCUS-01**: Timer tipo Pomodoro con configuración de duración
- [ ] **FOCUS-02**: Asociar sesión de focus a tarea específica
- [ ] **FOCUS-03**: Pausar/reanudar sesión
- [ ] **FOCUS-04**: Historial de sesiones completadas
- [ ] **FOCUS-05**: Tiempo total enfocado por tarea/proyecto/meta

### Dashboard

- [ ] **DASH-01**: Vista de progreso de todas las metas
- [ ] **DASH-02**: Métricas: tareas completadas, tiempo enfocado
- [ ] **DASH-03**: Streak de días consecutivos productivos
- [ ] **DASH-04**: Resumen del día (qué hiciste, qué falta)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Gamification

- **GAME-01**: Sistema de achievements/logros desbloqueables
- **GAME-02**: Niveles de usuario basados en productividad

### Tasks Extended

- **TASK-10**: Estimación de tiempo por tarea
- **TASK-11**: Tareas recurrentes

### Integrations

- **INTEG-01**: Sincronización con Google Calendar
- **INTEG-02**: Notificaciones push
- **INTEG-03**: Modo offline con sync posterior

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Multi-usuario / autenticación | App personal, no necesario para v1 |
| App móvil nativa | Web-first, mobile puede venir después |
| Integraciones externas | Después de core funcional |
| Modo offline | Complejidad adicional no justificada para v1 |
| Estimación de tiempo | Simplificar v1, puede agregarse en v2 |
| Achievements | Nice-to-have, no core value |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| DATA-01 | TBD | Pending |
| DATA-02 | TBD | Pending |
| DATA-03 | TBD | Pending |
| DATA-04 | TBD | Pending |
| META-01 | TBD | Pending |
| META-02 | TBD | Pending |
| META-03 | TBD | Pending |
| META-04 | TBD | Pending |
| META-05 | TBD | Pending |
| META-06 | TBD | Pending |
| META-07 | TBD | Pending |
| META-08 | TBD | Pending |
| PROJ-01 | TBD | Pending |
| PROJ-02 | TBD | Pending |
| PROJ-03 | TBD | Pending |
| PROJ-04 | TBD | Pending |
| PROJ-05 | TBD | Pending |
| TASK-01 | TBD | Pending |
| TASK-02 | TBD | Pending |
| TASK-03 | TBD | Pending |
| TASK-04 | TBD | Pending |
| TASK-05 | TBD | Pending |
| TASK-06 | TBD | Pending |
| TASK-07 | TBD | Pending |
| TASK-08 | TBD | Pending |
| TASK-09 | TBD | Pending |
| COACH-01 | TBD | Pending |
| COACH-02 | TBD | Pending |
| COACH-03 | TBD | Pending |
| COACH-04 | TBD | Pending |
| COACH-05 | TBD | Pending |
| COACH-06 | TBD | Pending |
| COACH-07 | TBD | Pending |
| FOCUS-01 | TBD | Pending |
| FOCUS-02 | TBD | Pending |
| FOCUS-03 | TBD | Pending |
| FOCUS-04 | TBD | Pending |
| FOCUS-05 | TBD | Pending |
| DASH-01 | TBD | Pending |
| DASH-02 | TBD | Pending |
| DASH-03 | TBD | Pending |
| DASH-04 | TBD | Pending |

**Coverage:**
- v1 requirements: 37 total
- Mapped to phases: 0
- Unmapped: 37 ⚠️

---
*Requirements defined: 2025-01-29*
*Last updated: 2025-01-29 after initial definition*
