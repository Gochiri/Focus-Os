import { useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { CalendarDay } from '@/../product/sections/focus-mode/types'

interface FocusCalendarProps {
  calendarDays: CalendarDay[]
  selectedDate?: string
  onSelectDay?: (date: string) => void
}

export function FocusCalendar({
  calendarDays,
  selectedDate,
  onSelectDay,
}: FocusCalendarProps) {
  // Create a map for quick lookup
  const dayMap = useMemo(() => {
    const map = new Map<string, CalendarDay>()
    calendarDays.forEach(day => map.set(day.date, day))
    return map
  }, [calendarDays])

  // Generate calendar grid for current month
  const calendarGrid = useMemo(() => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startPadding = firstDay.getDay()

    const days: (Date | null)[] = []

    // Add padding for days before the first of the month
    for (let i = 0; i < startPadding; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }, [])

  const getIntensity = (minutes: number) => {
    if (minutes === 0) return 'bg-slate-100 dark:bg-slate-800'
    if (minutes < 30) return 'bg-violet-100 dark:bg-violet-900/30'
    if (minutes < 60) return 'bg-violet-200 dark:bg-violet-800/40'
    if (minutes < 120) return 'bg-violet-300 dark:bg-violet-700/50'
    return 'bg-violet-500 dark:bg-violet-600'
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const monthName = new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 capitalize">
          {monthName}
        </h3>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-slate-400 dark:text-slate-500 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarGrid.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square" />
          }

          const dateStr = formatDate(date)
          const dayData = dayMap.get(dateStr)
          const isToday = dateStr === formatDate(new Date())
          const isSelected = dateStr === selectedDate
          const hasFocus = dayData && dayData.totalMinutes > 0

          return (
            <button
              key={dateStr}
              onClick={() => onSelectDay?.(dateStr)}
              className={`
                aspect-square rounded-lg flex flex-col items-center justify-center text-xs transition-all
                ${isSelected ? 'ring-2 ring-violet-500 ring-offset-2 dark:ring-offset-slate-900' : ''}
                ${hasFocus ? getIntensity(dayData.totalMinutes) : 'bg-slate-50 dark:bg-slate-800/50'}
                ${isToday ? 'font-bold' : ''}
                hover:scale-105
              `}
            >
              <span className={`
                ${hasFocus && dayData.totalMinutes >= 60 ? 'text-white' : 'text-slate-700 dark:text-slate-300'}
                ${isToday ? 'text-violet-600 dark:text-violet-400' : ''}
              `}>
                {date.getDate()}
              </span>
              {hasFocus && (
                <span className={`
                  text-[10px] mt-0.5
                  ${dayData.totalMinutes >= 60 ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}
                `}>
                  {dayData.totalMinutes}m
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs text-slate-400 dark:text-slate-500">Menos</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded bg-slate-100 dark:bg-slate-800" />
          <div className="w-3 h-3 rounded bg-violet-100 dark:bg-violet-900/30" />
          <div className="w-3 h-3 rounded bg-violet-200 dark:bg-violet-800/40" />
          <div className="w-3 h-3 rounded bg-violet-300 dark:bg-violet-700/50" />
          <div className="w-3 h-3 rounded bg-violet-500 dark:bg-violet-600" />
        </div>
        <span className="text-xs text-slate-400 dark:text-slate-500">Más</span>
      </div>
    </div>
  )
}
