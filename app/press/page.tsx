'use client'

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

const screenshots = ['App screenshot 1', 'App screenshot 2', 'App screenshot 3']

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
                className="flex items-center justify-between px-7 py-4"
                style={{
                  background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
                  borderBottom: i < keyFacts.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
              >
                <span className="text-sm font-medium" style={{ color: 'var(--nw-slate)' }}>
                  {fact.label}
                </span>
                <span className="text-sm text-white font-medium">{fact.value}</span>
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
                className="w-20 h-20 rounded-2xl border-2 border-dashed flex items-center justify-center text-4xl"
                style={{ borderColor: 'rgba(255,184,77,0.3)' }}
              >
                🦉
              </div>
              <p className="text-sm text-white text-center">NOX owl logo</p>
              <button
                className="text-xs px-4 py-2 rounded-full border transition-all hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--nw-slate)' }}
              >
                Download NOX logo
              </button>
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
              <span
                className="text-2xl font-semibold text-white"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                Nightwise
              </span>
              <p className="text-sm" style={{ color: 'var(--nw-slate)' }}>Wordmark (light)</p>
              <button
                className="text-xs px-4 py-2 rounded-full border transition-all hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--nw-slate)' }}
              >
                Download wordmark
              </button>
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
            {screenshots.map((label, i) => (
              <div
                key={i}
                className="rounded-2xl border flex flex-col items-center justify-center gap-3 p-6"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  minHeight: '200px',
                }}
              >
                <div
                  className="w-full rounded-xl border-2 border-dashed flex items-center justify-center"
                  style={{
                    borderColor: 'rgba(255,255,255,0.12)',
                    height: '120px',
                  }}
                >
                  <p className="text-xs text-center px-4" style={{ color: 'var(--nw-slate)' }}>{label}</p>
                </div>
                <button
                  className="text-xs px-4 py-2 rounded-full border transition-all hover:bg-white/10 w-full text-center"
                  style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--nw-slate)' }}
                >
                  Download screenshot
                </button>
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
