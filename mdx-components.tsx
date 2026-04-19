import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1
        className="text-3xl md:text-4xl font-semibold text-white mb-6 mt-10 leading-tight"
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className="text-2xl md:text-3xl font-semibold text-white mb-4 mt-10 leading-tight"
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="text-xl font-semibold text-white mb-3 mt-8"
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: 'var(--nw-slate)' }}>
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="mb-6 space-y-2" style={{ color: 'var(--nw-slate)' }}>
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li className="flex gap-2 text-base md:text-lg leading-relaxed">
        <span style={{ color: 'var(--nw-amber)' }}>•</span>
        <span>{children}</span>
      </li>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="font-medium transition-colors hover:text-white underline underline-offset-4"
        style={{ color: 'var(--nw-amber)' }}
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="border-l-4 pl-6 py-1 my-6 italic"
        style={{ borderColor: 'var(--nw-amber)', color: 'var(--nw-slate)' }}
      >
        {children}
      </blockquote>
    ),
    ...components,
  }
}
