# Goals & Planning

## Overview

Sistema de gestión de metas con metodología SMART y framework RPM. Permite crear objetivos estructurados, definir su propósito y plan de acción, y crear tareas vinculadas para alcanzarlos. Vista principal en Kanban con 4 estados.

## User Flows

- Crear nueva meta con campos SMART (Específica, Medible, Alcanzable, Relevante, con Tiempo)
- Definir plan RPM dentro de la meta: Resultado esperado, Propósito/motivación, Plan de Acción Masiva
- Crear tareas directamente desde una meta (se sincronizan con Tasks & Priorities)
- Mover metas entre estados: Por iniciar → En progreso → Pausada → Completada
- Ver progreso de meta con barra de porcentaje + hitos importantes
- Cambiar entre vistas: Kanban (default), Timeline, Lista

## Design Decisions

- Kanban board with 4 columns shows goals at a glance
- Goal cards show essential info: title, progress bar, due date, tags
- Progress calculated from milestones and linked tasks
- SMART and RPM fields in detail view, not required
- Drag-and-drop for status changes

## Data Used

**Entities:** Goal, Milestone, LinkedTask

**From global model:** Goal entity links to Task entities

## Visual Reference

See `screenshot.png` for the target UI design (if available).

## Components Provided

- `GoalCard.tsx` — Goal card with progress, tags, due date
- `GoalKanban.tsx` — Kanban board with 4 columns

## Callback Props

| Callback | Description |
|----------|-------------|
| `onCreate` | Called when user clicks to create new goal |
| `onView` | Called when user clicks to view goal details |
| `onEdit` | Called when user clicks to edit goal |
| `onDelete` | Called when user clicks to delete goal |
| `onStatusChange` | Called when user drags goal to new status |
| `onToggleMilestone` | Called when user toggles milestone completion |
| `onCreateTask` | Called when user creates task from goal |
| `onViewModeChange` | Called when switching Kanban/Timeline/List |
