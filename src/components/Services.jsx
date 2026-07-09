import React from 'react'
import { motion } from 'framer-motion'
import {
  Compass,
  KeyRound,
  Building2,
  TrendingUp,
  Sofa,
  ShieldCheck,
} from 'lucide-react'
import { SERVICES } from '../data'

const ICONS = { Compass, KeyRound, Building2, TrendingUp, Sofa, ShieldCheck }

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Services() {
  return (
    <section id="services" className="relative bg-ivory py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          <span className="uppercase text-xs tracking-widest2 text-brass font-semibold">
            What We Offer
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-navy mt-4 leading-tight text-balance">
            Full-service guidance for every stage of ownership.
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon]
            return (
              <motion.div
                key={s.id}
                variants={item}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative bg-white border border-sand-dark/60 rounded-2xl p-8 overflow-hidden"
              >
                <div className="absolute inset-x-0 bottom-0 h-0 bg-navy transition-all duration-500 group-hover:h-full -z-0" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center mb-6 transition-colors duration-500 group-hover:bg-brass">
                    {Icon && <Icon size={22} className="text-navy" strokeWidth={1.6} />}
                  </div>
                  <h3 className="font-display text-xl text-navy mb-3 transition-colors duration-500 group-hover:text-ivory">
                    {s.title}
                  </h3>
                  <p className="text-sm text-charcoal/70 leading-relaxed transition-colors duration-500 group-hover:text-ivory/70">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
