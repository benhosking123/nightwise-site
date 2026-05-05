'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const stats = [
  { value: '50+', label: 'nights planned' },
  { value: '200+', label: 'venues rated' },
  { value: '30+', label: 'groups served' },
]

const testimonials = [
  {
    quote: 'Finally an app that stops the WhatsApp argument.',
    author: 'Beta user',
    initial: 'A',
    color: '#FFB84D',
  },
  {
    quote: 'We actually went out 30 minutes earlier than usual.',
    author: 'Beta user',
    initial: 'J',
    color: '#FF5F8F',
  },
]

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: reduce ? 0 : 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: reduce ? 0 : i * 0.12, ease: "easeOut" }}
              className="text-center"
            >
              <div
                className="font-bold mb-2"
                style={{
                  fontFamily: 'var(--font-poppins)',
                  color: 'var(--nw-amber)',
                  fontSize: 'clamp(3rem, 7vw, 4.5rem)',
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div className="text-base md:text-lg" style={{ color: 'var(--nw-slate)' }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: reduce ? 0 : 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: reduce ? 0 : 0.35 + i * 0.12, ease: "easeOut" }}
              className="rounded-2xl p-8 border"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              {/* Quote mark */}
              <div className="text-3xl mb-4" style={{ color: 'var(--nw-amber)', lineHeight: 1 }}>
                &ldquo;
              </div>
              <p className="text-lg text-white leading-relaxed mb-5">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    background: `${t.color}25`,
                    color: t.color,
                    border: `1.5px solid ${t.color}66`,
                  }}
                >
                  {t.initial}
                </div>
                <p className="text-sm" style={{ color: 'var(--nw-slate)' }}>
                  {t.author}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
