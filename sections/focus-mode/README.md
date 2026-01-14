# Focus Mode

## Overview

Sesiones de trabajo enfocado con técnica Pomodoro personalizable. Pantalla inmersiva durante sesiones activas con animaciones relajantes. La IA aprende patrones del usuario para sugerir duraciones óptimas.

## User Flows

- Iniciar sesión de foco desde esta sección (con o sin tarea asociada)
- Iniciar sesión de foco desde cualquier tarea en Tasks & Priorities
- Configurar duración de trabajo y descanso (personalizable)
- Ver pantalla inmersiva durante sesión activa con timer y animaciones
- Recibir notificación al terminar y elegir: tomar descanso o continuar
- Pausar o cancelar sesión en cualquier momento
- Ver estadísticas del día y racha de días consecutivos
- Explorar historial de sesiones en calendario visual

## Design Decisions

- AI recommendation prominently displayed with explanation
- Duration presets as large clickable cards (25min, 50min, 15min, 90min)
- Stats displayed at top: today's time, streak, sessions, average
- Weekly progress bar shows goal progress
- Calendar shows session history with intensity colors
- Recent sessions list below session starter

## Data Used

**Entities:** FocusSession, DurationPreset, FocusStats, CalendarDay, ActiveSession

**From global model:** FocusSession entity, references Task optionally

## Visual Reference

See `screenshot.png` for the target UI design (if available).

## Components Provided

- `FocusModeDashboard.tsx` — Main view with stats and session controls
- `DurationSelector.tsx` — Duration preset cards and custom option
- `FocusCalendar.tsx` — Monthly calendar with session intensity

## Callback Props

| Callback | Description |
|----------|-------------|
| `onStartSession` | Called when user starts a focus session |
| `onPauseSession` | Called when user pauses session |
| `onResumeSession` | Called when user resumes session |
| `onCancelSession` | Called when user cancels session |
| `onCompleteSession` | Called when session completes |
| `onStartBreak` | Called when user starts break |
| `onSkipBreak` | Called when user skips break |
| `onSelectDay` | Called when user clicks calendar day |
| `onSelectTask` | Called when user wants to link task |
