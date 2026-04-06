export type Mode = 'short' | 'long' | null

export interface Message {
  role: 'assistant' | 'user'
  content: string
  timestamp: number
}

export interface HandoffTask {
  task: string
  reason: string
  category: 'build_skill' | 'existing_tool' | 'stays_with_you'
  timeCost: 'high' | 'low'
  repetition: 'high' | 'low'
}

export interface ClaudeSkill {
  skillName: string
  description: string
  whoUsesIt: string
  timeSavedPerWeek: string
  originalTask: string
  whatToTellClaude: string
  starterPrompt: string
  priority: 'build_first' | 'quick_win' | 'consider' | 'skip'
}

export interface SkillsRoadmap {
  handoffTasks: HandoffTask[]
  claudeSkills: ClaudeSkill[]
  postSessionPrompt: string
}

export interface IkigaiResults {
  ikigaiStatement: string
  archetype: {
    name: string
    tagline: string
    description: string
    strengths: string[]
    watchOut: string
  }
  circleKeywords: {
    love: string[]
    skills: string[]
    world: string[]
    money: string[]
  }
  circleInsights: {
    love: string
    skills: string
    mission: string
    profession: string
  }
  monetizationStrategies: Array<{
    title: string
    description: string
    firstOffer: string
    timeToRevenue: string
    incomeRange: string
    icon: string
  }>
  actionSteps: Array<{
    title: string
    description: string
    timeframe: string
  }>
  personalQuote: string
  ninetyDayStep: string
  closingMessage: string
  skillsRoadmap?: SkillsRoadmap
}
