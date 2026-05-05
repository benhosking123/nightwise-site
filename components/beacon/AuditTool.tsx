'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'

// ── types ────────────────────────────────────────────────────────────────────

interface PillarData {
  score: number
  assessment: string
  recommendation: string
}

interface Competitor {
  name: string
  score: number
  reason: string
}

interface AuditResult {
  overallScore: number
  pillars: {
    googlePresence: PillarData
    socialDiscovery: PillarData
    reviewReputation: PillarData
    searchVisibility: PillarData
    websiteSignals: PillarData
    aiRecommendations: PillarData
  }
  competitors: Competitor[]
  current_ai_description: string
  better_description: string
  topRecommendations: string[]
  confidence: { level: string; note: string }
}

// ── helpers ───────────────────────────────────────────────────────────────────

const PILLAR_META: { key: keyof AuditResult['pillars']; label: string; icon: string }[] = [
  { key: 'googlePresence', label: 'Google Presence', icon: '📍' },
  { key: 'socialDiscovery', label: 'Social Discovery', icon: '📱' },
  { key: 'reviewReputation', label: 'Review Reputation', icon: '⭐' },
  { key: 'searchVisibility', label: 'Search Visibility', icon: '🔍' },
  { key: 'websiteSignals', label: 'Website Signals', icon: '🌐' },
  { key: 'aiRecommendations', label: 'AI Recommendations', icon: '🤖' },
]

function scoreBand(score: number): { label: string; copy: string; color: string } {
  if (score <= 40)
    return {
      label: 'LOW VISIBILITY',
      color: '#FF5F8F',
      copy: 'Your venue is difficult to find across most discovery channels. The gaps are significant but fixable.',
    }
  if (score <= 65)
    return {
      label: 'EMERGING',
      color: '#FFB84D',
      copy: "You're visible in some places but missing customers on others. Competitors are appearing where you aren't.",
    }
  if (score <= 80)
    return {
      label: 'VISIBLE',
      color: '#6ee7b7',
      copy: 'Solid visibility with clear gaps your competitors may already be exploiting.',
    }
  return {
    label: 'STRONG',
    color: '#34d399',
    copy: "Strong overall visibility. Here's how to maintain it as the landscape shifts.",
  }
}

function pillarColor(score: number) {
  if (score <= 40) return '#FF5F8F'
  if (score <= 65) return '#FFB84D'
  return '#6ee7b7'
}

// ── sub-components ────────────────────────────────────────────────────────────

function ScoreRing({ score, color }: { score: number; color: string }) {
  const r = 52
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - score / 100)
  return (
    <div className="relative w-36 h-36 flex items-center justify-center mx-auto mb-6">
      <svg className="absolute inset-0 -rotate-90" width="144" height="144" viewBox="0 0 144 144">
        <circle cx="72" cy="72" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <motion.circle
          cx="72" cy="72" r={r} fill="none"
          stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        />
      </svg>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
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

function PillarBar({
  label, icon, score, assessment, index,
}: { label: string; icon: string; score: number; assessment: string; index: number }) {
  const color = pillarColor(score)
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
      className="mb-4"
    >
      <div className="flex items-center gap-3 mb-1">
        <span className="text-lg w-6 text-center shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-white truncate">{label}</span>
            <span className="text-xs font-medium ml-2 shrink-0" style={{ color }}>{score}</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div
              className="h-full rounded-full" style={{ background: color }}
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.08, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
      <p className="text-xs pl-9" style={{ color: 'rgba(136,146,166,0.8)' }}>{assessment}</p>
    </motion.div>
  )
}

// ── London bounds for Places autocomplete ─────────────────────────────────────

const LONDON_BOUNDS = {
  south: 51.28, west: -0.489,
  north: 51.686, east: 0.236,
}

// ── main component ────────────────────────────────────────────────────────────

