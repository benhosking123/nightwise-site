/**
 * Stylised app mockups used as illustrations across the marketing site.
 * Not real screenshots — pure HTML/CSS so they render at any size and
 * look intentional rather than missing.
 *
 * Variants:
 *   pills    — Step 1: preference pills with a few highlighted in amber
 *   avatars  — Step 2: members joining; circular avatars with checkmarks
 *   venues   — Step 3: venue cards with match-percentage badges
 */

type Variant = 'pills' | 'avatars' | 'venues'

interface AppMockupProps {
  variant: Variant
  className?: string
  /** Hide phone frame chrome — useful inside small chips/cards. */
  bareFrame?: boolean
}

const FRAME_BG = '#0A0A1A'
const SCREEN_BG = 'linear-gradient(180deg, #1A0F3D 0%, #0F1535 100%)'

function PhoneFrame({ children, bareFrame }: { children: React.ReactNode; bareFrame?: boolean }) {
  if (bareFrame) {
    return (
      <div
        className="rounded-3xl overflow-hidden"
        style={{ background: SCREEN_BG, width: '100%', height: '100%' }}
      >
        {children}
      </div>
    )
  }
  return (
    <div
      className="rounded-[2.5rem] p-2"
      style={{
        background: FRAME_BG,
        boxShadow:
          '0 30px 80px rgba(58,12,107,0.5), 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.04)',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        className="rounded-[2rem] overflow-hidden relative"
        style={{ background: SCREEN_BG, width: '100%', height: '100%' }}
      >
        {/* Notch */}
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full z-10"
          style={{ background: '#000' }}
        />
        {children}
      </div>
    </div>
  )
}

function PillsMockup() {
  // Each row: [label, highlighted?]
  const rows: { heading: string; pills: [string, boolean][] }[] = [
    {
      heading: 'Vibe',
      pills: [
        ['Cocktail bar', true],
        ['Pub', false],
        ['Club', true],
        ['Live music', false],
      ],
    },
    {
      heading: 'Budget',
      pills: [
        ['Cheap', false],
        ['Mid-range', true],
        ['Splash out', false],
      ],
    },
    {
      heading: 'Music',
      pills: [
        ['House / techno', true],
        ['Indie', false],
        ['Hip hop', false],
        ['Jazz', false],
      ],
    },
  ]

  return (
    <div className="pt-10 px-5 pb-5 h-full flex flex-col gap-4">
      <div className="text-center mb-1">
        <p className="text-[9px] tracking-widest uppercase" style={{ color: '#FFB84D' }}>
          Tonight
        </p>
        <p className="text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
          What are you after?
        </p>
      </div>

      {rows.map(row => (
        <div key={row.heading}>
          <p className="text-[10px] uppercase tracking-wider mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {row.heading}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {row.pills.map(([label, on]) => (
              <span
                key={label}
                className="text-[10px] px-2.5 py-1 rounded-full border"
                style={{
                  background: on ? 'rgba(255,184,77,0.18)' : 'rgba(255,255,255,0.05)',
                  borderColor: on ? '#FFB84D' : 'rgba(255,255,255,0.12)',
                  color: on ? '#FFB84D' : 'rgba(255,255,255,0.65)',
                  fontWeight: on ? 600 : 400,
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-auto">
        <div
          className="rounded-full text-center text-[10px] py-2 font-semibold"
          style={{ background: '#FFB84D', color: '#0A0A1A' }}
        >
          Done
        </div>
      </div>
    </div>
  )
}

function AvatarsMockup() {
  // Members: [initial, color, status] where status: 'in' (checked) | 'pending'
  const members: { initial: string; color: string; status: 'in' | 'pending' }[] = [
    { initial: 'B', color: '#FFB84D', status: 'in' },
    { initial: 'A', color: '#FF5F8F', status: 'in' },
    { initial: 'J', color: '#2D5CF6', status: 'in' },
    { initial: 'S', color: '#6ee7b7', status: 'pending' },
  ]

  return (
    <div className="pt-10 px-5 pb-5 h-full flex flex-col">
      <div className="text-center mb-4">
        <p className="text-[9px] tracking-widest uppercase" style={{ color: '#FFB84D' }}>
          Saturday night
        </p>
        <p className="text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
          Group of 4
        </p>
        <p className="text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
          3 of 4 picked their vibe
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {members.map(m => (
          <div
            key={m.initial}
            className="flex items-center gap-3 rounded-xl px-3 py-2"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
              style={{
                background: `${m.color}25`,
                color: m.color,
                border: `1.5px solid ${m.color}80`,
              }}
            >
              {m.initial}
            </div>
            <span className="text-[11px] text-white/80 flex-1">
              {m.status === 'in' ? 'preferences in' : 'still picking…'}
            </span>
            {m.status === 'in' ? (
              <span
                className="text-[10px] w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold"
                style={{ background: '#6ee7b7', color: '#0A0A1A' }}
              >
                ✓
              </span>
            ) : (
              <span
                className="text-[9px] px-1.5 py-0.5 rounded-full shrink-0"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
              >
                …
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <p className="text-[9px] text-center mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
          NOX is finding venues
        </p>
        <div
          className="rounded-full h-1 overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <div
            className="h-full rounded-full"
            style={{ width: '75%', background: 'linear-gradient(90deg, #FFB84D, #FF5F8F)' }}
          />
        </div>
      </div>
    </div>
  )
}

function VenuesMockup() {
  const venues: { name: string; area: string; match: number; tags: string }[] = [
    { name: 'The Sun Tavern', area: 'Bethnal Green', match: 92, tags: 'Cocktails • Cosy' },
    { name: 'Phonox', area: 'Brixton', match: 87, tags: 'House • Late' },
    { name: 'Spiritland', area: 'King’s Cross', match: 78, tags: 'Listening bar' },
  ]

  function matchColor(score: number) {
    if (score >= 85) return '#6ee7b7'
    if (score >= 70) return '#FFB84D'
    return '#FF5F8F'
  }

  return (
    <div className="pt-10 px-5 pb-5 h-full flex flex-col gap-2.5">
      <div className="text-center mb-2">
        <p className="text-[9px] tracking-widest uppercase" style={{ color: '#FFB84D' }}>
          NOX picks
        </p>
        <p className="text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
          3 spots that fit
        </p>
      </div>

      {venues.map(v => {
        const c = matchColor(v.match)
        return (
          <div
            key={v.name}
            className="rounded-xl p-3"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-white truncate">{v.name}</p>
                <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {v.area}
                </p>
              </div>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                style={{ background: `${c}22`, color: c, border: `1px solid ${c}66` }}
              >
                {v.match}% match
              </span>
            </div>
            <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {v.tags}
            </p>
          </div>
        )
      })}

      <div className="mt-auto flex gap-1.5">
        <div
          className="flex-1 rounded-full text-center text-[10px] py-2 font-semibold border"
          style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}
        >
          Could work
        </div>
        <div
          className="flex-1 rounded-full text-center text-[10px] py-2 font-semibold"
          style={{ background: '#FFB84D', color: '#0A0A1A' }}
        >
          Love it ❤
        </div>
      </div>
    </div>
  )
}

export default function AppMockup({ variant, className, bareFrame }: AppMockupProps) {
  const Inner =
    variant === 'pills' ? <PillsMockup /> : variant === 'avatars' ? <AvatarsMockup /> : <VenuesMockup />

  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <PhoneFrame bareFrame={bareFrame}>{Inner}</PhoneFrame>
    </div>
  )
}
