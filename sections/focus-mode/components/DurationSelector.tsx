import { useState } from 'react'
import { Clock, Sparkles, Coffee, ChevronDown } from 'lucide-react'
import type { DurationPreset } from '@/../product/sections/focus-mode/types'

interface DurationSelectorProps {
  presets: DurationPreset[]
  selectedMinutes: number
  selectedBreakMinutes: number
  onSelectPreset?: (preset: DurationPreset) => void
  onCustomDuration?: (minutes: number, breakMinutes: number) => void
}

export function DurationSelector({
  presets,
  selectedMinutes,
  selectedBreakMinutes,
  onSelectPreset,
  onCustomDuration,
}: DurationSelectorProps) {
  const [showCustom, setShowCustom] = useState(false)
  const [customMinutes, setCustomMinutes] = useState(selectedMinutes)
  const [customBreak, setCustomBreak] = useState(selectedBreakMinutes)

  const recommendedPreset = presets.find(p => p.isRecommended)

  return (
    <div className="space-y-4">
      {/* AI Recommendation */}
      {recommendedPreset && (
        <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border border-violet-200 dark:border-violet-800/50 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
              <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-violet-900 dark:text-violet-100">
                Recomendación de IA
              </p>
              <p className="text-xs text-violet-600 dark:text-violet-400 mt-0.5">
                {recommendedPreset.aiReason}
              </p>
              <button
                onClick={() => onSelectPreset?.(recommendedPreset)}
                className="mt-2 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-medium rounded-lg transition-colors"
              >
                Usar {recommendedPreset.minutes} min + {recommendedPreset.breakMinutes} min descanso
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preset buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {presets.map((preset) => {
          const isSelected = selectedMinutes === preset.minutes && selectedBreakMinutes === preset.breakMinutes
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset?.(preset)}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-200 text-left
                ${isSelected
                  ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-600 bg-white dark:bg-slate-900'
                }
              `}
            >
              {preset.isRecommended && (
                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-violet-500 text-white text-xs font-medium rounded-full">
                  IA
                </span>
              )}
              <div className="flex items-center gap-2 mb-2">
                <Clock className={`w-4 h-4 ${isSelected ? 'text-violet-600 dark:text-violet-400' : 'text-slate-400'}`} />
                <span className={`text-lg font-bold ${isSelected ? 'text-violet-600 dark:text-violet-400' : 'text-slate-900 dark:text-slate-100'}`}>
                  {preset.minutes}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">min</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{preset.label}</p>
              <div className="flex items-center gap-1 mt-2 text-xs text-slate-400 dark:text-slate-500">
                <Coffee className="w-3 h-3" />
                <span>{preset.breakMinutes} min descanso</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Custom duration toggle */}
      <button
        onClick={() => setShowCustom(!showCustom)}
        className="flex items-center gap-2 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
      >
        <ChevronDown className={`w-4 h-4 transition-transform ${showCustom ? 'rotate-180' : ''}`} />
        Duración personalizada
      </button>

      {/* Custom duration inputs */}
      {showCustom && (
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                Tiempo de trabajo
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(Number(e.target.value))}
                  min={5}
                  max={180}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-500"
                />
                <span className="text-sm text-slate-500">min</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                Tiempo de descanso
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={customBreak}
                  onChange={(e) => setCustomBreak(Number(e.target.value))}
                  min={1}
                  max={30}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-500"
                />
                <span className="text-sm text-slate-500">min</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onCustomDuration?.(customMinutes, customBreak)}
            className="w-full py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors"
          >
            Aplicar duración personalizada
          </button>
        </div>
      )}
    </div>
  )
}
