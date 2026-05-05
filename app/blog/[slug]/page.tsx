import type { Metadata } from 'next'
import Link from 'next/link'
import { posts, getPost } from '@/lib/blog'
import { notFound } from 'next/navigation'
import NoxOwl from '@/components/brand/NoxOwl'

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} \u2014 Nightwise Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const { default: Post } = await import(`@/content/blog/${slug}.mdx`)

  return (
    <>
      {/* Cover illustration */}
      <div
        className="w-full flex items-center justify-center relative overflow-hidden"
        style={{
          height: '320px',
          background:
            'radial-gradient(ellipse at 25% 30%, rgba(255,184,77,0.2), transparent 60%), radial-gradient(ellipse at 75% 70%, rgba(45,92,246,0.25), transparent 60%), #1C2340',
          marginTop: '80px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <NoxOwl size={220} />
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ background: 'rgba(255,184,77,0.1)', color: 'var(--nw-amber)' }}
          >
            {post.category}
          </span>
          <span className="text-xs" style={{ color: 'var(--nw-slate)' }}>{post.readingTime}</span>
          <span className="text-xs" style={{ color: 'var(--nw-slate)' }}>
            {new Date(post.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>

        <h1
          className="font-semibold text-white mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
        >
          {post.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-3 mb-12 pb-8 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shrink-0"
            style={{
              background: '#1C2340',
              border: '1.5px solid rgba(255,184,77,0.4)',
              boxShadow: '0 2px 8px rgba(255,184,77,0.18)',
            }}
          >
            <NoxOwl size={32} />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{post.author}</p>
            <p className="text-xs" style={{ color: 'var(--nw-slate)' }}>Nightwise AI</p>
          </div>
        </div>

        {/* MDX content */}
        <div>
          <Post />
        </div>

        {/* CTA */}
        <div
          className="mt-16 rounded-2xl p-10 border text-center"
          style={{
            background: 'rgba(255,184,77,0.06)',
            borderColor: 'rgba(255,184,77,0.2)',
          }}
        >
          <p
            className="font-semibold text-white mb-6 text-xl"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Ready to skip the group chat drama?
          </p>
          <a
            href="https://nightwise.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full transition-all hover:scale-105"
            style={{
              background: 'var(--nw-amber)',
              color: 'var(--nw-dark)',
              boxShadow: '0 6px 24px rgba(255,184,77,0.25)',
            }}
          >
            Plan a night out &rarr;
          </a>
        </div>

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="text-sm transition-colors hover:text-white"
            style={{ color: 'var(--nw-slate)' }}
          >
            &larr; Back to blog
          </Link>
        </div>
      </article>
    </>
  )
}
