'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

const perks = [
  'A full live audit at no cost',
  'A 45-minute call to walk through the findings',
  'Direct input into what Beacon builds next',
  'First access to the Nightwise Citation Index when it launches',
]

const asks = [
  'Honest feedback on the audit',
  'Permission to publish your before/after results anonymously',
  'An introduction to one other venue owner who might benefit',
]

export default function FoundingVenue() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()

  return (
    <section ref={ref} className="py-20 px-6" style={{ background: 'var(--nw-darker)' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' as const }}
        >
          <div className="text-center mb-12">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-6 border"
              style={{
                background: 'rgba(255,184,77,0.08)',
                borderColor: 'rgba(255,184,77,0.2)',
                color: 'var(--nw-amber)',
              }}
            >
              Limited to 10 venues
            </span>
            <h2
              className="font-semibold text-white mb-4"
              style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
            >
              Be one of our first ten founding venues.
            </h2>
            <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--nw-slate)' }}>
              Beacon is new. We&apos;re honest about that. We&apos;re looking for ten London venues to
              work with closely &mdash; getting a full audit free, shaping what we build, and
              featuring in our first published case studies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div
              className="rounded-2xl p-7 border"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <h3
                className="text-base font-semibold text-white mb-5"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                What you get
              </h3>
              <ul className="space-y-3">
                {perks.map(perk => (
                  <li key={perk} className="flex items-start gap-3 text-sm" style={{ color: 'var(--nw-slate)' }}>
                    <span style={{ color: 'var(--nw-amber)' }} className="mt-0.5 shrink-0">✓</span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-2xl p-7 border"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <h3
                className="text-base font-semibold text-white mb-5"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                What we ask for
              </h3>
              <ul className="space-y-3">
                {asks.map(ask => (
                  <li key={ask} className="flex items-start gap-3 text-sm" style={{ color: 'var(--nw-slate)' }}>
                    <span style={{ color: 'var(--nw-slate)' }} className="mt-0.5 shrink-0 opacity-50">→</span>
                    {ask}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 mb-4"
              style={{
                background: 'var(--nw-amber)',
                color: 'var(--nw-dark)',
                boxShadow: '0 6px 24px rgba(255,184,77,0.2)',
              }}
            >
              Apply for a founding venue spot &rarr;
            </Link>
            <p className="text-sm mt-4" style={{ color: 'rgba(136,146,166,0.6)' }}>
              This is not a sales funnel. It is a genuine offer to the right venues. We have ten spots.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
