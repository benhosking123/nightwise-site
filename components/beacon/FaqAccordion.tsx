'use client'

import { useState, useRef } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'What do you mean by AI visibility?',
    a: "When someone asks ChatGPT or Google's AI where to go tonight, it recommends venues based on what it knows about them. Most venues have never thought about what AI knows about them — or doesn't. Beacon measures that and shows you how to improve it.",
  },
  {
    q: 'How long before I see results?',
    a: "Quick wins like Google listing updates typically show within two to four weeks. Review improvements and listing changes take two to three months to compound. AI training data updates on a longer cycle — expect three to six months for meaningful movement in AI-specific visibility. Monthly tracking shows you the trend line so you know what's working.",
  },
  {
    q: 'Do I need to change my website?',
    a: "Sometimes, but most high-impact improvements don't require a website rebuild. Google listing quality, review responses, and listing presence on the right platforms are often more impactful than website changes — and require no developer.",
  },
  {
    q: 'Do you fix the problems or just tell me about them?',
    a: 'The free audit and full report identify the gaps with specific recommendations. The retainer includes active management. For one-off fixes, we tell you exactly what to do and who to speak to — no vague advice.',
  },
  {
    q: 'I already work with an SEO agency. Why do I need this?',
    a: "Traditional SEO optimises for Google's ranking algorithm. AI visibility requires a different approach — structured data, occasion-specific content, and presence on platforms that AI systems draw from that most SEO agencies don't cover. If your agency isn't specifically addressing AI citation, you have gaps they aren't filling. Beacon covers both.",
  },
]

function FaqItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  return (
    <div
      className="border-b"
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <button
        className="w-full text-left py-5 flex items-start justify-between gap-4 group"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        <span
          className="text-base font-medium text-white group-hover:text-[#FFB84D] transition-colors leading-snug"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          {faq.q}
        </span>
        <span
          className="shrink-0 mt-0.5 text-lg transition-transform duration-300"
          style={{
            color: 'var(--nw-amber)',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: 'easeInOut' as const }}
            className="overflow-hidden"
          >
            <p
              className="pb-5 text-sm md:text-base leading-relaxed"
              style={{ color: 'var(--nw-slate)' }}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqAccordion() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
          className="font-semibold text-white mb-12 text-center"
          style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
        >
          Common questions
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: reduce ? 0 : 0.15, ease: 'easeOut' as const }}
          className="border-t"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          {faqs.map((faq, i) => (
            <FaqItem key={faq.q} faq={faq} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
