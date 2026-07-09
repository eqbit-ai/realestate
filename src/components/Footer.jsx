import React from 'react'
import { Instagram, Linkedin, Facebook } from 'lucide-react'
import { NAV_LINKS } from '../data'

export default function Footer() {
  return (
    <footer className="bg-navy text-ivory/70 pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <p className="font-display text-3xl text-ivory">
              AUR<span className="text-brass">E</span>LIA
            </p>
            <p className="text-sm mt-4 max-w-sm leading-relaxed">
              A private real estate advisory representing Dubai&rsquo;s most
              distinguished residences, for buyers and sellers who expect more.
            </p>
            <div className="flex gap-4 mt-6">
              {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label="Social link"
                  className="w-9 h-9 rounded-full border border-ivory/20 flex items-center justify-center hover:border-brass hover:text-brass transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-ivory text-sm font-semibold mb-5 uppercase tracking-widest2 text-xs">
              Navigate
            </p>
            <ul className="space-y-3 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="hover:text-brass transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-ivory text-sm font-semibold mb-5 uppercase tracking-widest2 text-xs">
              Contact
            </p>
            <ul className="space-y-3 text-sm">
              <li>DIFC, Dubai, U.A.E.</li>
              <li>+971 4 000 0000</li>
              <li>advisory@aurelia-estates.ae</li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-16 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ivory/40">
          <p>&copy; {new Date().getFullYear()} AURELIA Estates. All rights reserved.</p>
          <p>Demo template &mdash; built for portfolio presentation purposes.</p>
        </div>
      </div>
    </footer>
  )
}
