/**
 * Questions are grouped by the four Ikigai circles so the session
 * feels like a structured exploration, not a random interview.
 *
 * SHORT = 2 questions per circle = 8 total
 * LONG  = 4–5 questions per circle + 1 synthesis = 18 total
 */

export interface QuestionEntry {
  circle: 'love' | 'skills' | 'world' | 'money' | 'synthesis'
  circleLabel: string
  question: string
}

// ── SHORT (8 questions: 2 per circle) ────────────────────────────

export const SHORT_QUESTIONS: QuestionEntry[] = [
  // Circle 1: What You Love
  {
    circle: 'love',
    circleLabel: 'What You Love',
    question: 'What activities make you completely lose track of time — where hours feel like minutes?',
  },
  {
    circle: 'love',
    circleLabel: 'What You Love',
    question: 'If money were completely irrelevant, what would you spend your days doing?',
  },

  // Circle 2: What You're Good At
  {
    circle: 'skills',
    circleLabel: "What You're Good At",
    question: 'What do people consistently come to you for help with — even people who barely know you?',
  },
  {
    circle: 'skills',
    circleLabel: "What You're Good At",
    question: 'What skill or knowledge do you have that feels rare — something few people can do the way you do?',
  },

  // Circle 3: What the World Needs
  {
    circle: 'world',
    circleLabel: 'What the World Needs',
    question: 'What problem in the world genuinely frustrates or angers you — something you wish someone would just fix?',
  },
  {
    circle: 'world',
    circleLabel: 'What the World Needs',
    question: 'What experience from your own life gave you wisdom that could genuinely help others going through the same thing?',
  },

  // Circle 4: What You Can Be Paid For
  {
    circle: 'money',
    circleLabel: 'What You Can Be Paid For',
    question: 'If someone happily paid you $500 an hour, what would they be paying you for — and why would it be worth it?',
  },
  {
    circle: 'money',
    circleLabel: 'What You Can Be Paid For',
    question: 'What problems are people or companies already spending money to solve that you understand deeply?',
  },
]

// ── LONG (18 questions: 4–5 per circle + 1 synthesis) ────────────

export const LONG_QUESTIONS: QuestionEntry[] = [
  // Circle 1: What You Love (5 questions)
  {
    circle: 'love',
    circleLabel: 'What You Love',
    question: 'What activities make you completely lose track of time — where hours feel like minutes?',
  },
  {
    circle: 'love',
    circleLabel: 'What You Love',
    question: "What topics do you find yourself researching at 2am — not because you have to, but because you can't stop?",
  },
  {
    circle: 'love',
    circleLabel: 'What You Love',
    question: 'As a child, what did you dream of becoming — and what was it about that dream that excited you? Not the job title — the feeling.',
  },
  {
    circle: 'love',
    circleLabel: 'What You Love',
    question: 'Tell me about a moment when you felt truly alive — electric, fully present. What were you doing?',
  },
  {
    circle: 'love',
    circleLabel: 'What You Love',
    question: 'What would you do for free — because you simply could not stop yourself?',
  },

  // Circle 2: What You're Good At (4 questions)
  {
    circle: 'skills',
    circleLabel: "What You're Good At",
    question: 'What do people consistently come to you for help with — even people who barely know you?',
  },
  {
    circle: 'skills',
    circleLabel: "What You're Good At",
    question: 'What comes so naturally to you that you almost forget to call it a skill?',
  },
  {
    circle: 'skills',
    circleLabel: "What You're Good At",
    question: 'What skill or knowledge do you have that feels rare — something few people can do the way you do it?',
  },
  {
    circle: 'skills',
    circleLabel: "What You're Good At",
    question: 'What is the hardest thing you have overcome — and what did it teach you about who you really are?',
  },

  // Circle 3: What the World Needs (4 questions)
  {
    circle: 'world',
    circleLabel: 'What the World Needs',
    question: 'What problem in the world genuinely frustrates or angers you — something you wish someone would just fix?',
  },
  {
    circle: 'world',
    circleLabel: 'What the World Needs',
    question: 'When you see someone struggling, what kind of struggle pulls at your heart the most?',
  },
  {
    circle: 'world',
    circleLabel: 'What the World Needs',
    question: 'What experience from your own life gave you wisdom that could genuinely help others going through the same thing?',
  },
  {
    circle: 'world',
    circleLabel: 'What the World Needs',
    question: 'What topics or ideas do you think the world needs to be talking about more right now?',
  },

  // Circle 4: What You Can Be Paid For (4 questions)
  {
    circle: 'money',
    circleLabel: 'What You Can Be Paid For',
    question: 'If someone happily paid you $500 an hour, what would they be paying you for — and why would it be worth it?',
  },
  {
    circle: 'money',
    circleLabel: 'What You Can Be Paid For',
    question: 'What problems are people or companies already spending money to solve that you understand deeply?',
  },
  {
    circle: 'money',
    circleLabel: 'What You Can Be Paid For',
    question: 'What three values would you never compromise on, even if it cost you comfort, money, or status?',
  },
  {
    circle: 'money',
    circleLabel: 'What You Can Be Paid For',
    question: 'If your life were a book, what chapter are you in right now — and what would the next chapter be called?',
  },

  // Synthesis (1 question)
  {
    circle: 'synthesis',
    circleLabel: 'Putting It All Together',
    question: 'Right now, without overthinking it — what does your gut tell you your purpose might be?',
  },
]

export const QUESTION_LIMITS = {
  short: SHORT_QUESTIONS.length,
  long: LONG_QUESTIONS.length,
}