export default function AuditTool() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<any>(null)

  const inView = useInView(sectionRef, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()

  const [selectedVenue, setSelectedVenue] = useState<{
    name: string; placeId: string; address: string
  } | null>(null)

  const [status, setStatus] = useState<'idle' | 'loading' | 'result' | 'error'>('idle')
  const [result, setResult] = useState<AuditResult | null>(null)

  // Initialise Places Autocomplete once Maps is ready
  const initAutocomplete = useCallback(() => {
    if (!inputRef.current || autocompleteRef.current) return
    const g = (window as any).google
    if (!g?.maps?.places) return

    const bounds = new g.maps.LatLngBounds(
      new g.maps.LatLng(LONDON_BOUNDS.south, LONDON_BOUNDS.west),
      new g.maps.LatLng(LONDON_BOUNDS.north, LONDON_BOUNDS.east),
    )

    const ac = new g.maps.places.Autocomplete(inputRef.current, {
      types: ['establishment'],
      componentRestrictions: { country: 'gb' },
      bounds,
      fields: ['name', 'place_id', 'formatted_address', 'address_components', 'types'],
    })

    ac.addListener('place_changed', () => {
      const place = ac.getPlace()
      if (!place?.place_id) return
      setSelectedVenue({
        name: place.name ?? '',
        placeId: place.place_id,
        address: place.formatted_address ?? '',
      })
    })

    autocompleteRef.current = ac
  }, [])

  useEffect(() => {
    if ((window as any).__gmReady) {
      initAutocomplete()
      return
    }
    const interval = setInterval(() => {
      if ((window as any).__gmReady) {
        clearInterval(interval)
        initAutocomplete()
      }
    }, 200)
    return () => clearInterval(interval)
  }, [initAutocomplete])

  const handleReset = () => {
    setSelectedVenue(null)
    setStatus('idle')
    setResult(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleRun = async () => {
    if (!selectedVenue) return
    setStatus('loading')
    setResult(null)
    try {
      const res = await fetch('/api/beacon/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placeId: selectedVenue.placeId,
          venueName: selectedVenue.name,
          address: selectedVenue.address,
        }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        throw new Error(data.error ?? 'Audit failed')
      }
      setResult(data as AuditResult)
      setStatus('result')
    } catch {
      setStatus('error')
    }
  }

  const band = result ? scoreBand(result.overallScore) : null

  return (
    <section id="audit" ref={sectionRef} className="py-8 px-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl mx-auto"
      >
        {/* Input card */}
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

          {selectedVenue ? (
            <div className="flex flex-col sm:flex-row gap-3">
              <div
                className="flex-1 flex items-center gap-3 px-5 py-3.5 rounded-full border"
                style={{ background: 'rgba(255,184,77,0.08)', borderColor: 'rgba(255,184,77,0.3)' }}
              >
                <span className="text-sm text-white truncate font-medium">{selectedVenue.name}</span>
                <span className="text-xs shrink-0" style={{ color: 'var(--nw-slate)' }}>
                  {selectedVenue.address.split(',').slice(-2).join(',').trim()}
                </span>
              </div>
              <button
                onClick={handleReset}
                className="px-5 py-3.5 rounded-full text-sm border transition-colors shrink-0"
                style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'var(--nw-slate)' }}
              >
                Change
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 mb-2">
              <input
                ref={inputRef}
                id="venue-input"
                name="venue"
                type="text"
                placeholder="Search for your London venue"
                className="flex-1 px-5 py-3.5 rounded-full text-white placeholder-white/30 outline-none border focus:border-[#FFB84D]/60 transition-colors text-sm"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderColor: 'rgba(255,255,255,0.12)',
                }}
              />
            </div>
          )}

          <div className="mt-3">
            <button
              onClick={handleRun}
              disabled={!selectedVenue || status === 'loading'}
              className="w-full px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                background: 'var(--nw-amber)',
                color: 'var(--nw-dark)',
                boxShadow: selectedVenue ? '0 4px 20px rgba(255,184,77,0.25)' : 'none',
              }}
            >
              Run free audit →
            </button>
          </div>
        </div>

        {/* States */}
        <AnimatePresence mode="wait">
          {/* Loading */}
          {status === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6 rounded-3xl p-10 border text-center"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(255,255,255,0.1)',
              }}
            >
              <div className="text-5xl mb-5">🦉</div>
              <p className="text-white font-semibold text-lg mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                NOX is investigating {selectedVenue?.name}
                <span className="inline-block ml-1 animate-pulse">...</span>
              </p>
              <p className="text-sm" style={{ color: 'var(--nw-slate)' }}>
                Checking visibility across 6 channels. About 20 seconds.
              </p>
            </motion.div>
          )}

          {/* Error */}
          {status === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6 rounded-3xl p-8 border text-center"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(255,95,143,0.3)',
              }}
            >
              <p className="text-white mb-2">
                We couldn't complete the audit for this venue. Please try again or contact{' '}
                <a href="mailto:hello@nightwise.co.uk" className="underline" style={{ color: '#FFB84D' }}>
                  hello@nightwise.co.uk
                </a>
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 rounded-full text-sm border transition-colors"
                style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'var(--nw-slate)' }}
              >
                Try again
              </button>
            </motion.div>
          )}

          {/* Result */}
          {status === 'result' && result && band && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: reduce ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mt-6 rounded-3xl p-8 border"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(255,255,255,0.1)',
              }}
            >
              {/* Score */}
              <div className="text-center mb-2">
                <p className="text-sm mb-4" style={{ color: 'var(--nw-slate)' }}>
                  Visibility score for{' '}
                  <span className="text-white font-medium">{selectedVenue?.name}</span>
                </p>
              </div>

              <ScoreRing score={result.overallScore} color={band.color} />

              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide mb-4 mx-auto block text-center w-fit"
                style={{ background: `${band.color}20`, color: band.color }}
              >
                {band.label}
              </div>

              <p className="text-sm leading-relaxed text-center mb-8" style={{ color: 'var(--nw-slate)' }}>
                {band.copy}
              </p>

              {/* Confidence badge */}
              <div className="text-center mb-6">
                <span
                  className="text-xs px-3 py-1 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(136,146,166,0.8)' }}
                >
                  Confidence: {result.confidence.level} — {result.confidence.note}
                </span>
              </div>

              {/* Pillars */}
              <div className="mb-8">
                {PILLAR_META.map((p, i) => {
                  const pillarData = result.pillars[p.key]
                  return (
                    <PillarBar
                      key={p.key}
                      label={p.label}
                      icon={p.icon}
                      score={pillarData.score}
                      assessment={pillarData.assessment}
                      index={i}
                    />
                  )
                })}
              </div>

              {/* Competitors */}
              <div className="mb-8">
                <h3
                  className="text-sm font-semibold text-white mb-3"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  Nearby competitors
                </h3>
                <div className="space-y-2">
                  {result.competitors.map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.08 }}
                      className="flex items-start gap-3 rounded-xl p-3"
                      style={{ background: 'rgba(255,255,255,0.04)' }}
                    >
                      <span
                        className="text-xs font-bold shrink-0 px-2 py-0.5 rounded-full mt-0.5"
                        style={{ background: `${pillarColor(c.score)}20`, color: pillarColor(c.score) }}
                      >
                        {c.score}
                      </span>
                      <div>
                        <p className="text-xs font-medium text-white">{c.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'rgba(136,146,166,0.8)' }}>{c.reason}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* AI descriptions */}
              <div className="mb-8 space-y-4">
                <div
                  className="rounded-xl p-4 border"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <p className="text-xs font-semibold mb-2" style={{ color: 'var(--nw-slate)' }}>
                    How AI likely describes you now
                  </p>
                  <p className="text-sm text-white leading-relaxed">{result.current_ai_description}</p>
                </div>
                <div
                  className="rounded-xl p-4 border"
                  style={{ background: 'rgba(255,184,77,0.05)', borderColor: 'rgba(255,184,77,0.2)' }}
                >
                  <p className="text-xs font-semibold mb-2" style={{ color: '#FFB84D' }}>
                    Optimised AI-ready description
                  </p>
                  <p className="text-sm text-white leading-relaxed">{result.better_description}</p>
                </div>
              </div>

              {/* Top recommendations */}
              <div className="mb-8">
                <h3
                  className="text-sm font-semibold text-white mb-3"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  Top 3 recommendations
                </h3>
                <div className="space-y-3">
                  {result.topRecommendations.map((rec, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.08 }}
                      className="flex gap-3 rounded-xl p-4"
                      style={{ background: 'rgba(255,255,255,0.04)' }}
                    >
                      <span
                        className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: 'rgba(255,184,77,0.15)', color: '#FFB84D' }}
                      >
                        {i + 1}
                      </span>
                      <p className="text-sm text-white leading-relaxed">{rec}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <a
                  href={`mailto:beacon@nightwise.co.uk?subject=${encodeURIComponent(`Full Audit Request - ${selectedVenue?.name}`)}`}
                  className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full transition-all hover:scale-105"
                  style={{
                    background: 'var(--nw-amber)',
                    color: 'var(--nw-dark)',
                    boxShadow: '0 4px 16px rgba(255,184,77,0.2)',
                  }}
                >
                  Get your full live audit — £79 →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
