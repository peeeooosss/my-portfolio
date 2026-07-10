import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { COLORS } from "../../data/constants";
import { CHATBOT_KB, CHATBOT_FALLBACK, CHATBOT_HELP } from "../../data/chatbot";

function findResponse(input) {
  const lower = input.toLowerCase().trim();
  if (lower === "help" || lower === "?") return CHATBOT_HELP;
  for (const entry of CHATBOT_KB) {
    if (entry.triggers.some((t) => lower.includes(t))) return entry.response;
  }
  return CHATBOT_FALLBACK;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hey there! I'm Piyush's virtual assistant. Ask me anything about his skills, experience, projects, hobbies, or how to get in touch!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const send = (text) => {
    if (!text.trim()) return;
    const userMsg = { from: "user", text: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);

    const response = findResponse(text);
    const words = response.split(" ");
    let built = "";
    let idx = 0;

    const typeInterval = setInterval(() => {
      if (idx < words.length) {
        built += (idx === 0 ? "" : " ") + words[idx];
        setMessages((m) => {
          const last = m[m.length - 1];
          if (last && last.from === "bot" && last.typing) {
            return [...m.slice(0, -1), { from: "bot", text: built, typing: true }];
          }
          return [...m, { from: "bot", text: built, typing: true }];
        });
        idx++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setMessages((m) => {
          const last = m[m.length - 1];
          if (last && last.from === "bot" && last.typing) {
            return [...m.slice(0, -1), { from: "bot", text: built }];
          }
          return m;
        });
      }
    }, 25);

    return () => clearInterval(typeInterval);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  const quickActions = ["Who are you?", "Skills", "Projects", "Hobbies", "Contact"];

  return (
    <>
      {/* Floating button */}
      <motion.button
        data-cursor-hover
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-20 right-5 sm:bottom-5 sm:right-5 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`,
          border: "none",
          boxShadow: `0 8px 30px -8px ${COLORS.purple}88`,
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} color="#fff" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={22} color="#fff" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification ping */}
        {!open && (
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full"
            style={{ background: COLORS.green, border: `2px solid ${COLORS.bg}` }}
          />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-36 right-5 sm:bottom-24 sm:right-5 z-40 w-[340px] sm:w-[380px] rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              boxShadow: `0 20px 60px -20px rgba(0,0,0,0.6)`,
              maxHeight: "70vh",
            }}
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center gap-3" style={{ borderBottom: `1px solid ${COLORS.border}`, background: COLORS.surfaceAlt }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})` }}>
                <Bot size={16} color="#fff" />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: COLORS.textPrimary }}>Piyush Bot</p>
                <p className="text-xs" style={{ color: COLORS.green }}>Online</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" style={{ minHeight: 280, maxHeight: 400 }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.from === "bot" && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: `${COLORS.blue}22` }}>
                      <Bot size={12} style={{ color: COLORS.blue }} />
                    </div>
                  )}
                  <div
                    className="rounded-xl px-3 py-2 text-sm max-w-[80%]"
                    style={{
                      background: msg.from === "user" ? `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})` : COLORS.surfaceAlt,
                      color: msg.from === "user" ? "#fff" : COLORS.textSecondary,
                      border: msg.from === "user" ? "none" : `1px solid ${COLORS.border}`,
                      whiteSpace: "pre-line",
                      lineHeight: 1.5,
                    }}
                  >
                    {msg.text}
                    {msg.typing && <span className="animate-pulse">|</span>}
                  </div>
                  {msg.from === "user" && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: `${COLORS.purple}22` }}>
                      <User size={12} style={{ color: COLORS.purple }} />
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && messages[messages.length - 1]?.from === "user" && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${COLORS.blue}22` }}>
                    <Bot size={12} style={{ color: COLORS.blue }} />
                  </div>
                  <div className="rounded-xl px-3 py-2" style={{ background: COLORS.surfaceAlt, border: `1px solid ${COLORS.border}` }}>
                    <motion.div className="flex gap-1" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.textTertiary }} />
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.textTertiary }} />
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.textTertiary }} />
                    </motion.div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div className="px-4 py-2 flex flex-wrap gap-1.5" style={{ borderTop: `1px solid ${COLORS.border}` }}>
              {quickActions.map((qa) => (
                <button
                  key={qa}
                  data-cursor-hover
                  onClick={() => send(qa)}
                  className="text-xs px-2.5 py-1 rounded-full transition-colors"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: COLORS.textTertiary,
                    background: COLORS.surfaceAlt,
                    border: `1px solid ${COLORS.border}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = COLORS.blue;
                    e.currentTarget.style.color = COLORS.blue;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = COLORS.border;
                    e.currentTarget.style.color = COLORS.textTertiary;
                  }}
                >
                  {qa}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={onSubmit} className="px-4 py-3 flex gap-2" style={{ borderTop: `1px solid ${COLORS.border}` }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 text-sm rounded-lg px-3 py-2 outline-none"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  background: COLORS.surfaceAlt,
                  color: COLORS.textPrimary,
                  border: `1px solid ${COLORS.border}`,
                }}
                onFocus={(e) => (e.target.style.borderColor = COLORS.blue)}
                onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
              />
              <button
                type="submit"
                data-cursor-hover
                className="p-2 rounded-lg"
                style={{ background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`, border: "none" }}
              >
                <Send size={16} color="#fff" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
