import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About \u2014 Nightwise',
  description:
    "Meet the team behind Nightwise and NOX the Owl. We're fixing how groups decide where to go on a night out.",
  openGraph: {
    title: 'About Nightwise',
    description: "We're fixing how groups decide where to go.",
    images: [{ url: '/og-placeholder.png', width: 1200, height: 630 }],
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
