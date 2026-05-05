interface WordmarkProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Styled "Nightwise" wordmark — the second 'i' carries an amber dot
 * (a small nod to NOX's eyes). Used on the press kit + anywhere else
 * a clean wordmark is needed.
 */
export default function Wordmark({ className, size = 'md' }: WordmarkProps) {
  const fontSize = size === 'lg' ? '2.75rem' : size === 'sm' ? '1.25rem' : '2rem'
  const dotSize = size === 'lg' ? 8 : size === 'sm' ? 4 : 6
  const dotOffset = size === 'lg' ? -28 : size === 'sm' ? -14 : -20

  return (
    <span
      className={className}
      style={{
        fontFamily: 'var(--font-poppins), system-ui, sans-serif',
        fontWeight: 700,
        fontSize,
        color: '#F5F7FA',
        letterSpacing: '-0.02em',
        position: 'relative',
        display: 'inline-block',
      }}
    >
      Nightw
      <span style={{ position: 'relative' }}>
        i
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: dotOffset * 0.55,
            left: '50%',
            transform: 'translateX(-50%)',
            width: dotSize,
            height: dotSize,
            borderRadius: '50%',
            background: '#FFB84D',
            boxShadow: '0 0 8px rgba(255,184,77,0.6)',
          }}
        />
      </span>
      se
    </span>
  )
}
