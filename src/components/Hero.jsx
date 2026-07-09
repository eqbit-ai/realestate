import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const headline = ['Live', 'Above', 'the', 'Ordinary.']

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-navy"
    >
      {/* Background video with cinematic overlay */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1920&auto=format&fit=crop"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-tall-buildings-in-a-city-4632-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="uppercase text-xs sm:text-sm tracking-widest2 text-brass-light font-medium mb-6"
        >
          Curated Real Estate &mdash; Dubai, U.A.E.
        </motion.span>

        <h1 className="font-display text-ivory text-[13vw] sm:text-7xl md:text-8xl leading-[0.95] font-medium text-balance">
          {headline.map((word, i) => (
            <span key={word} className="inline-block overflow-hidden mx-1 sm:mx-2">
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 0.9,
                  delay: 0.35 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 max-w-xl text-ivory/80 text-base sm:text-lg font-light"
        >
          A private collection of Dubai&rsquo;s most distinguished addresses,
          presented by advisors who know every skyline by heart.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-3.5 rounded-full bg-brass text-navy text-sm font-semibold tracking-wide hover:bg-brass-light transition-colors duration-300"
          >
            View Portfolio
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-3.5 rounded-full border border-ivory/50 text-ivory text-sm font-semibold tracking-wide hover:bg-ivory hover:text-navy transition-colors duration-300"
          >
            Speak to an Advisor
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-widest2 uppercase text-ivory/60">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-brass-light" size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
