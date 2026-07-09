import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BedDouble, Bath, Ruler, ArrowUpRight, X } from 'lucide-react'
import { LISTINGS } from '../data'

export default function Portfolio() {
  const [active, setActive] = useState(null)

  return (
    <section id="portfolio" className="relative bg-sand py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-4"
        >
          <div>
            <span className="uppercase text-xs tracking-widest2 text-brass font-semibold">
              Portfolio
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-navy mt-4 leading-tight text-balance">
              A selection of current listings.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-charcoal/70">
            Each residence below is available for private viewing. Numbers reflect
            our internal curation order, not availability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LISTINGS.map((listing, idx) => (
            <motion.article
              key={listing.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
              onClick={() => setActive(listing)}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
                <img
                  src={listing.image}
                  alt={listing.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                <span className="absolute top-5 left-5 font-display text-ivory/80 text-sm tracking-widest2">
                  {listing.id}
                </span>
                <span className="absolute top-5 right-5 text-[10px] uppercase tracking-widest2 bg-ivory/90 text-navy px-3 py-1.5 rounded-full font-semibold">
                  {listing.tag}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-display text-2xl text-ivory">{listing.name}</h3>
                  <p className="text-ivory/70 text-sm mt-1">{listing.location}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-brass-light font-semibold text-sm">
                      {listing.price}
                    </span>
                    <span className="w-9 h-9 rounded-full bg-brass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <ArrowUpRight size={16} className="text-navy" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Listing detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-ivory rounded-2xl max-w-3xl w-full overflow-hidden max-h-[88vh] overflow-y-auto"
            >
              <div className="relative h-72 sm:h-96">
                <img
                  src={active.image}
                  alt={active.name}
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-ivory/90 flex items-center justify-center"
                >
                  <X size={18} className="text-navy" />
                </button>
              </div>
              <div className="p-8">
                <span className="text-[10px] uppercase tracking-widest2 text-brass font-semibold">
                  {active.tag} &middot; {active.location}
                </span>
                <h3 className="font-display text-3xl text-navy mt-3">{active.name}</h3>
                <p className="text-brass font-semibold text-lg mt-2">{active.price}</p>

                <div className="flex flex-wrap gap-6 mt-6 py-6 border-y border-sand-dark">
                  <div className="flex items-center gap-2 text-charcoal/80 text-sm">
                    <BedDouble size={18} className="text-navy" /> {active.beds} Bedrooms
                  </div>
                  <div className="flex items-center gap-2 text-charcoal/80 text-sm">
                    <Bath size={18} className="text-navy" /> {active.baths} Bathrooms
                  </div>
                  <div className="flex items-center gap-2 text-charcoal/80 text-sm">
                    <Ruler size={18} className="text-navy" /> {active.area}
                  </div>
                </div>

                <p className="text-sm text-charcoal/70 leading-relaxed mt-6">
                  A distinguished residence in {active.location}, offering
                  exceptional craftsmanship, panoramic views and access to
                  Dubai&rsquo;s most sought-after amenities. Full specification
                  and private viewing arranged directly through our advisory team.
                </p>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    setActive(null)
                    setTimeout(
                      () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }),
                      200
                    )
                  }}
                  className="inline-block mt-8 px-7 py-3 rounded-full bg-navy text-ivory text-sm font-semibold hover:bg-brass hover:text-navy transition-colors duration-300"
                >
                  Enquire About This Property
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
