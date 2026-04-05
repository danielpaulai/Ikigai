/**
 * Default: Sonnet for chat (quality + voice) and for JSON generation.
 * Set ANTHROPIC_MODEL_CHAT=claude-haiku-4-5 only when cost/volume forces it.
 * @see https://docs.anthropic.com/en/docs/about-claude/models
 */
export const ANTHROPIC_MODEL_CHAT =
  process.env.ANTHROPIC_MODEL_CHAT?.trim() || 'claude-sonnet-4-5'

export const ANTHROPIC_MODEL_GENERATE =
  process.env.ANTHROPIC_MODEL_GENERATE?.trim() || 'claude-sonnet-4-5'
