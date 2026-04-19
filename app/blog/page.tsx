import type { Metadata } from 'next'
import Link from 'next/link'
import { posts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog \u2014 Nightwise',
  description: 'Nightlife planning tips, group psychology, and AI insights from the Nightwise team.',
}

export default function BlogIndexPage() {
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
          The Nightwise blog
        </span>
        <h1
          className="font-semibold text-white"
          style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
        >
          From the desk of NOX
        </h1>
        <p className="mt-4 text-base md:text-lg max-w-xl mx-auto" style={{ color: 'var(--nw-slate)' }}>
          Nightlife, group dynamics, and the AI that mediates both.
        </p>
      </section>

      {/* Post grid */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              {/* Cover image placeholder */}
              <div
                className="w-full h-48 border-b flex items-center justify-center"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(255,255,255,0.06)',
                }}
              >
                <p className="text-xs" style={{ color: 'rgba(136,146,166,0.5)' }}>
                  Cover image placeholder
                </p>
              </div>

              <div className="p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: 'rgba(255,184,77,0.1)',
                      color: 'var(--nw-amber)',
                    }}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--nw-slate)' }}>
                    {post.readingTime}
                  </span>
                </div>

                <h2
                  className="font-semibold text-white mb-3 leading-snug group-hover:text-[#FFB84D] transition-colors"
                  style={{ fontFamily: 'var(--font-poppins)', fontSize: '1.2rem' }}
                >
                  {post.title}
                </h2>

                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--nw-slate)' }}>
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full border-2 border-dashed flex items-center justify-center text-xs"
                      style={{ borderColor: 'rgba(255,184,77,0.3)' }}
                    >
                      🦉
                    </div>
                    <span className="text-xs font-medium" style={{ color: 'var(--nw-slate)' }}>
                      {post.author}
                    </span>
                  </div>
                  <span className="text-xs" style={{ color: 'var(--nw-slate)' }}>
                    {new Date(post.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
