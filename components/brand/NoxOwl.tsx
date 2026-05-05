interface NoxOwlProps {
  size?: number
  className?: string
  withFrame?: boolean
  /** When true, renders an outline-only version (for nav/footer). */
  outline?: boolean
  ariaLabel?: string
}

/**
 * Stylised NOX owl illustration. Brand colours:
 *   #FFB84D amber eyes / accents
 *   #B87333 golden body
 *   #1C2340 dark background
 *
 * Designed as a placeholder until the final illustration lands —
 * rendered at any size; pure SVG so it scales crisply.
 */
export default function NoxOwl({
  size = 240,
  className,
  withFrame = false,
  outline = false,
  ariaLabel = 'NOX the owl',
}: NoxOwlProps) {
  if (outline) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img"
        aria-label={ariaLabel}
      >
        {/* Body silhouette */}
        <path
          d="M32 8c-9 0-16 7-16 17v8c0 11 7 22 16 22s16-11 16-22v-8c0-10-7-17-16-17z"
          fill="none"
          stroke="#FFB84D"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Ear tufts */}
        <path
          d="M22 10l4 6M42 10l-4 6"
          stroke="#FFB84D"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Eyes */}
        <circle cx="26" cy="26" r="3" fill="#FFB84D" />
        <circle cx="38" cy="26" r="3" fill="#FFB84D" />
        {/* Beak */}
        <path d="M32 31l-2 4h4l-2-4z" fill="#FFB84D" />
      </svg>
    )
  }

  const Owl = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <radialGradient id="nox-glow" cx="50%" cy="35%" r="55%">
          <stop offset="0%" stopColor="rgba(255,184,77,0.18)" />
          <stop offset="100%" stopColor="rgba(255,184,77,0)" />
        </radialGradient>
        <linearGradient id="nox-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C88A4A" />
          <stop offset="100%" stopColor="#B87333" />
        </linearGradient>
        <linearGradient id="nox-belly" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D9A56A" />
          <stop offset="100%" stopColor="#B87333" />
        </linearGradient>
        <radialGradient id="nox-eye" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFD58A" />
          <stop offset="60%" stopColor="#FFB84D" />
          <stop offset="100%" stopColor="#E89A2C" />
        </radialGradient>
      </defs>

      {/* Soft glow behind */}
      <circle cx="100" cy="100" r="92" fill="url(#nox-glow)" />

      {/* Branch perch */}
      <path
        d="M40 168 Q100 178 160 168"
        stroke="#3B2F1E"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />

      {/* Body */}
      <path
        d="M100 38
           C 64 38, 44 64, 44 100
           C 44 138, 70 168, 100 168
           C 130 168, 156 138, 156 100
           C 156 64, 136 38, 100 38 Z"
        fill="url(#nox-body)"
      />

      {/* Ear tufts */}
      <path d="M60 50 L72 36 L78 56 Z" fill="#9C5F26" />
      <path d="M140 50 L128 36 L122 56 Z" fill="#9C5F26" />

      {/* Belly highlight */}
      <path
        d="M100 70
           C 80 70, 72 92, 72 116
           C 72 140, 88 160, 100 160
           C 112 160, 128 140, 128 116
           C 128 92, 120 70, 100 70 Z"
        fill="url(#nox-belly)"
        opacity="0.85"
      />

      {/* Wing feather hints */}
      <path d="M58 96 Q66 110 58 126" stroke="#8C5526" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M64 108 Q72 120 64 134" stroke="#8C5526" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.55" />
      <path d="M142 96 Q134 110 142 126" stroke="#8C5526" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M136 108 Q128 120 136 134" stroke="#8C5526" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.55" />

      {/* Eye discs */}
      <circle cx="78" cy="92" r="22" fill="#1C2340" />
      <circle cx="122" cy="92" r="22" fill="#1C2340" />

      {/* Iris (amber) */}
      <circle cx="78" cy="92" r="14" fill="url(#nox-eye)" />
      <circle cx="122" cy="92" r="14" fill="url(#nox-eye)" />

      {/* Pupils */}
      <circle cx="78" cy="92" r="5.5" fill="#1C2340" />
      <circle cx="122" cy="92" r="5.5" fill="#1C2340" />

      {/* Eye shine */}
      <circle cx="74" cy="88" r="2" fill="#FFF6E0" opacity="0.9" />
      <circle cx="118" cy="88" r="2" fill="#FFF6E0" opacity="0.9" />

      {/* Eye ridge between */}
      <path d="M96 88 Q100 78 104 88" stroke="#9C5F26" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Beak */}
      <path d="M100 108 L93 122 Q100 126 107 122 Z" fill="#FFB84D" stroke="#9C5F26" strokeWidth="1" strokeLinejoin="round" />

      {/* Feet */}
      <path d="M86 168 L82 176 M90 168 L92 176" stroke="#FFB84D" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M114 168 L118 176 M110 168 L108 176" stroke="#FFB84D" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )

  if (!withFrame) return <div className={className}>{Owl}</div>

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        background:
          'radial-gradient(ellipse at 50% 30%, rgba(45,92,246,0.18), transparent 70%), #1C2340',
        borderRadius: 24,
        border: '1px solid rgba(255,184,77,0.18)',
        boxShadow: '0 30px 80px rgba(58,12,107,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {Owl}
    </div>
  )
}
