import Link from 'next/link'

const navLinks = [
  { label: 'How it Works', href: '/how-it-works' },
  { label: 'Beacon', href: '/beacon' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Press', href: '/press' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer
      className="py-16 px-6"
      style={{ background: 'var(--nw-dark)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* NOX icon */}
        <div
          className="w-14 h-14 rounded-full border-2 border-dashed flex items-center justify-center text-2xl mb-8 transition-transform hover:scale-110"
          style={{ borderColor: 'rgba(255,184,77,0.3)' }}
        >
          🦉
        </div>

        {/* Wordmark */}
        <span
          className="text-white font-semibold text-lg mb-8 tracking-tight"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          Nightwise
        </span>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm transition-colors duration-200 hover:text-white"
              style={{ color: 'var(--nw-slate)' }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Social */}
        <div className="flex gap-8 mb-10">
          <a
            href="https://tiktok.com/@nightwiseuk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors duration-200 hover:text-white"
            style={{ color: 'var(--nw-slate)' }}
          >
            @nightwiseuk &mdash; TikTok
          </a>
          <a
            href="https://instagram.com/nightwiseuk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors duration-200 hover:text-white"
            style={{ color: 'var(--nw-slate)' }}
          >
            Instagram
          </a>
        </div>

        <p className="text-xs" style={{ color: 'var(--nw-slate)' }}>
          &copy; Nightwise 2026
        </p>
      </div>
    </footer>
  )
}
