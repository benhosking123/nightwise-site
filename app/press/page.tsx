'use client'

import NoxOwl from '@/components/brand/NoxOwl'
import Wordmark from '@/components/brand/Wordmark'
import AppMockup from '@/components/brand/AppMockup'

const keyFacts = [
  { label: 'Founded', value: '2025' },
  { label: 'Location', value: 'London, UK' },
  { label: 'Status', value: 'Beta' },
  { label: 'Founder', value: 'Ben Hosking' },
  { label: 'Tagline', value: '"Skip the group chat drama."' },
]

const brandColors = [
  { name: 'Twilight Violet', hex: '#3A0C6B', role: 'Primary gradient top' },
  { name: 'Electric Night Blue', hex: '#2D5CF6', role: 'Primary gradient bottom' },
  { name: 'Amber Glow', hex: '#FFB84D', role: 'Accent / CTAs / NOX eyes' },
]

type ScreenshotVariant = 'pills' | 'avatars' | 'venues'
const screenshots: { label: string; variant: ScreenshotVariant }[] = [
  { label: 'Preference pills', variant: 'pills' },
  { label: 'Group joining', variant: 'avatars' },
  { label: 'Venue picks', variant: 'venues' },
]

export default function PressPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-8 border"
          style={{
            background: 'rgba(255,184,77,0.08)',
            borderColor: 'rgba(255,184,77,0.2)',
            color: 'var(--nw-amber)',
          }}
        >
          Media
        </span>
        <h1
          className="font-semibold text-white"
          style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
        >
          Press Kit
        </h1>
      </section>

      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-16">

        {/* About blurb */}
        <section>
          <h2
            className="font-semibold text-white mb-5"
            style={{ fontFamily: 'var(--font-poppins)', fontSize: '1.5rem' }}
          >
            About Nightwise
          </h2>
          <div
            className="rounded-2xl p-8 border"
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <p className="text-base md:text-lg leading-relaxed mb-4" style={{ color: 'var(--nw-slate)' }}>
              Nightwise is an AI-powered group nightlife planning app based in London. Its AI
              character NOX the Owl collects each group member&apos;s preferences privately &mdash;
              vibe, budget, music, area &mdash; and finds venues that work for everyone. No more
              arguing in the group chat. Founded in 2025. Currently in beta.
            </p>
            <button
              className="text-xs font-medium px-4 py-2 rounded-full border transition-all hover:bg-white/10"
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--nw-slate)' }}
              onClick={() => {
                navigator.clipboard.writeText(
                  'Nightwise is an AI-powered group nightlife planning app based in London. Its AI character NOX the Owl collects each group member\'s preferences privately — vibe, budget, music, area — and finds venues that work for everyone. No more arguing in the group chat. Founded in 2025. Currently in beta.'
                )
              }}
            >
              Copy text
            </button>
          </div>
        </section>

        {/* Key facts */}
        <section>
          <h2
            className="font-semibold text-white mb-5"
            style={{ fontFamily: 'var(--font-poppins)', fontSize: '1.5rem' }}
          >
            Key facts
          </h2>
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            {keyFacts.map((fact, i) => (
              <div
                key={fact.label}
                className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4"
                style={{
                  background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
                  borderBottom: i < keyFacts.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
              >
                <span className="text-sm font-medium shrink-0" style={{ color: 'var(--nw-slate)' }}>
                  {fact.label}
                </span>
                <span className="text-sm text-white font-medium text-right">{fact.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Brand assets */}
        <section>
          <h2
            className="font-semibold text-white mb-8"
            style={{ fontFamily: 'var(--font-poppins)', fontSize: '1.5rem' }}
          >
            Brand assets
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {/* NOX logo */}
            <div
              className="rounded-2xl p-8 border flex flex-col items-center justify-center gap-4"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(255,255,255,0.08)',
                minHeight: '180px',
              }}
            >
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center overflow-hidden"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 30%, rgba(45,92,246,0.22), transparent 70%), #1C2340',
                  border: '1px solid rgba(255,184,77,0.25)',
                }}
              >
                <NoxOwl size={88} />
              </div>
              <p className="text-sm text-white text-center">NOX owl logo</p>
              <a
                href="/og-image.svg"
                download="nightwise-nox-owl.svg"
                className="text-xs px-4 py-2 rounded-full border transition-all hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--nw-slate)' }}
              >
                Download NOX logo
              </a>
            </div>

            {/* Wordmark */}
            <div
              className="rounded-2xl p-8 border flex flex-col items-center justify-center gap-4"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(255,255,255,0.08)',
                minHeight: '180px',
              }}
            >
              <Wordmark size="lg" />
              <p className="text-sm" style={{ color: 'var(--nw-slate)' }}>Wordmark (light)</p>
              <a
                href="mailto:press@nightwise.co.uk?subject=Wordmark%20asset%20request"
                className="text-xs px-4 py-2 rounded-full border transition-all hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--nw-slate)' }}
              >
                Request high-res
              </a>
            </div>
          </div>

          {/* Brand gradient / colors */}
          <div
            className="rounded-2xl p-8 border mb-8"
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <h3 className="text-base font-semibold text-white mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
              Brand colours
            </h3>
            <div className="flex flex-wrap gap-5">
              {brandColors.map(c => (
                <div key={c.hex} className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl shrink-0"
                    style={{ background: c.hex, border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                  <div>
                    <p className="text-sm font-medium text-white">{c.name}</p>
                    <p className="text-xs font-mono" style={{ color: 'var(--nw-amber)' }}>{c.hex}</p>
                    <p className="text-xs" style={{ color: 'var(--nw-slate)' }}>{c.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshots */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {screenshots.map(s => (
              <div
                key={s.label}
                className="rounded-2xl border flex flex-col items-center gap-3 p-5"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                <div className="w-full max-w-[180px] aspect-[3/5]">
                  <AppMockup variant={s.variant} />
                </div>
                <p className="text-xs text-center" style={{ color: 'var(--nw-slate)' }}>
                  {s.label}
                </p>
                <a
                  href="mailto:press@nightwise.co.uk?subject=Screenshot%20asset%20request"
                  className="text-xs px-4 py-2 rounded-full border transition-all hover:bg-white/10 w-full text-center"
                  style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--nw-slate)' }}
                >
                  Request high-res
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Press contact */}
        <section>
          <h2
            className="font-semibold text-white mb-5"
            style={{ fontFamily: 'var(--font-poppins)', fontSize: '1.5rem' }}
          >
            Press contact
          </h2>
          <div
            className="rounded-2xl p-8 border"
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <p className="text-base" style={{ color: 'var(--nw-slate)' }}>
              For press enquiries:{' '}
              <a
                href="mailto:press@nightwise.co.uk"
                className="font-medium transition-colors hover:text-white"
                style={{ color: 'var(--nw-amber)' }}
              >
                press@nightwise.co.uk
              </a>
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
