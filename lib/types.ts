export type Mode = 'short' | 'long' | null

export interface Message {
  role: 'assistant' | 'user'
  content: string
  timestamp: number
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
  ninetyDayStep: string
  closingMessage: string
}
