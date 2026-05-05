'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import AppMockup from '@/components/brand/AppMockup'

type Variant = 'pills' | 'avatars' | 'venues'

const steps: { n: string; title: string; body: string; variant: Variant }[] = [
  {
    n: '01',
    title: 'Create your night',
    body: "Name it. Share the link. Everyone joins in 10 seconds.",
    variant: 'avatars',
  },
  {
    n: '02',
    title: 'Everyone picks their vibe',
    body: "Preferences are private. No peer pressure. No compromise guilt. NOX sees what everyone wants — nobody else does.",
    variant: 'pills',
  },
  {
    n: '03',
    title: 'NOX finds the spot',
    body: "NOX weighs up everyone's preferences — vibe, budget, music, area — and finds venues that actually work for the whole group. Not a list. A decision.",
    variant: 'venues',
  },
  {
    n: '04',
    title: 'Vote on the plan',
    body: "Love it, could work, or hard no. Anonymous until everyone's voted. NOX handles the rest.",
    variant: 'venues',
  },
  {
    n: '05',
    title: 'Go. Check in. Pivot.',
    body: "NOX checks in at each venue. Not feeling it? NOX finds alternatives on the spot. Transport, timing, closing times — all handled.",
    variant: 'avatars',
  },
  {
    n: '06',
    title: 'Your night, recapped',
    body: "Every venue. Every rating. Shareable. Saved for next time.",
    variant: 'venues',
  },
]

const differentiators = [
  {
    icon: '🧠',
    title: 'AI-powered group decisions',
    body: "NOX doesn't just list venues. It weighs everyone's preferences and finds the best fit for the whole group.",
  },
  {
    icon: '🔒',
    title: 'Private preferences',
    body: "Nobody sees what you picked. No peer pressure. No compromise guilt.",
  },
  {
    icon: '🗺️',
    title: 'One plan, not 50 tabs',
    body: "Route or loose. Transport between stops. Check-in feedback. The whole night, handled.",
  },
]

function Step({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const isEven = index % 2 === 0

  return (
    <div ref={ref} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-16 py-12 border-b`} style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <motion.div
        initial={{ opacity: 0, x: reduce ? 0 : (isEven ? -24 : 24) }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, ease: 'easeOut' as const }}
        className="flex-1 text-center md:text-left"
      >
        <div
          className="text-xs font-bold tracking-widest mb-4 uppercase"
          style={{ color: 'var(--nw-amber)' }}
        >
          Step {step.n}
        </div>
        <h2
          className="font-semibold text-white mb-4 leading-tight"
          style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(1.6rem, 3vw, 2.25rem)' }}
        >
          {step.title}
        </h2>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--nw-slate)' }}>
          {step.body}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: reduce ? 0 : (isEven ? 24 : -24) }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: reduce ? 0 : 0.1, ease: 'easeOut' as const }}
        className="shrink-0 w-full md:w-auto flex justify-center"
      >
        <div className="w-[240px] h-[440px] md:w-[260px] md:h-[480px]">
          <AppMockup variant={step.variant} />
        </div>
      </motion.div>
    </div>
  )
}

export default function HowItWorksPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const diffRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })
  const diffInView = useInView(diffRef, { once: true, margin: '-60px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="pt-32 pb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
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
            How it works
          </span>
          <h1
            className="font-semibold text-white leading-tight mb-6"
            style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
          >
            From &ldquo;where shall we go?&rdquo; to<br className="hidden md:block" /> &ldquo;we&apos;re here&rdquo; in minutes.
          </h1>
        </motion.div>
      </section>

      {/* Steps */}
      <section className="px-6 max-w-7xl mx-auto pb-20">
        {steps.map((step, i) => (
          <Step key={step.n} step={step} index={i} />
        ))}
      </section>

      {/* What makes NOX different */}
      <section ref={diffRef} className="py-20 px-6" style={{ background: 'var(--nw-darker)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={diffInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="text-center font-semibold text-white mb-14"
            style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            What makes NOX different
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {differentiators.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: reduce ? 0 : 32 }}
                animate={diffInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: reduce ? 0 : i * 0.12, ease: 'easeOut' as const }}
                className="rounded-2xl p-8 border"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                <div className="text-4xl mb-5">{d.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
                  {d.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--nw-slate)' }}>
                  {d.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
        >
          <h2
            className="font-semibold text-white mb-8"
            style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            Ready to skip the drama?
          </h2>
          <a
            href="https://nightwise.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 hover:brightness-110"
            style={{
              background: 'var(--nw-amber)',
              color: 'var(--nw-dark)',
              boxShadow: '0 8px 32px rgba(255,184,77,0.3)',
            }}
          >
            Plan a night out &rarr;
          </a>
        </motion.div>
      </section>
    </>
  )
}
