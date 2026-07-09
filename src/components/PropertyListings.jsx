import React from 'react'
import { motion } from 'framer-motion'
import { BedDouble, Bath, Ruler, ArrowUpRight } from 'lucide-react'
import { PROPERTIES } from '../data/properties'

export default function PropertyListings() {
    return (
        <section id="listings" className="relative bg-ivory py-28 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7 }}
                    className="max-w-2xl mb-14"
                >
                    <span className="uppercase text-xs tracking-widest2 text-brass font-semibold">
                        All Listings
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl text-navy mt-4 leading-tight text-balance">
                        Every property, at a glance.
                    </h2>
                </motion.div>

                <div className="flex flex-col divide-y divide-sand-dark/60 border-y border-sand-dark/60">
                    {/* Loop over every property — add/remove listings in src/data/properties.js only */}
                    {PROPERTIES.map((property, i) => (
                        <motion.a
                            key={property.id}
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault()
                                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
                            className="group flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 py-6 hover:bg-sand/40 px-3 -mx-3 rounded-xl transition-colors duration-300"
                        >
                            <span className="font-display text-brass text-sm w-8 shrink-0">
                                {property.id}
                            </span>

                            <div className="w-full sm:w-28 h-40 sm:h-20 rounded-lg overflow-hidden shrink-0">
                                <img
                                    src={property.image}
                                    alt={property.name}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-display text-xl text-navy truncate">{property.name}</h3>
                                <p className="text-sm text-charcoal/60 mt-1">
                                    {property.location} &middot; {property.type}
                                </p>
                            </div>

                            <div className="hidden md:flex items-center gap-5 text-charcoal/60 text-sm shrink-0">
                                <span className="flex items-center gap-1.5">
                                    <BedDouble size={15} /> {property.beds}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Bath size={15} /> {property.baths}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Ruler size={15} /> {property.area}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 shrink-0">
                                <span className="text-brass font-semibold text-sm whitespace-nowrap">
                                    {property.price}
                                </span>
                                <span className="w-9 h-9 rounded-full border border-sand-dark flex items-center justify-center group-hover:bg-navy group-hover:border-navy transition-colors duration-300">
                                    <ArrowUpRight
                                        size={16}
                                        className="text-navy group-hover:text-ivory transition-colors duration-300"
                                    />
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    )
}