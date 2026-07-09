import React, { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { TESTIMONIALS } from '../data'

export default function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback((n) => {
    setI((prev) => (n + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => goTo(i + 1), 6000)
    return () => clearInterval(t)
  }, [i, paused, goTo])

  const current = TESTIMONIALS[i]

  return (
    <section id="testimonials" className="relative bg-ivory py-28 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <span className="uppercase text-xs tracking-widest2 text-brass font-semibold">
          Client Voices
        </span>
        <h2 className="font-display text-4xl sm:text-5xl text-navy mt-4 mb-16 leading-tight">
          Trusted by discerning owners.
        </h2>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative min-h-[260px] flex flex-col items-center justify-center"
        >
          <Quote className="text-brass/40 mb-6" size={40} strokeWidth={1.4} />
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-display text-2xl sm:text-3xl text-navy leading-snug text-balance">
                &ldquo;{current.quote}&rdquo;
              </p>
              <div className="mt-8">
                <p className="text-navy font-semibold text-sm">{current.name}</p>
                <p className="text-charcoal/60 text-xs mt-1">{current.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={() => goTo(i - 1)}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full border border-sand-dark flex items-center justify-center text-navy hover:bg-navy hover:text-ivory hover:border-navy transition-colors duration-300"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => goTo(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === i ? 'w-8 bg-brass' : 'w-1.5 bg-sand-dark'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => goTo(i + 1)}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full border border-sand-dark flex items-center justify-center text-navy hover:bg-navy hover:text-ivory hover:border-navy transition-colors duration-300"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
