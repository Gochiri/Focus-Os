import { useState } from 'react'
import { Filter, ChevronDown, X, LayoutList, CalendarDays } from 'lucide-react'
import type { Project, Tag } from '@/../product/sections/tasks-and-priorities/types'

interface TaskFiltersProps {
  projects: Project[]
  tags: Tag[]
  selectedProjectId: string | null
  selectedTagIds: string[]
  currentView: 'priority' | 'calendar'
  onFilterByProject?: (projectId: string | null) => void
  onFilterByTags?: (tagIds: string[]) => void
  onChangeView?: (view: 'priority' | 'calendar') => void
}

export function TaskFilters({
  projects,
  tags,
  selectedProjectId,
  selectedTagIds,
  currentView,
  onFilterByProject,
  onFilterByTags,
  onChangeView,
}: TaskFiltersProps) {
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false)
  const [tagsDropdownOpen, setTagsDropdownOpen] = useState(false)

  const selectedProject = projects.find(p => p.id === selectedProjectId)
  const hasFilters = selectedProjectId || selectedTagIds.length > 0

  const toggleTag = (tagId: string) => {
    if (selectedTagIds.includes(tagId)) {
      onFilterByTags?.(selectedTagIds.filter(id => id !== tagId))
    } else {
      onFilterByTags?.([...selectedTagIds, tagId])
    }
  }

  const clearFilters = () => {
    onFilterByProject?.(null)
    onFilterByTags?.([])
  }

  const tagColorMap: Record<string, string> = {
    red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800',
    slate: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600',
    green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
    orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800',
  }

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      {/* Left side: Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-slate-400" />

        {/* Project filter */}
        <div className="relative">
          <button
            onClick={() => { setProjectDropdownOpen(!projectDropdownOpen); setTagsDropdownOpen(false) }}
            className={`
              inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
              border transition-colors
              ${selectedProjectId
                ? 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
              }
            `}
          >
            <span>{selectedProject?.name || 'Proyecto'}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {projectDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setProjectDropdownOpen(false)}
              />
              <div className="absolute left-0 top-10 z-20 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1">
                <button
                  onClick={() => { onFilterByProject?.(null); setProjectDropdownOpen(false) }}
                  className={`
                    w-full text-left px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700
                    ${!selectedProjectId ? 'text-violet-600 dark:text-violet-400 font-medium' : 'text-slate-700 dark:text-slate-300'}
                  `}
                >
                  Todos los proyectos
                </button>
                <div className="border-t border-slate-200 dark:border-slate-700 my-1" />
                {projects.map(project => (
                  <button
                    key={project.id}
                    onClick={() => { onFilterByProject?.(project.id); setProjectDropdownOpen(false) }}
                    className={`
                      w-full text-left px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700
                      ${selectedProjectId === project.id ? 'text-violet-600 dark:text-violet-400 font-medium' : 'text-slate-700 dark:text-slate-300'}
                    `}
                  >
                    {project.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Tags filter */}
        <div className="relative">
          <button
            onClick={() => { setTagsDropdownOpen(!tagsDropdownOpen); setProjectDropdownOpen(false) }}
            className={`
              inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
              border transition-colors
              ${selectedTagIds.length > 0
                ? 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
              }
            `}
          >
            <span>
              {selectedTagIds.length > 0
                ? `${selectedTagIds.length} etiqueta${selectedTagIds.length > 1 ? 's' : ''}`
                : 'Etiquetas'
              }
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {tagsDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setTagsDropdownOpen(false)}
              />
              <div className="absolute left-0 top-10 z-20 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 px-2">
                <p className="px-2 pb-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                  Selecciona etiquetas
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map(tag => (
                    <button
                      key={tag.id}
                      onClick={() => toggleTag(tag.id)}
                      className={`
                        inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium
                        border transition-all
                        ${selectedTagIds.includes(tag.id)
                          ? `${tagColorMap[tag.color] || tagColorMap.slate} ring-2 ring-violet-500 ring-offset-1 dark:ring-offset-slate-800`
                          : `${tagColorMap[tag.color] || tagColorMap.slate} opacity-60 hover:opacity-100`
                        }
                      `}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Clear filters */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1 px-2 py-1.5 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <X className="w-3.5 h-3.5" />
            Limpiar
          </button>
        )}
      </div>

      {/* Right side: View toggle */}
      <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
        <button
          onClick={() => onChangeView?.('priority')}
          className={`
            inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all
            ${currentView === 'priority'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }
          `}
        >
          <LayoutList className="w-4 h-4" />
          Prioridad
        </button>
        <button
          onClick={() => onChangeView?.('calendar')}
          className={`
            inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all
            ${currentView === 'calendar'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }
          `}
        >
          <CalendarDays className="w-4 h-4" />
          Calendario
        </button>
      </div>
    </div>
  )
}
