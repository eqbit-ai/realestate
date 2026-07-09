import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'

const QUICK_REPLIES = [
  'I want to buy a property',
  'What areas do you cover?',
  'Book a viewing',
]

// Simple keyword-matched scripted responses — replace with a real AI/CRM
// integration when this demo goes to production.
function getBotReply(text) {
  const t = text.toLowerCase()
  if (t.includes('buy') || t.includes('purchase')) {
    return 'Wonderful. Are you looking in a specific area \u2014 Palm Jumeirah, Downtown, Dubai Marina, or Emirates Hills \u2014 or would you like our full portfolio?'
  }
  if (t.includes('area') || t.includes('location') || t.includes('cover')) {
    return 'We specialize in Palm Jumeirah, Downtown Dubai, Dubai Marina, Emirates Hills, Bluewaters Island and Al Barari. Would you like listings from any of these?'
  }
  if (t.includes('view') || t.includes('book') || t.includes('visit')) {
    return 'I can help arrange that. Please share your preferred property and a few time slots in the contact form below, and an advisor will confirm within a day.'
  }
  if (t.includes('price') || t.includes('cost') || t.includes('budget')) {
    return 'Our current portfolio ranges from AED 6M to AED 38M. Let me know your budget and I can point you to a fitting shortlist.'
  }
  if (t.includes('sell') || t.includes('selling')) {
    return 'We offer discreet, white-glove private sales. Fill in the contact form and mention "Selling" as your interest \u2014 an advisor will reach out directly.'
  }
  if (t.includes('thank')) {
    return 'You\u2019re very welcome. Is there anything else I can help you with?'
  }
  return 'Thanks for reaching out \u2014 one of our advisors can help with that in detail. Would you like to leave your contact details below?'
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 'greet',
      from: 'bot',
      text: 'Marhaba! I\u2019m the AURELIA concierge. How can I help with your Dubai property search today?',
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing, open])

  const send = (text) => {
    const clean = text.trim()
    if (!clean) return
    setMessages((m) => [...m, { id: Date.now(), from: 'user', text: clean }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, from: 'bot', text: getBotReply(clean) },
      ])
    }, 900 + Math.random() * 500)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 w-[calc(100vw-3rem)] sm:w-[380px] h-[520px] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-sand-dark/60 flex flex-col overflow-hidden"
          >
            <div className="bg-navy px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-ivory font-display text-lg leading-none">
                  AURELIA Concierge
                </p>
                <p className="text-brass-light text-xs mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Online now
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-ivory/80 hover:text-ivory"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-ivory">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'bg-navy text-ivory rounded-br-sm'
                        : 'bg-white border border-sand-dark/60 text-charcoal rounded-bl-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white border border-sand-dark/60 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full bg-brass"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {messages.length < 3 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-brass/40 text-navy hover:bg-brass hover:text-navy hover:border-brass transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="border-t border-sand-dark/60 p-3 flex items-center gap-2 bg-white"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 text-sm px-4 py-2.5 rounded-full border border-sand-dark outline-none focus:border-brass transition-colors"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="w-10 h-10 shrink-0 rounded-full bg-navy hover:bg-brass flex items-center justify-center transition-colors"
              >
                <Send size={16} className="text-ivory" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="w-16 h-16 rounded-full bg-brass shadow-xl flex items-center justify-center relative"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} className="text-navy" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, rotate: 45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -45 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={24} className="text-navy" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-brass"
            animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </motion.button>
    </div>
  )
}
