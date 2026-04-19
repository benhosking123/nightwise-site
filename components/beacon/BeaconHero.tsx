'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function BeaconHero() {
  const reduce = useReducedMotion()
  const y = reduce ? 0 : 24

  return (
    <section className="pt-32 pb-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' as const }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-8 border"
            style={{
              background: 'rgba(255,184,77,0.08)',
              borderColor: 'rgba(255,184,77,0.2)',
              color: 'var(--nw-amber)',
            }}
          >
            📡 Nightwise Beacon
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' as const }}
          className="font-semibold text-white mb-8 leading-tight"
          style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
        >
          When someone&apos;s planning a night out near you, does your venue come up?
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35, ease: 'easeOut' as const }}
          className="space-y-4 mb-10"
        >
          <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: 'var(--nw-slate)' }}>
            Your customers find venues across more channels than ever &mdash; Google Maps, Instagram,
            TikTok, and increasingly AI assistants like ChatGPT. Most London venues are
            well-optimised for none of them.
          </p>
          <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: 'var(--nw-slate)' }}>
            Beacon gives you a clear picture of where you stand across every discovery channel &mdash;
            and a specific plan to improve it.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.5, ease: 'easeOut' as const }}
          className="text-lg font-medium"
          style={{ color: 'var(--nw-white)' }}
        >
          Find out where you stand in 30 seconds. Free. No signup required.
        </motion.p>
      </div>
    </section>
  )
}
