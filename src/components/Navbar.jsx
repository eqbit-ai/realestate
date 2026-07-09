import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ivory/80 backdrop-blur-md border-b border-brass/20 py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, '#top')}
          className={`font-display text-2xl tracking-wide ${
            scrolled ? 'text-navy' : 'text-ivory'
          }`}
        >
          AUR<span className="text-brass">E</span>LIA
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`relative text-sm tracking-wide font-medium group ${
                scrolled ? 'text-charcoal' : 'text-ivory/90'
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brass transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className={`text-sm tracking-wide font-semibold px-5 py-2.5 rounded-full border transition-colors duration-300 ${
              scrolled
                ? 'border-navy text-navy hover:bg-navy hover:text-ivory'
                : 'border-ivory/70 text-ivory hover:bg-ivory hover:text-navy'
            }`}
          >
            Book a Viewing
          </a>
        </nav>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden p-2 ${scrolled ? 'text-navy' : 'text-ivory'}`}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-ivory border-t border-brass/20"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-navy text-base font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="mt-2 text-center text-sm font-semibold px-5 py-3 rounded-full bg-navy text-ivory"
              >
                Book a Viewing
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
