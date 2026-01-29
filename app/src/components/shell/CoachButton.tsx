'use client'

import { Bot } from 'lucide-react'

interface CoachButtonProps {
  unreadCount?: number
  onClick?: () => void
}

export function CoachButton({ unreadCount = 0, onClick }: CoachButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        bg-violet-600 hover:bg-violet-700
        text-white shadow-lg hover:shadow-xl
        flex items-center justify-center
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
      "
      title="Abrir AI Coach"
    >
      <Bot size={24} />
      {unreadCount > 0 && (
        <span className="
          absolute -top-1 -right-1
          min-w-[20px] h-5 px-1.5
          bg-amber-500 text-white text-xs font-bold
          rounded-full flex items-center justify-center
        ">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  )
}
