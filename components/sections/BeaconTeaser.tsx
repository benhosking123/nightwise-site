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
          transition={{ duration: 0.65, ease: "easeOut" }}
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

          {/* Beacon icon */}
          <div className="flex justify-center mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: 'rgba(255,184,77,0.1)', border: '1px solid rgba(255,184,77,0.2)' }}
            >
              📡
            </div>
          </div>

          <h2
            className="font-semibold text-white mb-4"
            style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
          >
            Nightwise Beacon
          </h2>

          <p className="text-lg md:text-xl mb-8" style={{ color: 'var(--nw-slate)' }}>
            How visible is your venue to AI?
          </p>

          <p
            className="text-base md:text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
            style={{ color: 'var(--nw-slate)' }}
          >
            When someone asks ChatGPT or Google where to go tonight, does your venue come up?
            Beacon audits your visibility across AI, search, and social — and shows you how to fix it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/beacon"
              className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 hover:brightness-110"
              style={{
                background: 'var(--nw-amber)',
                color: 'var(--nw-dark)',
                boxShadow: '0 8px 32px rgba(255,184,77,0.25)',
              }}
            >
              Get your free score →
            </Link>
            <Link
              href="/beacon#pricing"
              className="text-sm font-medium transition-colors duration-200 hover:text-white"
              style={{ color: 'var(--nw-slate)' }}
            >
              See pricing →
            </Link>
          </div>

          {/* Decorative divider */}
          <div
            className="mt-16 h-px max-w-xs mx-auto"
            style={{ background: 'linear-gradient(to right, transparent, rgba(255,184,77,0.2), transparent)' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
