export const CHATBOT_KB = [
  {
    triggers: ["who are you", "who", "about you", "tell me about yourself", "introduce", "hello", "hi", "hey"],
    response:
      "Hey! I'm Piyush Bhuyan — a Freelance AI Systems Engineer & LLM Evaluator based in Guwahati, Assam, India. I'm currently the Founding AI Engineer & Tech Lead at NITAI GROUP, building AI-powered teaching tools and scalable backend architectures. I'm also an IIT Patna graduate in Computer Science & Data Analytics.",
  },
  {
    triggers: ["skills", "what can you do", "tech stack", "technologies", "tools"],
    response:
      "My core skills span four domains:\n\n🤖 AI & LLM — Llama-3.3-70b, Groq API, Prompt Engineering (RTCF), Computer Vision\n⚙️ Backend — REST APIs, Hono, Drizzle ORM, Neon Postgres, Node.js, Zero Trust\n🎨 Frontend — React SPA, Next.js, pnpm Workspaces\n🔒 Security — SSO Gateways, JWT, OSINT, Threat Hunting, Malware Analysis",
  },
  {
    triggers: ["experience", "work", "job", "career", "where do you work"],
    response:
      "I've had two major roles:\n\n1️⃣ Founding AI Engineer & Tech Lead @ NITAI GROUP (Jul 2026 — Present) — Built 19 AI tools, migrated architecture, optimized codebase by 44%, architected SSO gateway.\n\n2️⃣ Cyber Security Analyst & IT Trainer @ Vault-Tec Security & Bhawani Marketing (May 2025 — Jun 2026) — SIEM analysis, OSINT investigations, security training.",
  },
  {
    triggers: ["projects", "portfolio", "what have you built"],
    response:
      "Here are my featured projects:\n\n🚀 AURA AI — AI product studio & tech partner → tryauraai.in\n🍽️ Tablely — Restaurant QR menus & WhatsApp POS → tablely.tryauraai.in\n🎶 CYPHR — Underground artist platform & event battles → joincyphr.in\n📄 AURA Resume — AI resume optimizer & job matcher → aura-resume-pied.vercel.app\n👟 HypeThrift — Thrift auction marketplace → hypethrift.vercel.app\n🎓 Orion Education — College admissions platform → orion-nine-eta.vercel.app\n🚗 Apex Drive — Car rental platform → apexdriveghy.netlify.app",
  },
  {
    triggers: ["hobby", "hobbies", "interests", "what do you do for fun", "outside work", "personal"],
    response:
      "Outside of code, I'm a multi-faceted creative:\n\n💃 Choreography — Stage performances, freestyle, Bollywood & Hip-Hop\n🎵 Music Production — Beat making, sound design, mixing in FL Studio\n✈️ Travel — Mountain trails, street food exploration, backpacking across India",
  },
  {
    triggers: ["education", "university", "college", "study", "degree"],
    response:
      "I graduated from the Indian Institute of Technology (IIT), Patna with a Bachelor's in Computer Science and Data Analytics — Class of 2026. One of the most rigorous and rewarding experiences of my life!",
  },
  {
    triggers: ["contact", "email", "reach", "hire", "freelance"],
    response:
      "You can reach me at:\n\n📧 piyushbhuyan001@gmail.com\n📍 Guwahati, Assam, India\n\nI'm open to freelance engagements in LLM orchestration, AI tooling, and full-stack systems architecture. Just click the email button or type 'sudo hire-me' in the terminal!",
  },
  {
    triggers: ["achievements", "stats", "numbers", "impact"],
    response:
      "Here's my impact in numbers:\n\n✨ 19 AI Tools shipped (Groq-powered)\n📉 44% codebase optimization (1.1GB → 621MB)\n🛡️ 5 Critical vulnerabilities resolved\n📚 90 Curriculum modules designed for AI Academy",
  },
  {
    triggers: ["certifications", "cert", "certified"],
    response:
      "I hold multiple certifications:\n\n🛡️ Google Cybersecurity Professional Certificate\n☁️ AWS Cloud Practitioner Essentials\n🌐 Network Security, Cloud Security, Linux, Python, SQL & Java certifications\n\nI also have hands-on experience with OSINT, threat hunting, and malware analysis.",
  },
];

export const CHATBOT_FALLBACK =
  "Hmm, I'm not sure about that one! Try asking about my skills, experience, projects, hobbies, education, or how to contact me. Type 'help' for a list of topics.";

export const CHATBOT_HELP = "You can ask me about: whoami, skills, experience, projects, hobbies, education, certifications, achievements, contact";
