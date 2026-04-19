'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

export default function BeaconTeaser() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()

  return (
    <section
      id="beacon"
      ref={ref}
      className="py-24 px-6"
      style={{ background: 'var(--nw-darker)' }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' as const }}
        >
          {/* Badge */}
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-8 border"
            style={{
              background: 'rgba(255,184,77,0.08)',
              borderColor: 'rgba(255,184,77,0.2)',
              color: 'var(--nw-amber)',
            }}
          >
            For venue owners
          </span>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: 'rgba(255,184,77,0.1)', border: '1px solid rgba(255,184,77,0.2)' }}
            >
              📡
            </div>
          </div>

          <h2
            className="font-semibold text-white mb-6"
            style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
          >
            Nightwise Beacon
          </h2>

          <p
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--nw-white)' }}
          >
            When someone&apos;s planning a night out near you, does your venue come up?
          </p>

          <p
            className="text-base md:text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
            style={{ color: 'var(--nw-slate)' }}
          >
            Discovery has changed. Your customers are searching across Google, TikTok, and AI
            assistants &mdash; most venues are only optimised for one. Beacon audits your visibility
            across every channel that drives footfall decisions &mdash; and shows you exactly where
            you&apos;re losing customers and how to fix it.
          </p>

          <Link
            href="/beacon"
            className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 hover:brightness-110"
            style={{
              background: 'var(--nw-amber)',
              color: 'var(--nw-dark)',
              boxShadow: '0 8px 32px rgba(255,184,77,0.25)',
            }}
          >
            Get your free score &rarr;
          </Link>

          <div
            className="mt-16 h-px max-w-xs mx-auto"
            style={{ background: 'linear-gradient(to right, transparent, rgba(255,184,77,0.2), transparent)' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
