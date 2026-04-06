'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Copy, Check, Zap, Wrench, User, ChevronDown, ChevronUp, Clock, Repeat } from 'lucide-react'
import type { SkillsRoadmap as SkillsRoadmapType } from '@/lib/types'
import SkillsPriorityMatrix from './SkillsPriorityMatrix'

interface SkillsRoadmapProps {
  roadmap: SkillsRoadmapType
}

const CATEGORY_CONFIG = {
  build_skill: {
    label: 'Build a Claude Skill',
    icon: Bot,
    bg: 'bg-brand-plum',
    text: 'text-white',
    dot: 'bg-brand-pink',
  },
  existing_tool: {
    label: 'Use Existing Claude Tool',
    icon: Wrench,
    bg: 'bg-brand-plum/15',
    text: 'text-brand-plum',
    dot: 'bg-brand-plum/40',
  },
  stays_with_you: {
    label: 'Stays in Your Zone',
    icon: User,
    bg: 'bg-brand-pink/15',
    text: 'text-brand-pink-2',
    dot: 'bg-brand-pink-2',
  },
} as const

const PRIORITY_LABELS = {
  build_first: { label: 'Build First', color: 'bg-brand-plum text-white' },
  quick_win: { label: 'Quick Win', color: 'bg-brand-pink-2 text-white' },
  consider: { label: 'Consider', color: 'bg-brand-plum/15 text-brand-plum' },
  skip: { label: 'Later', color: 'bg-brand-plum/5 text-brand-plum/40' },
} as const

