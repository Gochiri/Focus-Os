import { Sparkles } from 'lucide-react'

interface CoachButtonProps {
  onClick?: () => void
}

export function CoachButton({ onClick }: CoachButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-6 right-6 z-40
        w-14 h-14 rounded-full
        bg-violet-600 hover:bg-violet-700
        text-white
        shadow-lg shadow-violet-600/25
        flex items-center justify-center
        transition-all duration-200
        hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
        dark:focus:ring-offset-slate-900
      "
      aria-label="Open AI Coach"
    >
      <Sparkles className="w-6 h-6" />
    </button>
  )
}
