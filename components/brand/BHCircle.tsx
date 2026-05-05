interface BHCircleProps {
  size?: number
  initials?: string
  className?: string
  ariaLabel?: string
}

/**
 * Founder photo placeholder — circular monogram in brand colours.
 * Designed to read as intentional rather than missing.
 */
export default function BHCircle({
  size = 176,
  initials = 'BH',
  className,
  ariaLabel = 'Ben Hosking — Founder',
}: BHCircleProps) {
  return (
    <div
      className={className}
      role="img"
      aria-label={ariaLabel}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background:
          'radial-gradient(circle at 30% 30%, #FFB84D 0%, #B87333 55%, #5C3A1C 100%)',
        boxShadow:
          '0 18px 48px rgba(255,184,77,0.25), inset 0 -4px 18px rgba(0,0,0,0.35), inset 0 2px 6px rgba(255,255,255,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle starfield speckle */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={{ position: 'absolute', inset: 0, opacity: 0.18, mixBlendMode: 'overlay' }}
        aria-hidden="true"
      >
        <circle cx="20" cy="22" r="0.8" fill="#fff" />
        <circle cx="74" cy="18" r="1.1" fill="#fff" />
        <circle cx="86" cy="62" r="0.9" fill="#fff" />
        <circle cx="14" cy="74" r="1" fill="#fff" />
        <circle cx="60" cy="80" r="0.7" fill="#fff" />
        <circle cx="36" cy="48" r="0.6" fill="#fff" />
      </svg>
      <span
        style={{
          fontFamily: 'var(--font-poppins), system-ui, sans-serif',
          fontWeight: 700,
          fontSize: size * 0.34,
          color: '#1C2340',
          letterSpacing: '-0.02em',
          textShadow: '0 1px 0 rgba(255,255,255,0.18)',
        }}
      >
        {initials}
      </span>
    </div>
  )
}