export default function SkillsRoadmap({ roadmap }: SkillsRoadmapProps) {
  const [expandedSkill, setExpandedSkill] = useState<number | null>(0)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [copiedPrompt, setCopiedPrompt] = useState(false)

  const { handoffTasks, claudeSkills, postSessionPrompt } = roadmap

  const buildSkillTasks = handoffTasks.filter((t) => t.category === 'build_skill')
  const existingToolTasks = handoffTasks.filter((t) => t.category === 'existing_tool')
  const staysWithYouTasks = handoffTasks.filter((t) => t.category === 'stays_with_you')

  const copyToClipboard = async (text: string, index?: number) => {
    try {
      await navigator.clipboard.writeText(text)
      if (index !== undefined) {
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 2000)
      } else {
        setCopiedPrompt(true)
        setTimeout(() => setCopiedPrompt(false), 2000)
      }
    } catch { /* optional */ }
  }

  const sortedSkills = [...claudeSkills].sort((a, b) => {
    const order = { build_first: 0, quick_win: 1, consider: 2, skip: 3 }
    return (order[a.priority] ?? 3) - (order[b.priority] ?? 3)
  })

  return (
    <div className="space-y-10">
      {/* Section Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-brand-plum text-brand-pink text-[11px] uppercase tracking-[0.2em] font-bold px-5 py-2 rounded-full mb-4">
          <Bot size={13} />
          Claude Skills Roadmap
        </div>
        <p className="text-brand-plum/50 text-base max-w-md mx-auto leading-relaxed">
          Your Ikigai revealed your zone. Here is everything outside it and the
          Claude Skills that handle it for you.
        </p>
      </div>

      {/* Task Categorizer */}
      <div>
        <p className="text-brand-plum/40 text-xs uppercase tracking-[0.25em] text-center font-bold mb-5">
          Your Handoff List
        </p>
        <div className="space-y-3">
          {[
            { tasks: buildSkillTasks, config: CATEGORY_CONFIG.build_skill },
            { tasks: existingToolTasks, config: CATEGORY_CONFIG.existing_tool },
            { tasks: staysWithYouTasks, config: CATEGORY_CONFIG.stays_with_you },
          ].map(({ tasks, config }) => {
            if (tasks.length === 0) return null
            const Icon = config.icon
            return (
              <div key={config.label} className="rounded-2xl border border-brand-pink/10 overflow-hidden">
                <div className={`${config.bg} px-4 py-2.5 flex items-center gap-2`}>
                  <Icon size={13} className={config.text} />
                  <span className={`text-xs font-bold ${config.text}`}>{config.label}</span>
                  <span className={`ml-auto text-[10px] font-medium ${config.text} opacity-60`}>
                    {tasks.length} task{tasks.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="divide-y divide-brand-pink/8">
                  {tasks.map((t, i) => (
                    <div key={i} className="px-4 py-3 bg-white/60">
                      <div className="flex items-start gap-2.5">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${config.dot}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-brand-plum text-base font-medium">{t.task}</p>
                          <p className="text-brand-plum/45 text-sm mt-1 leading-relaxed">{t.reason}</p>
                          <div className="flex gap-2 mt-1.5">
                            <span className="inline-flex items-center gap-1 text-[9px] text-brand-plum/35">
                              <Clock size={9} /> {t.timeCost === 'high' ? 'High time' : 'Low time'}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[9px] text-brand-plum/35">
                              <Repeat size={9} /> {t.repetition === 'high' ? 'Weekly+' : 'Occasional'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Priority Matrix */}
      {handoffTasks.length > 0 && (
        <div>
          <p className="text-brand-plum/40 text-xs uppercase tracking-[0.25em] text-center font-bold mb-5">
            Skills Priority Matrix
          </p>
          <SkillsPriorityMatrix tasks={handoffTasks} />
        </div>
      )}

      {/* Claude Skills Stack */}
      {sortedSkills.length > 0 && (
        <div>
          <p className="text-brand-plum/40 text-xs uppercase tracking-[0.25em] text-center font-bold mb-5">
            Your Claude Skills Stack
          </p>
          <div className="space-y-3">
            {sortedSkills.map((skill, i) => {
              const isExpanded = expandedSkill === i
              const priorityConfig = PRIORITY_LABELS[skill.priority] || PRIORITY_LABELS.consider
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-2xl border border-brand-pink/15 bg-white/70 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedSkill(isExpanded ? null : i)}
                    className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-brand-cream/30 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-brand-plum flex items-center justify-center shrink-0">
                      <Bot size={16} className="text-brand-pink" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-brand-plum font-medium text-sm truncate">{skill.skillName}</span>
                        <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full shrink-0 ${priorityConfig.color}`}>
                          {priorityConfig.label}
                        </span>
                      </div>
                      <p className="text-brand-plum/45 text-xs truncate">{skill.description}</p>
                    </div>
                    {isExpanded ? (
                      <ChevronUp size={16} className="text-brand-plum/30 shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-brand-plum/30 shrink-0" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 space-y-5 border-t border-brand-pink/10 pt-4">
                          {/* Meta row */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-brand-cream-2 rounded-xl p-4">
                              <p className="text-[10px] uppercase tracking-widest text-brand-plum/30 font-bold mb-1.5">Who Uses It</p>
                              <p className="text-brand-plum/70 text-sm">{skill.whoUsesIt}</p>
                            </div>
                            <div className="bg-brand-cream-2 rounded-xl p-4">
                              <p className="text-[10px] uppercase tracking-widest text-brand-plum/30 font-bold mb-1.5">Time Saved</p>
                              <p className="text-brand-plum/70 text-sm font-medium">{skill.timeSavedPerWeek}/week</p>
                            </div>
                          </div>

                          {/* Replaces */}
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-brand-plum/30 font-bold mb-1.5">Replaces</p>
                            <p className="text-brand-plum/55 text-sm">{skill.originalTask}</p>
                          </div>

                          {/* What to Tell Claude */}
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-brand-plum/30 font-bold mb-1.5">What to Tell Claude</p>
                            <p className="text-brand-plum/65 text-base leading-relaxed italic">
                              &ldquo;{skill.whatToTellClaude}&rdquo;
                            </p>
                          </div>

                          {/* Starter Prompt */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-[10px] uppercase tracking-widest text-brand-plum/30 font-bold">
                                Starter Prompt — Paste into Claude
                              </p>
                              <button
                                type="button"
                                onClick={() => void copyToClipboard(skill.starterPrompt, i)}
                                className="inline-flex items-center gap-1 text-[10px] text-brand-pink-2 hover:text-brand-plum transition-colors font-medium"
                              >
                                {copiedIndex === i ? <Check size={11} /> : <Copy size={11} />}
                                {copiedIndex === i ? 'Copied' : 'Copy'}
                              </button>
                            </div>
                            <div className="bg-brand-plum rounded-xl p-5">
                              <pre className="text-brand-pink/80 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                                {skill.starterPrompt}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Post-Session Prompt Template */}
      {postSessionPrompt && (
        <div>
          <p className="text-brand-plum/40 text-xs uppercase tracking-[0.25em] text-center font-bold mb-3">
            Take-Home Prompt
          </p>
          <p className="text-brand-plum/45 text-sm text-center mb-4 max-w-sm mx-auto">
            Paste this into Claude after the session. Speak it through Wispr Flow or type it. Claude builds your full Skills stack.
          </p>
          <div className="relative bg-brand-plum rounded-2xl p-5">
            <button
              type="button"
              onClick={() => void copyToClipboard(postSessionPrompt)}
              className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] text-brand-pink/60 hover:text-brand-pink transition-colors font-medium bg-white/10 px-2.5 py-1 rounded-lg"
            >
              {copiedPrompt ? <Check size={11} /> : <Copy size={11} />}
              {copiedPrompt ? 'Copied' : 'Copy Prompt'}
            </button>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={12} className="text-brand-pink" />
              <span className="text-brand-pink/60 text-[9px] uppercase tracking-widest font-bold">
                Ready-to-Use Prompt
              </span>
            </div>
            <p className="text-brand-pink/75 text-base leading-relaxed">{postSessionPrompt}</p>
          </div>
        </div>
      )}
    </div>
  )
}
