import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { GALLERY_IMAGES } from '../data'

export default function Gallery() {
  const [index, setIndex] = useState(null)

  const close = () => setIndex(null)
  const prev = (e) => {
    e.stopPropagation()
    setIndex((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
  }
  const next = (e) => {
    e.stopPropagation()
    setIndex((i) => (i + 1) % GALLERY_IMAGES.length)
  }

  return (
    <section id="gallery" className="relative bg-navy py-28 px-6 bg-grain">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          <span className="uppercase text-xs tracking-widest2 text-brass-light font-semibold">
            Gallery
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-ivory mt-4 leading-tight text-balance">
            Interiors worth living inside.
          </h2>
        </motion.div>

        <div className="columns-2 sm:columns-3 gap-4 [column-fill:_balance]">
          {GALLERY_IMAGES.map((src, i) => (
            <motion.button
              key={src}
              onClick={() => setIndex(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              className={`mb-4 block w-full overflow-hidden rounded-xl group relative ${
                i % 5 === 0 ? 'aspect-[3/4]' : i % 3 === 0 ? 'aspect-square' : 'aspect-[4/5]'
              }`}
            >
              <img
                src={src}
                alt={`Interior showcase ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-500" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[100] bg-navy/95 flex items-center justify-center p-4 sm:p-10"
          >
            <button
              onClick={close}
              aria-label="Close gallery"
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-ivory/10 hover:bg-ivory/20 flex items-center justify-center text-ivory"
            >
              <X size={20} />
            </button>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 sm:left-8 w-11 h-11 rounded-full bg-ivory/10 hover:bg-ivory/20 flex items-center justify-center text-ivory"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 sm:right-8 w-11 h-11 rounded-full bg-ivory/10 hover:bg-ivory/20 flex items-center justify-center text-ivory"
            >
              <ChevronRight size={22} />
            </button>
            <motion.img
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              src={GALLERY_IMAGES[index]}
              alt={`Interior showcase ${index + 1}`}
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
