# AI Coach

## Overview

Panel lateral derecho colapsable con un coach de IA conversacional. Accesible globalmente desde cualquier sección mediante botón flotante. Permite conversar, ejecutar acciones en la app, recibir sugerencias proactivas y hacer check-ins de reflexión diarios.

## User Flows

- Abrir/cerrar panel del coach mediante botón flotante (accesible desde toda la app)
- Conversar con la IA para pedir consejos, hacer preguntas o reflexionar
- Ejecutar acciones desde el chat: crear tareas, iniciar focus mode, marcar tareas completadas
- Recibir sugerencias proactivas (cards destacadas + mensajes + badge en botón)
- Ver alertas de procrastinación con mensaje empático y contexto de la tarea evitada
- Responder check-in matutino ("¿Cuál es tu prioridad #1 hoy?")
- Completar reflexión vespertina ("¿Qué lograste? ¿Qué aprendiste?")

## Design Decisions

- Right-side sliding panel (not full page navigation)
- Proactive suggestions appear at top, above chat history
- Quick action buttons below AI responses for common actions
- Badge on floating button shows unread suggestion count
- Typing indicator shows when AI is responding

## Data Used

**Entities:** Message, ProactiveSuggestion, CoachState

**From global model:** CoachInteraction, references Task and Goal

## Visual Reference

See `screenshot.png` for the target UI design (if available).

## Components Provided

- `AICoachPanel.tsx` — Main panel with header, suggestions, chat, input
- `ChatMessage.tsx` — Individual message bubble (user or AI)
- `ProactiveSuggestionCard.tsx` — Suggestion card with actions

## Callback Props

| Callback | Description |
|----------|-------------|
| `onSendMessage` | Called when user sends a message |
| `onQuickAction` | Called when user clicks quick action button |
| `onSuggestionAction` | Called when user clicks suggestion action |
| `onDismissSuggestion` | Called when user dismisses suggestion |
| `onOpen` | Called when panel opens |
| `onClose` | Called when panel closes |
