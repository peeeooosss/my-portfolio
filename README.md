# Piyush Bhuyan — Portfolio v2.0

> Freelance AI Systems Engineer & LLM Evaluator — Personal portfolio with gamification, interactive terminal, floating chatbot, and particle effects.

**Live:** [View Portfolio](https://peeeooosss.netlify.app)

---

## What's Inside

- **Interactive Terminal** — Type real commands (`whoami`, `projects`, `sudo hire-me`) to explore the portfolio
- **Floating Chatbot** — Ask about skills, experience, hobbies, projects, or how to get in touch
- **Particle Background** — Canvas-based particles that react to mouse movement with connecting lines
- **Typing Animation** — Hero title cycles through roles automatically
- **Gamification System** — XP bar, level-up system, achievement unlocks as you scroll, and a hidden Konami code
- **Hobbies Section** — Choreography, Music Production, and Travel with animated cards and hover-reveal fun facts
- **Smooth Animations** — Staggered reveals, magnetic hover effects, spring physics on cards
- **Custom Cursor** — Dual-layer cursor with glow trail (desktop only)

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 18 |
| Build | Vite 6 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion 11 |
| Icons | Lucide React |
| Deploy | Netlify |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── main.jsx                         # Entry point
├── App.jsx                          # Root component with gamification logic
├── index.css                        # Tailwind + global styles
├── data/
│   ├── constants.js                 # Colors, nav links, education, terminal help
│   ├── skills.js                    # Skill categories & icons
│   ├── experience.js                # Work history
│   ├── quests.js                    # Freelance highlights
│   ├── projects.js                  # Live projects
│   ├── achievements.js              # Gamification achievements & stats
│   ├── hobbies.js                   # Personal interests
│   └── chatbot.js                   # Chatbot knowledge base
├── components/
│   ├── layout/                      # Navbar, Footer, CustomCursor
│   ├── sections/                    # Hero, Terminal, About, Skills, Experience,
│   │                                # Quests, Projects, Education, Hobbies, Contact
│   ├── ui/                          # SectionLabel, RevealSection, RarityTag, StatCard
│   ├── effects/                     # ParticleField (canvas)
│   ├── gamification/                # XPHud, AchievementToast, KonamiOverlay
│   └── chatbot/                     # ChatBot floating widget
└── hooks/
    └── useFinePointer.js            # Detect fine pointer devices
```

## Chatbot Commands

The floating chatbot understands these topics:

| Ask about | Example phrases |
|-----------|-----------------|
| Identity | "who are you", "tell me about yourself" |
| Skills | "what can you do", "tech stack" |
| Experience | "work history", "where do you work" |
| Projects | "what have you built", "portfolio" |
| Hobbies | "what do you do for fun", "interests" |
| Education | "university", "degree" |
| Contact | "email", "hire me", "freelance" |
| Certifications | "certifications", "AWS", "Google" |

## Terminal Commands

Open the terminal section and try:

```
whoami          about           skills
experience      quests          projects
hobbies         education       contact
sudo hire-me    cd hobbies      ls
```

## Deployment

Connected to Netlify — pushes to `main` trigger automatic deploys.

```bash
# Manual deploy
npm run build
# Upload the dist/ folder to Netlify
```

## Easter Egg

Try the Konami Code: `↑ ↑ ↓ ↓ ← → ← → B A`

---

Built with React, Tailwind, and Framer Motion.
