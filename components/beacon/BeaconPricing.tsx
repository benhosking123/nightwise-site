'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

const tiers = [
  {
    name: 'Free Score',
    price: 'Free',
    period: '',
    tag: null,
    description:
      'Your AI visibility score across six discovery channels. See where you rank and where gaps exist. No signup. No catch.',
    cta: 'Run free audit →',
    ctaHref: '#audit',
    highlighted: false,
  },
  {
    name: 'Full Audit',
    price: '£79',
    period: 'one-off',
    tag: 'Most popular',
    description:
      'We run live queries across ChatGPT, Gemini, and Perplexity — showing you verbatim what AI says about your venue right now. Full six-pillar breakdown, competitor comparison, specific action plan. Delivered as a branded PDF within 48 hours, with a 30-minute walkthrough call included.',
    note: 'One payment. No subscription.',
    cta: 'Get your full audit →',
    ctaHref: 'mailto:beacon@nightwise.co.uk?subject=Full%20Audit%20%E2%80%94%20%C2%A379',
    highlighted: true,
  },
  {
    name: 'Monthly Tracking',
    price: '£29',
    period: '/month',
    tag: null,
    description:
      "We re-run your audit every 30 days and tell you what moved, what didn't, and what to do next. Cancel any time.",
    cta: 'Start tracking →',
    ctaHref: 'mailto:beacon@nightwise.co.uk?subject=Monthly%20Tracking%20%E2%80%94%20%C2%A329%2Fmonth',
    highlighted: false,
  },
]

export default function BeaconPricing() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()

  return (
    <section id="pricing" ref={ref} className="py-20 px-6">
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
            Transparent pricing. No lock-in. No surprises.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: reduce ? 0 : 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: reduce ? 0 : i * 0.12, ease: 'easeOut' as const }}
              className="relative rounded-2xl p-8 border flex flex-col"
              style={{
                background: tier.highlighted
                  ? 'rgba(255,184,77,0.06)'
                  : 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                borderColor: tier.highlighted
                  ? 'rgba(255,184,77,0.35)'
                  : 'rgba(255,255,255,0.08)',
              }}
            >
              {tier.tag && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'var(--nw-amber)', color: 'var(--nw-dark)' }}
                >
                  {tier.tag}
                </div>
              )}

              <div className="mb-6">
                <p className="text-sm font-medium mb-3" style={{ color: 'var(--nw-slate)' }}>
                  {tier.name}
                </p>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-4xl font-bold text-white"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-sm" style={{ color: 'var(--nw-slate)' }}>
                      {tier.period}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-3 flex-1" style={{ color: 'var(--nw-slate)' }}>
                {tier.description}
              </p>

              {tier.note && (
                <p className="text-xs italic mb-6" style={{ color: 'rgba(136,146,166,0.6)' }}>
                  {tier.note}
                </p>
              )}

              <a
                href={tier.ctaHref}
                className="mt-auto block text-center font-semibold text-sm py-3.5 rounded-full transition-all duration-200 hover:scale-105 border"
                style={
                  tier.highlighted
                    ? {
                        background: 'var(--nw-amber)',
                        color: 'var(--nw-dark)',
                        borderColor: 'transparent',
                        boxShadow: '0 4px 16px rgba(255,184,77,0.2)',
                      }
                    : {
                        background: 'transparent',
                        color: 'var(--nw-white)',
                        borderColor: 'rgba(255,255,255,0.18)',
                      }
                }
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Retainer callout */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: reduce ? 0 : 0.4, ease: 'easeOut' as const }}
          className="rounded-2xl p-8 border text-center"
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderColor: 'rgba(255,255,255,0.06)',
          }}
        >
          <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: 'var(--nw-slate)' }}>
            Want us to manage your visibility for you? Beacon&apos;s retainer handles everything &mdash;
            optimisation, monthly tracking, and priority access to the Nightwise Citation Index when
            it launches. From <span className="text-white font-semibold">£149/month</span>.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-white"
            style={{ color: 'var(--nw-amber)' }}
          >
            Talk to us &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
