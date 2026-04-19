'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const steps = [
  {
    n: '1',
    title: "Tell NOX what you're into",
    body: 'Pick your vibe, budget, and music. Takes 10 seconds.',
    placeholder: 'Preference pills mockup',
    dims: '280×380',
  },
  {
    n: '2',
    title: 'Everyone picks their vibe',
    body: 'Share the link. Everyone adds their preferences privately. No arguments.',
    placeholder: 'Group joining mockup',
    dims: '280×380',
  },
  {
    n: '3',
    title: 'NOX finds the spot',
    body: "NOX weighs up everyone's preferences and finds venues that actually work for the whole group.",
    placeholder: 'Venue cards mockup',
    dims: '280×380',
  },
]

export default function HowItWorks() {
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
          className="text-center font-semibold text-white mb-20"
          style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
        >
          Three taps. One plan. Zero drama.
        </motion.h2>

        <div className="flex flex-col gap-20">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: reduce ? 0 : 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: reduce ? 0 : i * 0.18, ease: "easeOut" }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-16`}
            >
              {/* Text */}
              <div className="flex-1 flex items-start gap-5">
                <motion.div
                  initial={{ scale: reduce ? 1 : 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: reduce ? 0 : i * 0.18 + 0.25,
                    type: reduce ? 'tween' : 'spring',
                    bounce: 0.45,
                  }}
                  className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-lg md:text-xl"
                  style={{ background: 'var(--nw-amber)', color: 'var(--nw-dark)', fontFamily: 'var(--font-poppins)' }}
                >
                  {step.n}
                </motion.div>

                <div className="pt-1">
                  <h3
                    className="text-xl md:text-2xl font-semibold text-white mb-3"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--nw-slate)' }}>
                    {step.body}
                  </p>
                </div>
              </div>

              {/* Mockup placeholder */}
              <div className="shrink-0 w-full md:w-auto flex justify-center">
                <div
                  className="w-[260px] h-[360px] md:w-[300px] md:h-[400px] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-center p-6"
                  style={{
                    borderColor: 'rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.03)',
                  }}
                >
                  <p className="text-xs mb-2" style={{ color: 'var(--nw-slate)' }}>
                    {step.placeholder}
                  </p>
                  <p className="text-xs opacity-40" style={{ color: 'var(--nw-slate)' }}>
                    {step.dims}px
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
