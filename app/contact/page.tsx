'use client'

import { useState, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const cards = [
  {
    icon: '🤝',
    title: 'Venue partnerships',
    body: 'Interested in Beacon or partnering with Nightwise?',
    email: 'hello@nightwise.co.uk',
  },
  {
    icon: '📰',
    title: 'Press enquiries',
    body: 'Need quotes, assets, or information?',
    email: 'press@nightwise.co.uk',
  },
  {
    icon: '📈',
    title: 'Investor interest',
    body: 'Want to learn more about the Nightwise vision?',
    email: 'ben@nightwise.co.uk',
  },
]

const subjects = [
  'Partnership',
  'Press',
  'Investment',
  'Founding Venue',
  'Other',
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Partnership', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })
  const formInView = useInView(formRef, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* Header */}
      <section ref={heroRef} className="pt-32 pb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' as const }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-8 border"
            style={{
              background: 'rgba(255,184,77,0.08)',
              borderColor: 'rgba(255,184,77,0.2)',
              color: 'var(--nw-amber)',
            }}
          >
            Contact
          </span>
          <h1
            className="font-semibold text-white"
            style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
          >
            Get in touch
          </h1>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-6 pb-24">
        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: reduce ? 0 : 32 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: reduce ? 0 : 0.2 + i * 0.1, ease: 'easeOut' as const }}
              className="rounded-2xl p-8 border"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <div className="text-3xl mb-5">{card.icon}</div>
              <h3
                className="text-base font-semibold text-white mb-2"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                {card.title}
              </h3>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--nw-slate)' }}>
                {card.body}
              </p>
              <a
                href={`mailto:${card.email}`}
                className="text-sm font-medium transition-colors hover:text-white"
                style={{ color: 'var(--nw-amber)' }}
              >
                {card.email}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={formInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' as const }}
          className="max-w-2xl mx-auto"
        >
          <h2
            className="font-semibold text-white mb-8 text-center"
            style={{ fontFamily: 'var(--font-poppins)', fontSize: '1.75rem' }}
          >
            Send a message
          </h2>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: reduce ? 1 : 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl p-12 border text-center"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <div className="text-5xl mb-6">✉️</div>
              <h3
                className="text-xl font-semibold text-white mb-3"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                Thanks &mdash; we&apos;ll be in touch.
              </h3>
              <p className="text-sm" style={{ color: 'var(--nw-slate)' }}>
                We typically respond within 1&ndash;2 business days.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 border space-y-5"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'var(--nw-slate)' }}>
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none border focus:border-[#FFB84D]/60 transition-colors"
                    style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)' }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'var(--nw-slate)' }}>
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none border focus:border-[#FFB84D]/60 transition-colors"
                    style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--nw-slate)' }}>
                  Subject
                </label>
                <select
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none border focus:border-[#FFB84D]/60 transition-colors cursor-pointer"
                  style={{ background: 'rgba(20,12,50,0.95)', borderColor: 'rgba(255,255,255,0.1)' }}
                >
                  {subjects.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--nw-slate)' }}>
                  Message
                </label>
                <textarea
                  required
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us what you're interested in..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none border focus:border-[#FFB84D]/60 transition-colors resize-none"
                  style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)' }}
                />
              </div>

              <button
                type="submit"
                className="w-full font-semibold py-4 rounded-full transition-all duration-200 hover:scale-[1.02] hover:brightness-110"
                style={{
                  background: 'var(--nw-amber)',
                  color: 'var(--nw-dark)',
                  boxShadow: '0 4px 20px rgba(255,184,77,0.25)',
                }}
              >
                Send message &rarr;
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </>
  )
}
