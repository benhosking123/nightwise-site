'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export default function HonestAiNote() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' as const }}
          className="rounded-2xl p-10 border"
          style={{
            background: 'rgba(13,13,43,0.8)',
            backdropFilter: 'blur(12px)',
            borderColor: 'rgba(255,255,255,0.12)',
            borderLeft: '3px solid rgba(255,184,77,0.4)',
          }}
        >
          {/* Label */}
          <div
            className="flex items-center gap-2 mb-6"
            style={{ color: 'var(--nw-amber)' }}
          >
            <span className="text-base">✍️</span>
            <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--nw-amber)' }}>
              A note on AI search
            </span>
          </div>

          <div className="space-y-5">
            <p className="leading-relaxed" style={{ color: 'var(--nw-slate)', fontSize: '1rem' }}>
              AI assistants like ChatGPT, Gemini, and Perplexity are a small but fast-growing part
              of how people discover venues &mdash; particularly among 18&ndash;35 year olds planning
              group nights out. Right now they influence a minority of booking decisions. In two to
              three years, industry data suggests they will influence a significant proportion.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--nw-slate)', fontSize: '1rem' }}>
              The venues that improve their AI visibility now do so at low cost, before it becomes
              competitive. The ones that wait will spend significantly more to catch up.
            </p>
            <p className="leading-relaxed" style={{ color: 'rgba(136,146,166,0.9)', fontSize: '1rem' }}>
              Beacon is honest about this. We won&apos;t tell you AI search is transforming your
              footfall today &mdash; it isn&apos;t. We will tell you it&apos;s the fastest-growing
              discovery channel you almost certainly haven&apos;t optimised for, and that the cost
              of acting early is low.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
