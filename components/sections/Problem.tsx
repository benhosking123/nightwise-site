'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const problems = [
  {
    emoji: '📱',
    title: 'The group chat chaos',
    body: "47 messages. 3 venues. Nobody agrees. It's 9pm and you're still on the sofa.",
  },
  {
    emoji: '🔍',
    title: 'The endless scroll',
    body: 'Google Maps. TripAdvisor. Instagram. Time Out. 30 tabs open. Still no plan.',
  },
  {
    emoji: '😤',
    title: 'The compromise nobody wanted',
    body: "Someone picks. Nobody's happy. The vibe's already dead.",
  },
]

export default function Problem() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center font-semibold text-white mb-16"
          style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
        >
          We've all been there.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: reduce ? 0 : 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: reduce ? 0 : i * 0.15, ease: "easeOut" }}
              className="rounded-2xl p-8 border group hover:border-white/20 transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <div className="text-4xl mb-5">{p.emoji}</div>
              <h3
                className="text-lg font-semibold text-white mb-3"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                {p.title}
              </h3>
              <p className="leading-relaxed text-sm md:text-base" style={{ color: 'var(--nw-slate)' }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
