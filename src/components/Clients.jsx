import React from 'react'
import { motion } from 'framer-motion'
import { CLIENTS } from '../data/clients'

export default function Clients() {
    // Duplicate the array once so the marquee can loop seamlessly with CSS animation.
    const looped = [...CLIENTS, ...CLIENTS]

    return (
        <section className="relative bg-ivory py-16 px-6 border-y border-sand-dark/50 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className="text-center uppercase text-xs tracking-widest2 text-charcoal/50 font-semibold mb-10"
                >
                    Trusted by leading Dubai developers
                </motion.p>
            </div>

            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ivory to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ivory to-transparent z-10" />

            <div className="flex overflow-hidden">
                <div className="flex animate-marquee shrink-0 gap-16 pr-16">
                    {/* Loop over every client — add/remove entries in src/data/clients.js only */}
                    {looped.map((client, i) => (
                        <div
                            key={`${client.id}-${i}`}
                            className="flex items-center justify-center shrink-0 h-12 min-w-[140px]"
                        >
                            {client.logo ? (
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="h-8 w-auto object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                                />
                            ) : (
                                <span className="font-display text-lg text-navy/50 hover:text-navy transition-colors duration-300 whitespace-nowrap">
                                    {client.name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}