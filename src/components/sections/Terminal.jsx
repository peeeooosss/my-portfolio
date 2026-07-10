import { useState, useEffect, useRef } from "react";
import { SKILL_CATEGORIES } from "../../data/skills";
import { EXPERIENCE } from "../../data/experience";
import { QUESTS } from "../../data/quests";
import { PROJECTS } from "../../data/projects";
import { EDUCATION, TERMINAL_HELP, COLORS } from "../../data/constants";
import { HOBBIES } from "../../data/hobbies";
import RevealSection from "../ui/RevealSection";
import SectionLabel from "../ui/SectionLabel";

function TerminalConsole({ scrollTo }) {
  const [history, setHistory] = useState([
    { type: "output", text: "piyush@bhuyan:~$ welcome to the interactive shell." },
    { type: "output", text: "type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const print = (lines) => setHistory((h) => [...h, ...lines.map((text) => ({ type: "output", text }))]);

  const runCommand = (raw) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setHistory((h) => [...h, { type: "input", text: cmd }]);
    const [base, ...rest] = cmd.split(" ");
    const arg = rest.join(" ").trim().toLowerCase();

    switch (base.toLowerCase()) {
      case "help":
        print(TERMINAL_HELP);
        break;
      case "whoami":
        print(["Piyush Bhuyan — Freelance AI Systems Engineer & LLM Evaluator,", "based in Guwahati, Assam, India."]);
        break;
      case "about":
        print([
          "Results-driven AI Engineer and Systems Architect specializing in LLM",
          "orchestration, scalable backend architectures, and advanced data analytics.",
          "Founding AI Engineer & Tech Lead at NITAI GROUP.",
        ]);
        break;
      case "skills":
        print(SKILL_CATEGORIES.map((c) => `  ${c.title} — ${c.tier}`));
        break;
      case "experience":
        print(EXPERIENCE.map((e) => `  ${e.role} @ ${e.org} (${e.period})`));
        break;
      case "quests":
        print(QUESTS.map((q) => `  ${q.title} — ${q.role}`));
        break;
      case "projects":
        print(PROJECTS.map((p) => `  ${p.title} → ${p.link}`));
        break;
      case "hobbies":
        print(HOBBIES.map((h) => `  ${h.title} — ${h.tags.join(", ")}`));
        break;
      case "education":
        print([`  ${EDUCATION.school}`, `  ${EDUCATION.degree}, ${EDUCATION.period}`]);
        break;
      case "contact":
        print(["  email: piyushbhuyan001@gmail.com", "  location: Guwahati, Assam, India"]);
        break;
      case "sudo":
        if (arg === "hire-me") {
          print(["permission granted.", "opening mail client..."]);
          setTimeout(() => {
            window.location.href = "mailto:piyushbhuyan001@gmail.com?subject=Let's build something";
          }, 700);
        } else {
          print([`sudo: ${arg || "..."}: command not found`]);
        }
        break;
      case "cd": {
        const target = arg.replace(/^\.?\/?/, "").replace(/\/$/, "");
        const valid = ["about", "skills", "experience", "quests", "projects", "hobbies", "education", "contact", "top"];
        if (valid.includes(target)) {
          print([`navigating to ./${target}`]);
          scrollTo(target);
        } else {
          print([`cd: ${arg || "?"}: no such directory`]);
        }
        break;
      }
      case "ls":
        print(["about.md  skills/  experience/  quests/  projects/  hobbies/  education.md  contact.json"]);
        break;
      case "date":
        print([new Date().toDateString()]);
        break;
      case "echo":
        print([rest.join(" ")]);
        break;
      case "clear":
        setHistory([]);
        return;
      case "konami":
        print(["psst... try: ↑ ↑ ↓ ↓ ← → ← → b a"]);
        break;
      default:
        print([`command not found: ${base}. type 'help' for a list of commands.`]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
  };

  return (
    <div
      data-cursor-hover
      style={{ background: "#000000", border: `1px solid ${COLORS.border}`, borderRadius: 14, overflow: "hidden" }}
      onClick={() => document.getElementById("terminal-input")?.focus()}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}`, background: COLORS.surface }}>
        <span style={{ width: 9, height: 9, borderRadius: 9999, background: "#ff5f56" }} />
        <span style={{ width: 9, height: 9, borderRadius: 9999, background: "#ffbd2e" }} />
        <span style={{ width: 9, height: 9, borderRadius: 9999, background: "#27c93f" }} />
        <span style={{ marginLeft: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: COLORS.textTertiary }}>
          piyush@bhuyan: ~
        </span>
      </div>
      <div ref={scrollRef} style={{ height: 260, overflowY: "auto", padding: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 1.7 }}>
        {history.map((line, i) => (
          <div key={i} style={{ color: line.type === "input" ? COLORS.blue : COLORS.textSecondary, whiteSpace: "pre-wrap" }}>
            {line.type === "input" ? `$ ${line.text}` : line.text}
          </div>
        ))}
        <form onSubmit={onSubmit} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: COLORS.blue }}>$</span>
          <input
            id="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            spellCheck="false"
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: COLORS.textPrimary, fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}
            placeholder="type a command... try 'help'"
          />
        </form>
      </div>
    </div>
  );
}

export default function TerminalSection({ scrollTo, onEnter }) {
  return (
    <RevealSection id="terminal" onEnter={onEnter} className="relative max-w-6xl mx-auto px-6 sm:px-8 py-16 sm:py-20 scroll-mt-20">
      <SectionLabel text="./run interactive-shell" />
      <p className="mt-4 mb-6 text-sm max-w-2xl" style={{ color: COLORS.textSecondary }}>
        This site has a working shell. Poke around — try <code style={{ color: COLORS.blue }}>whoami</code>,{" "}
        <code style={{ color: COLORS.blue }}>projects</code>, or <code style={{ color: COLORS.blue }}>sudo hire-me</code>.
      </p>
      <TerminalConsole scrollTo={scrollTo} />
    </RevealSection>
  );
}
