'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

export default function EarlyResults() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()

  return (
    <section ref={ref} className="py-20 px-6" style={{ background: 'var(--nw-darker)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
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
            Case studies
          </span>

          <h2
            className="font-semibold text-white mb-6"
            style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            Early results
          </h2>

          <div
            className="rounded-2xl p-8 border mb-10 text-left"
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <p className="leading-relaxed mb-4" style={{ color: 'var(--nw-slate)' }}>
              Beacon launched in 2026. We&apos;re currently working with our first cohort of London
              venues and building our first case studies.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--nw-slate)' }}>
              If you&apos;re interested in being one of our founding venues &mdash; getting a full
              audit free in exchange for honest feedback and a case study &mdash; we&apos;d like to
              hear from you.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:scale-105"
            style={{
              background: 'var(--nw-amber)',
              color: 'var(--nw-dark)',
              boxShadow: '0 6px 24px rgba(255,184,77,0.2)',
            }}
          >
            Apply to be a founding venue &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
