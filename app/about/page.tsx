'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: 'easeOut' as const }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })
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
            About Nightwise
          </span>
          <h1
            className="font-semibold text-white leading-tight max-w-3xl mx-auto"
            style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
          >
            We&apos;re fixing how groups decide where to go.
          </h1>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Section>
            <div className="space-y-6 text-base md:text-lg leading-relaxed" style={{ color: 'var(--nw-slate)' }}>
              <p>
                Every group night out starts the same way. Someone posts in the group chat. A few
                venue suggestions appear. Reactions are vague, nobody wants to commit, and an hour
                later the conversation has died. The night doesn&apos;t happen, or it happens somewhere
                nobody really wanted to go. It&apos;s the same broken process, every time.
              </p>
              <p>
                The insight behind Nightwise is simple: AI can mediate group preferences better than
                any group chat. When everyone&apos;s preferences are collected privately and weighed
                fairly &mdash; without social pressure, without anchoring to the first suggestion &mdash;
                groups make better decisions. Faster. And they actually go out.
              </p>
              <p>
                The vision is a world where group social planning is frictionless. Where Nightwise
                becomes the default tool that friend groups reach for when they want to go out
                together &mdash; not just for nightlife, but for any occasion that requires coordinating
                what a group of people actually wants.
              </p>
            </div>
          </Section>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 px-6" style={{ background: 'var(--nw-darker)' }}>
        <div className="max-w-3xl mx-auto">
          <Section>
            <h2
              className="font-semibold text-white mb-12"
              style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
            >
              Meet the founder
            </h2>

            <div className="flex flex-col sm:flex-row items-start gap-10">
              {/* Photo placeholder */}
              <div className="shrink-0">
                <div
                  className="w-44 h-44 rounded-full border-2 border-dashed flex flex-col items-center justify-center text-center p-4"
                  style={{
                    borderColor: 'rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.03)',
                  }}
                >
                  <span className="text-3xl mb-2">👤</span>
                  <p className="text-xs" style={{ color: 'var(--nw-slate)' }}>Founder photo<br />200×200px</p>
                </div>
              </div>

              <div className="flex-1">
                <h3
                  className="text-xl font-semibold text-white mb-1"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  Ben Hosking
                </h3>
                <p className="text-sm mb-6" style={{ color: 'var(--nw-amber)' }}>Founder</p>
                <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--nw-slate)' }}>
                  <p>
                    University of York graduate. London-based. Building Nightwise to solve the problem
                    every friend group has &mdash; deciding where to go without the drama. Previously
                    worked in [Ben to fill in].
                  </p>
                  <p>
                    Started Nightwise after one too many nights spent arguing in the group chat instead
                    of actually going out.
                  </p>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 mt-6 text-sm font-medium transition-colors hover:text-white"
                  style={{ color: 'var(--nw-amber)' }}
                >
                  Connect on LinkedIn &rarr;
                </a>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* Meet NOX */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Section>
            <h2
              className="font-semibold text-white mb-10"
              style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
            >
              Meet NOX
            </h2>

            <div className="flex flex-col sm:flex-row items-start gap-10">
              <div
                className="shrink-0 w-36 h-36 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-center p-4"
                style={{
                  borderColor: 'rgba(255,184,77,0.3)',
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                <span className="text-4xl">🦉</span>
                <p className="text-xs mt-2" style={{ color: 'var(--nw-slate)' }}>NOX illustration</p>
              </div>

              <div className="flex-1">
                <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--nw-slate)' }}>
                  NOX is the AI at the heart of Nightwise. A witty, knowledgeable nightlife guide who
                  mediates group decisions without the drama. NOX collects everyone&apos;s preferences
                  privately, weighs them fairly, and finds venues that actually work for the whole group.
                  Think of NOX as the friend who always knows where to go &mdash; except NOX actually
                  checks the data.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 px-6" style={{ background: 'var(--nw-darker)' }}>
        <div className="max-w-3xl mx-auto">
          <Section>
            <h2
              className="font-semibold text-white mb-8"
              style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
            >
              The vision
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--nw-slate)' }}>
              Nightwise starts with nights out. But the way groups make decisions together is broken
              everywhere &mdash; not just nightlife. We&apos;re starting where the problem is most
              fun to solve. What comes next is bigger.
            </p>
          </Section>
        </div>
      </section>
    </>
  )
}
