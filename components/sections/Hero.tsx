'use client'

import { motion, useReducedMotion } from 'framer-motion'
import StarField from '@/components/StarField'
import NoxOwl from '@/components/brand/NoxOwl'

function LondonSkyline() {
  return (
    <svg
      viewBox="0 0 1440 180"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 left-0 right-0 w-full"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <path
        d="
          M0,180 L0,150 L30,150 L30,140 L50,140 L50,120 L60,120 L60,110 L70,110 L70,95
          L75,95 L75,88 L77,88 L77,82 L80,78 L83,82 L83,88 L85,88 L85,95
          L90,95 L90,110 L100,110 L100,120 L110,120 L110,140 L130,140 L130,150
          L160,150 L160,135 L175,135 L175,145 L195,145 L195,135 L210,135 L210,150
          L240,150 L240,130 L252,130 L252,115 L260,115 L260,105 L268,105 L268,115
          L275,115 L275,130 L290,130 L290,150
          L320,150 L320,140 L335,140 L335,125 L345,125 L345,110 L355,110 L355,90
          L360,90 L360,80 L365,80 L365,72 L368,68 L371,72 L371,80 L376,80
          L376,90 L381,90 L381,110 L390,110 L390,125 L400,125 L400,140 L415,140 L415,150
          L450,150 L450,138 L462,138 L462,122 L470,122 L470,100 L475,100 L475,85
          L480,85 L480,70 L483,60 L486,70 L486,85 L491,85 L491,100 L496,100
          L496,122 L504,122 L504,138 L516,138 L516,150
          L550,150 L550,140 L565,140 L565,128 L572,128 L572,120 L580,120 L580,128
          L588,128 L588,140 L600,140 L600,150
          L630,150 L630,132 L642,132 L642,115 L652,115 L652,95 L658,95 L658,80
          L663,80 L663,65 L666,58 L669,65 L669,80 L674,80 L674,95 L680,95
          L680,115 L690,115 L690,132 L702,132 L702,150
          L735,150 L735,158 L750,140 L765,158 L780,140 L795,158 L800,150
          L840,150 L840,135 L855,135 L855,118 L862,118 L862,105 L870,105 L870,90
          L876,90 L876,75 L881,75 L881,60 L886,45 L891,60 L891,75 L896,75
          L896,90 L902,90 L902,105 L910,105 L910,118 L918,118 L918,135 L930,135 L930,150
          L960,150 L960,140 L975,140 L975,128 L985,128 L985,118 L992,118 L992,128
          L1000,128 L1000,140 L1012,140 L1012,150
          L1040,150 L1040,138 L1055,138 L1055,122 L1063,122 L1063,110 L1070,110 L1070,122
          L1078,122 L1078,138 L1090,138 L1090,150
          L1120,150 L1120,140 L1135,140 L1135,128 L1142,128 L1142,118 L1148,118
          L1148,128 L1155,128 L1155,140 L1168,140 L1168,150
          L1200,150 L1200,162 L1215,145 L1230,162 L1245,145 L1260,162 L1265,150
          L1300,150 L1300,140 L1315,140 L1315,152 L1330,140 L1345,150 L1360,140 L1375,150 L1390,140 L1440,140 L1440,180 Z
        "
        fill="rgba(255,255,255,0.04)"
      />
      <path
        d="M0,180 L0,160 L100,160 L100,155 L200,155 L200,160 L300,160 L300,155 L400,155 L400,162 L500,162 L500,158 L600,158 L600,162 L700,162 L700,158 L800,158 L800,162 L900,162 L900,158 L1000,158 L1000,162 L1100,162 L1100,158 L1200,158 L1200,162 L1300,162 L1300,158 L1440,158 L1440,180 Z"
        fill="rgba(255,255,255,0.02)"
      />
    </svg>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const y0 = reduce ? 0 : 24
  const d0 = reduce ? 0 : 0

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <StarField />
      <LondonSkyline />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(45,92,246,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: y0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: d0 + 0.3, ease: 'easeOut' as const }}
            >
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-6 border"
                style={{
                  background: 'rgba(255,184,77,0.1)',
                  borderColor: 'rgba(255,184,77,0.25)',
                  color: 'var(--nw-amber)',
                }}
              >
                🇬🇧 London&apos;s AI nightlife planner
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: y0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: d0 + 0.35, ease: 'easeOut' as const }}
              className="font-semibold text-white leading-[1.1] mb-6"
              style={{
                fontFamily: 'var(--font-poppins)',
                fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
              }}
            >
              Skip the group<br />chat drama.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: y0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: d0 + 0.5, ease: 'easeOut' as const }}
              className="text-lg md:text-xl leading-relaxed mb-10 max-w-lg mx-auto md:mx-0"
              style={{ color: 'var(--nw-slate)' }}
            >
              NOX plans your night out &mdash; so your mates don&apos;t have to argue about it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: y0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: d0 + 0.65, ease: 'easeOut' as const }}
              className="flex flex-col sm:flex-row items-center md:items-start gap-4"
            >
              <a
                href="https://nightwise.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-base px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 hover:brightness-110"
                style={{
                  background: 'var(--nw-amber)',
                  color: 'var(--nw-dark)',
                  boxShadow: '0 8px 32px rgba(255,184,77,0.3)',
                }}
              >
                Plan a night out &rarr;
              </a>
              <a
                href="#beacon"
                className="text-sm transition-colors duration-200 mt-1 hover:text-white"
                style={{ color: 'var(--nw-slate)' }}
              >
                Run a venue? See how visible you are &rarr;
              </a>
            </motion.div>
          </div>

          {/* NOX illustration */}
          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0.88, y: y0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: d0 + 0.4, ease: 'easeOut' as const }}
            className="shrink-0 w-full md:w-auto flex justify-center"
          >
            <div
              className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] rounded-3xl flex items-center justify-center"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 30%, rgba(45,92,246,0.22), transparent 70%), rgba(28,35,64,0.6)',
                border: '1px solid rgba(255,184,77,0.18)',
                boxShadow: '0 30px 80px rgba(58,12,107,0.45)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div
                style={{ animation: reduce ? 'none' : 'float 4s ease-in-out infinite' }}
                className="w-[78%] h-[78%] flex items-center justify-center"
              >
                <NoxOwl size={320} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
