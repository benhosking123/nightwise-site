'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'

const MOCK_SCORE = 52

const pillars = [
  { name: 'Google Presence', score: 61, icon: '📍' },
  { name: 'Social Discovery', score: 38, icon: '📱' },
  { name: 'Review Reputation', score: 72, icon: '⭐' },
  { name: 'Search Visibility', score: 44, icon: '🔍' },
  { name: 'Website Signals', score: 35, icon: '🌐' },
  { name: 'AI Recommendations', score: 28, icon: '🤖' },
]

function scoreBand(score: number): { label: string; copy: string; color: string } {
  if (score <= 40)
    return {
      label: 'Low visibility',
      color: '#FF5F8F',
      copy: "Your venue is difficult to find across most discovery channels. The gaps are significant but fixable — most improvements are straightforward once you know where to focus. Here's what's holding you back.",
    }
  if (score <= 65)
    return {
      label: 'Partial visibility',
      color: '#FFB84D',
      copy: "You're visible in some places but missing customers on others. Competitors with stronger visibility are appearing where you aren't. Here's exactly where the gaps are.",
    }
  if (score <= 80)
    return {
      label: 'Good visibility',
      color: '#6ee7b7',
      copy: "Solid visibility with clear gaps your competitors may already be exploiting. Here's what to prioritise.",
    }
  return {
    label: 'Strong visibility',
    color: '#34d399',
    copy: "Strong overall visibility. Here's how to maintain it as the discovery landscape keeps shifting.",
  }
}

function ScoreRing({ score, color }: { score: number; color: string }) {
  const r = 52
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - score / 100)

  return (
    <div className="relative w-36 h-36 flex items-center justify-center mx-auto mb-6">
      <svg className="absolute inset-0 -rotate-90" width="144" height="144" viewBox="0 0 144 144">
        <circle cx="72" cy="72" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <motion.circle
          cx="72"
          cy="72"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' as const, delay: 0.2 }}
        />
      </svg>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-bold text-white"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          {score}
        </motion.div>
        <div className="text-xs" style={{ color: 'var(--nw-slate)' }}>out of 100</div>
      </div>
    </div>
  )
}

function PillarBar({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const color = pillar.score <= 40 ? '#FF5F8F' : pillar.score <= 65 ? '#FFB84D' : '#6ee7b7'
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
      className="flex items-center gap-3"
    >
      <span className="text-lg w-6 text-center shrink-0">{pillar.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-white truncate">{pillar.name}</span>
          <span className="text-xs font-medium ml-2 shrink-0" style={{ color }}>{pillar.score}</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: color }}
            initial={{ width: 0 }}
            animate={{ width: `${pillar.score}%` }}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.08, ease: 'easeOut' as const }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function AuditTool() {
  const [venue, setVenue] = useState('')
  const [showResult, setShowResult] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const band = scoreBand(MOCK_SCORE)

  const handleRun = () => {
    if (venue.trim()) setShowResult(true)
  }

  return (
    <section ref={ref} className="py-8 px-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' as const }}
        className="max-w-2xl mx-auto"
      >
        <div
          className="rounded-3xl p-8 border"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(16px)',
            borderColor: 'rgba(255,255,255,0.1)',
          }}
        >
          <h2
            className="text-xl font-semibold text-white mb-6 text-center"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Run your free audit
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 mb-2">
            <input
              type="text"
              value={venue}
              onChange={e => setVenue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleRun()}
              placeholder="Your venue name here"
              className="flex-1 px-5 py-3.5 rounded-full text-white placeholder-white/30 outline-none border focus:border-[#FFB84D]/60 transition-colors text-sm"
              style={{
                background: 'rgba(255,255,255,0.06)',
                borderColor: 'rgba(255,255,255,0.12)',
              }}
            />
            <button
              onClick={handleRun}
              className="px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 hover:brightness-110 shrink-0"
              style={{
                background: 'var(--nw-amber)',
                color: 'var(--nw-dark)',
                boxShadow: '0 4px 20px rgba(255,184,77,0.25)',
              }}
            >
              Run free audit &rarr;
            </button>
          </div>
          <p className="text-xs text-center mb-0" style={{ color: 'rgba(136,146,166,0.6)' }}>
            Google Places autocomplete coming soon
          </p>
        </div>

        {/* Result card */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' as const }}
              className="mt-6 rounded-3xl p-8 border"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(255,255,255,0.1)',
              }}
            >
              <div className="text-center mb-2">
                <p className="text-sm mb-4" style={{ color: 'var(--nw-slate)' }}>
                  Visibility score for{' '}
                  <span className="text-white font-medium">{venue}</span>
                </p>
              </div>

              <ScoreRing score={MOCK_SCORE} color={band.color} />

              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 mx-auto block text-center w-fit"
                style={{ background: `${band.color}20`, color: band.color }}
              >
                {band.label}
              </div>

              <p className="text-sm leading-relaxed text-center mb-8" style={{ color: 'var(--nw-slate)' }}>
                {band.copy}
              </p>

              <div className="space-y-4 mb-8">
                {pillars.map((p, i) => (
                  <PillarBar key={p.name} pillar={p} index={i} />
                ))}
              </div>

              <div className="text-center">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full transition-all hover:scale-105"
                  style={{
                    background: 'var(--nw-amber)',
                    color: 'var(--nw-dark)',
                    boxShadow: '0 4px 16px rgba(255,184,77,0.2)',
                  }}
                >
                  See your full breakdown &rarr;
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
