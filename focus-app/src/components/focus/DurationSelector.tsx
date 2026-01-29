import { useState } from 'react'
import { Clock, Sparkles, Coffee, ChevronDown } from 'lucide-react'
import type { DurationPreset } from '../../types'

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
        <div className="space-y-6">
            {/* AI Recommendation */}
            {recommendedPreset && (
                <div className="p-5 bg-gradient-to-r from-violet-600/10 to-purple-600/10 dark:from-violet-600/20 dark:to-purple-600/20 border border-violet-200 dark:border-violet-800/50 rounded-2xl shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="p-2.5 bg-violet-600 rounded-xl shadow-lg shadow-violet-500/20">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-violet-900 dark:text-violet-100 font-heading uppercase tracking-wider">
                                Recomendación de IA
                            </p>
                            <p className="text-sm text-violet-700/80 dark:text-violet-300/80 mt-1 font-medium italic">
                                "{recommendedPreset.aiReason}"
                            </p>
                            <button
                                onClick={() => onSelectPreset?.(recommendedPreset)}
                                className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-md shadow-violet-500/20 active:scale-95"
                            >
                                Usar {recommendedPreset.minutes} min + {recommendedPreset.breakMinutes} min descanso
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Preset buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {presets.map((preset) => {
                    const isSelected = selectedMinutes === preset.minutes && selectedBreakMinutes === preset.breakMinutes
                    return (
                        <button
                            key={preset.id}
                            onClick={() => onSelectPreset?.(preset)}
                            className={`
                relative p-5 rounded-2xl border-2 transition-all duration-300 text-left group
                ${isSelected
                                    ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20 shadow-lg shadow-violet-500/10'
                                    : 'border-slate-100 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-700 bg-white dark:bg-slate-900 shadow-sm'
                                }
              `}
                        >
                            {preset.isRecommended && !isSelected && (
                                <span className="absolute -top-2.5 -right-1 px-2 py-0.5 bg-amber-500 text-white text-[9px] font-black uppercase rounded-lg shadow-sm z-10">
                                    Ideal
                                </span>
                            )}
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className={`w-4 h-4 transition-colors ${isSelected ? 'text-violet-600 dark:text-violet-400' : 'text-slate-400 group-hover:text-violet-400'}`} />
                                <span className={`text-2xl font-black font-heading tracking-tighter ${isSelected ? 'text-violet-600 dark:text-violet-400' : 'text-slate-900 dark:text-slate-100'}`}>
                                    {preset.minutes}
                                </span>
                                <span className="text-xs font-bold uppercase text-slate-400">min</span>
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">{preset.label}</p>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-slate-400 group-hover:text-amber-500 transition-colors">
                                <Coffee className="w-3.5 h-3.5" />
                                <span>{preset.breakMinutes} min descanso</span>
                            </div>
                        </button>
                    )
                })}
            </div>

            {/* Custom duration toggle */}
            <div className="pt-2">
                <button
                    onClick={() => setShowCustom(!showCustom)}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400 transition-all font-heading"
                >
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showCustom ? 'rotate-180' : ''}`} />
                    Duración personalizada
                </button>

                {/* Custom duration inputs */}
                {showCustom && (
                    <div className="mt-4 p-5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700/50 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 mb-2 tracking-widest">
                                    Foco (min)
                                </label>
                                <input
                                    type="number"
                                    value={customMinutes}
                                    onChange={(e) => setCustomMinutes(Number(e.target.value))}
                                    min={5}
                                    max={180}
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-900 border-none rounded-xl text-lg font-bold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-violet-500/20 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 mb-2 tracking-widest">
                                    Descanso (min)
                                </label>
                                <input
                                    type="number"
                                    value={customBreak}
                                    onChange={(e) => setCustomBreak(Number(e.target.value))}
                                    min={1}
                                    max={60}
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-900 border-none rounded-xl text-lg font-bold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-violet-500/20 shadow-sm"
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => onCustomDuration?.(customMinutes, customBreak)}
                            className="w-full py-3 bg-slate-900 dark:bg-slate-700 hover:bg-black dark:hover:bg-slate-600 text-white text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-lg"
                        >
                            Aplicar configuración personalizada
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
