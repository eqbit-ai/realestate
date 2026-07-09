import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react'

const initialForm = { name: '', email: '', phone: '', interest: 'Buying', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (!form.message.trim()) next.message = 'Tell us a little about what you\u2019re looking for.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    // Frontend-only demo: no backend wired up. Replace with your API/CRM call.
    setSubmitted(true)
    setForm(initialForm)
  }

  return (
    <section id="contact" className="relative bg-sand py-28 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-2 flex flex-col justify-between"
        >
          <div>
            <span className="uppercase text-xs tracking-widest2 text-brass font-semibold">
              Contact
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-navy mt-4 leading-tight text-balance">
              Begin your search today.
            </h2>
            <p className="text-charcoal/70 text-sm mt-6 leading-relaxed max-w-sm">
              Share a few details and one of our senior advisors will respond
              within one business day with a shortlist tailored to you.
            </p>
          </div>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-3 text-sm text-charcoal/80">
              <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                <Phone size={16} className="text-brass" />
              </span>
              +971 4 000 0000
            </div>
            <div className="flex items-center gap-3 text-sm text-charcoal/80">
              <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                <Mail size={16} className="text-brass" />
              </span>
              advisory@aurelia-estates.ae
            </div>
            <div className="flex items-center gap-3 text-sm text-charcoal/80">
              <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                <MapPin size={16} className="text-brass" />
              </span>
              DIFC, Dubai, United Arab Emirates
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-3 bg-white rounded-2xl p-8 sm:p-10 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-16"
              >
                <CheckCircle2 className="text-brass mb-4" size={40} />
                <h3 className="font-display text-2xl text-navy">Thank you.</h3>
                <p className="text-charcoal/70 text-sm mt-2 max-w-xs">
                  Your enquiry has been received. An advisor will be in touch shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-sm font-semibold text-brass hover:text-navy transition-colors"
                >
                  Send another enquiry
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-navy mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={update('name')}
                    className={`w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-brass transition-colors ${
                      errors.name ? 'border-red-400' : 'border-sand-dark'
                    }`}
                    placeholder="Jane Smith"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-navy mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    className={`w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-brass transition-colors ${
                      errors.email ? 'border-red-400' : 'border-sand-dark'
                    }`}
                    placeholder="jane@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-navy mb-2">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    className="w-full rounded-lg border border-sand-dark px-4 py-3 text-sm outline-none focus:border-brass transition-colors"
                    placeholder="+971 50 000 0000"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-navy mb-2">
                    I&rsquo;m interested in
                  </label>
                  <select
                    value={form.interest}
                    onChange={update('interest')}
                    className="w-full rounded-lg border border-sand-dark px-4 py-3 text-sm outline-none focus:border-brass transition-colors bg-white"
                  >
                    <option>Buying</option>
                    <option>Selling</option>
                    <option>Leasing</option>
                    <option>Investment Advisory</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-navy mb-2">Message</label>
                  <textarea
                    value={form.message}
                    onChange={update('message')}
                    rows={4}
                    className={`w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-brass transition-colors resize-none ${
                      errors.message ? 'border-red-400' : 'border-sand-dark'
                    }`}
                    placeholder="Tell us about the property you have in mind..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-navy text-ivory text-sm font-semibold hover:bg-brass hover:text-navy transition-colors duration-300"
                  >
                    Submit Enquiry
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
