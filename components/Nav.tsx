'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import NoxOwl from '@/components/brand/NoxOwl'

const navLinks = [
  { label: 'How it Works', href: '/how-it-works' },
  { label: 'Beacon', href: '/beacon' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
]

function NoxIcon({ size = 32 }: { size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 overflow-hidden"
      style={{
        width: size,
        height: size,
        background: '#1C2340',
        border: '1.5px solid rgba(255,184,77,0.4)',
        boxShadow: '0 2px 8px rgba(255,184,77,0.18)',
      }}
    >
      <NoxOwl size={size * 0.86} ariaLabel="Nightwise — home" />
    </div>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(0,0,0,0.6)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setMenuOpen(false)}>
            <NoxIcon size={36} />
            <span
              className="text-white font-semibold text-lg tracking-tight"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Nightwise
            </span>
          </Link>

          {/* Centre links — desktop */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: 'var(--nw-slate)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--nw-white)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--nw-slate)')}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right CTA + hamburger */}
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="https://nightwise.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105"
              style={{
                background: 'var(--nw-amber)',
                color: 'var(--nw-dark)',
                boxShadow: '0 4px 20px rgba(255,184,77,0.25)',
              }}
            >
              Plan a night out →
            </a>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 rounded-lg"
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span
                className="block w-6 h-0.5 bg-white rounded-full transition-all duration-300 origin-center"
                style={{ transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }}
              />
              <span
                className="block w-6 h-0.5 bg-white rounded-full transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'scaleX(0)' : 'none' }}
              />
              <span
                className="block w-6 h-0.5 bg-white rounded-full transition-all duration-300 origin-center"
                style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile slide-in drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 z-50 w-80 flex flex-col md:hidden"
            style={{ background: '#0D0D2B', borderLeft: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <NoxIcon size={32} />
                <span className="text-white font-semibold" style={{ fontFamily: 'var(--font-poppins)' }}>
                  Nightwise
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white/60 hover:text-white w-11 h-11 flex items-center justify-center"
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex-1 px-6 pt-6 flex flex-col gap-1">
              {navLinks.map(({ label, href }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={href}
                    className="block text-xl font-medium text-white py-4 border-b hover:text-[#FFB84D] transition-colors"
                    style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="px-6 pb-10">
              <a
                href="https://nightwise.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center font-semibold py-4 rounded-full transition-all hover:scale-105"
                style={{ background: 'var(--nw-amber)', color: 'var(--nw-dark)' }}
                onClick={() => setMenuOpen(false)}
              >
                Plan a night out →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
