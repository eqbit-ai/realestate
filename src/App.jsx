import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Clients from './components/Clients.jsx'
import PropertyListings from './components/PropertyListings.jsx'
import Portfolio from './components/Portfolio.jsx'
import Gallery from './components/Gallery.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Chatbot from './components/Chatbot.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : 'auto'
  }, [loading])

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="curtain"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] bg-navy flex items-center justify-center"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.35em' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="font-display text-ivory text-2xl sm:text-3xl uppercase"
            >
              Aur<span className="text-brass">e</span>lia
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <Navbar />
        <main>
          <Hero />
          <Clients />
          <Services />
          <Portfolio />
          <PropertyListings />
          <Gallery />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </>
  )
}
