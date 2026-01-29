# Requirements: Focus AI

**Defined:** 2025-01-29
**Core Value:** Claridad diaria sobre que hacer para avanzar hacia tus metas, con un coach IA que tiene todo el contexto cuando necesitas ayuda.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Backend & Data

- [ ] **DATA-01**: Configurar Supabase/Firebase como backend
- [ ] **DATA-02**: Esquema de base de datos para jerarquia Meta -> Proyecto -> Tarea
- [ ] **DATA-03**: Sincronizacion en tiempo real con frontend
- [ ] **DATA-04**: Calculo automatico de progreso (tareas -> proyecto -> meta)

### Metas (Goals)

- [ ] **META-01**: Crear meta con titulo y descripcion
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
- [ ] **TASK-06**: Fecha limite (deadline)
- [ ] **TASK-07**: Sistema de tags/etiquetas
- [ ] **TASK-08**: Dependencias entre tareas (tarea X bloquea tarea Y)
- [ ] **TASK-09**: Lista de tareas con filtros (por proyecto, estado, prioridad, tags)

### Coach IA

- [ ] **COACH-01**: Integracion con OpenAI o Claude API
- [ ] **COACH-02**: Interfaz de chat con el coach
- [ ] **COACH-03**: Coach tiene contexto completo (metas, proyectos, tareas, progreso)
- [ ] **COACH-04**: Priorizacion: "Que deberia hacer ahora?"
- [ ] **COACH-05**: Desbloqueo: ayuda cuando estas atascado
- [ ] **COACH-06**: Motivacion: apoyo cuando no tienes ganas
- [ ] **COACH-07**: Sugerencias proactivas del coach

### Focus Sessions

- [ ] **FOCUS-01**: Timer tipo Pomodoro con configuracion de duracion
- [ ] **FOCUS-02**: Asociar sesion de focus a tarea especifica
- [ ] **FOCUS-03**: Pausar/reanudar sesion
- [ ] **FOCUS-04**: Historial de sesiones completadas
- [ ] **FOCUS-05**: Tiempo total enfocado por tarea/proyecto/meta

### Dashboard

- [ ] **DASH-01**: Vista de progreso de todas las metas
- [ ] **DASH-02**: Metricas: tareas completadas, tiempo enfocado
- [ ] **DASH-03**: Streak de dias consecutivos productivos
- [ ] **DASH-04**: Resumen del dia (que hiciste, que falta)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Gamification

- **GAME-01**: Sistema de achievements/logros desbloqueables
- **GAME-02**: Niveles de usuario basados en productividad

### Tasks Extended

- **TASK-10**: Estimacion de tiempo por tarea
- **TASK-11**: Tareas recurrentes

### Integrations

- **INTEG-01**: Sincronizacion con Google Calendar
- **INTEG-02**: Notificaciones push
- **INTEG-03**: Modo offline con sync posterior

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Multi-usuario / autenticacion | App personal, no necesario para v1 |
| App movil nativa | Web-first, mobile puede venir despues |
| Integraciones externas | Despues de core funcional |
| Modo offline | Complejidad adicional no justificada para v1 |
| Estimacion de tiempo | Simplificar v1, puede agregarse en v2 |
| Achievements | Nice-to-have, no core value |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| DATA-01 | Phase 1 | Pending |
| DATA-02 | Phase 1 | Pending |
| DATA-03 | Phase 1 | Pending |
| DATA-04 | Phase 1 | Pending |
| META-01 | Phase 2 | Pending |
| META-02 | Phase 2 | Pending |
| META-03 | Phase 2 | Pending |
| META-04 | Phase 2 | Pending |
| META-05 | Phase 2 | Pending |
| META-06 | Phase 2 | Pending |
| META-07 | Phase 2 | Pending |
| META-08 | Phase 2 | Pending |
| PROJ-01 | Phase 3 | Pending |
| PROJ-02 | Phase 3 | Pending |
| PROJ-03 | Phase 3 | Pending |
| PROJ-04 | Phase 3 | Pending |
| PROJ-05 | Phase 3 | Pending |
| TASK-01 | Phase 4 | Pending |
| TASK-02 | Phase 4 | Pending |
| TASK-03 | Phase 4 | Pending |
| TASK-04 | Phase 4 | Pending |
| TASK-05 | Phase 4 | Pending |
| TASK-06 | Phase 4 | Pending |
| TASK-07 | Phase 4 | Pending |
| TASK-08 | Phase 4 | Pending |
| TASK-09 | Phase 4 | Pending |
| FOCUS-01 | Phase 5 | Pending |
| FOCUS-02 | Phase 5 | Pending |
| FOCUS-03 | Phase 5 | Pending |
| FOCUS-04 | Phase 5 | Pending |
| FOCUS-05 | Phase 5 | Pending |
| COACH-01 | Phase 6 | Pending |
| COACH-02 | Phase 6 | Pending |
| COACH-03 | Phase 6 | Pending |
| COACH-04 | Phase 6 | Pending |
| COACH-05 | Phase 6 | Pending |
| COACH-06 | Phase 6 | Pending |
| COACH-07 | Phase 6 | Pending |
| DASH-01 | Phase 7 | Pending |
| DASH-02 | Phase 7 | Pending |
| DASH-03 | Phase 7 | Pending |
| DASH-04 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 37 total
- Mapped to phases: 37
- Unmapped: 0

---
*Requirements defined: 2025-01-29*
*Last updated: 2025-01-29 - Phase assignments added*
