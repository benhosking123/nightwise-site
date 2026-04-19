'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const pillars = [
  {
    icon: '📍',
    title: 'Google Presence',
    body: 'What does your Google listing tell potential customers — and what does it leave out?',
  },
  {
    icon: '📱',
    title: 'Social Discovery',
    body: 'Are people finding your venue through TikTok and Instagram, or scrolling past it?',
  },
  {
    icon: '⭐',
    title: 'Review Reputation',
    body: 'What do your reviews say about you — and are they recent enough to matter?',
  },
  {
    icon: '🔍',
    title: 'Search Visibility',
    body: 'When someone Googles bars or clubs in your area, where do you appear?',
  },
  {
    icon: '🌐',
    title: 'Website Signals',
    body: 'Does your website help search engines and AI understand what you offer and who you\'re for?',
  },
  {
    icon: '🤖',
    title: 'AI Recommendations',
    body: 'When someone asks ChatGPT or Gemini where to go tonight, does your venue come up?',
  },
]

export default function SixPillars() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
          className="text-center mb-14"
        >
          <h2
            className="font-semibold text-white mb-4"
            style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            Six pillars of venue discovery
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'var(--nw-slate)' }}>
            Beacon scores your venue across every channel your customers use to find a night out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: reduce ? 0 : 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: reduce ? 0 : i * 0.1, ease: 'easeOut' as const }}
              className="rounded-2xl p-7 border group transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3
                className="text-base font-semibold text-white mb-2"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--nw-slate)' }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
