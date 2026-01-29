import { Bot, Sparkles } from 'lucide-react'

interface CoachButtonProps {
  onClick?: () => void
}

export function CoachButton({ onClick }: CoachButtonProps) {
  return (
    <div className="fixed bottom-8 right-8 z-40 group">
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
        <div className="bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-2xl shadow-xl whitespace-nowrap border border-white/10">
          ¿En qué puedo ayudarte?
        </div>
      </div>

      <button
        onClick={onClick}
        className="
          relative w-16 h-16 rounded-[2rem]
          bg-gradient-to-br from-violet-600 to-violet-800
          text-white
          shadow-2xl shadow-violet-600/40
          flex items-center justify-center
          transition-all duration-500
          hover:scale-110 hover:-rotate-6 hover:rounded-2xl
          active:scale-90
          focus:outline-none focus:ring-4 focus:ring-violet-500/20
          animate-in zoom-in-50 duration-500
        "
        aria-label="Hablar con AI Coach"
      >
        <div className="relative">
          <Bot className="w-7 h-7" />
          <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-amber-300 animate-pulse fill-current" />
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-[2rem] bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
      </button>

      {/* Unread indicator */}
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 border-4 border-slate-50 dark:border-slate-950 rounded-full animate-bounce" />
    </div>
  )
}
