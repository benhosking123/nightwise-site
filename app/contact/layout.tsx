import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact \u2014 Nightwise',
  description:
    'Get in touch with Nightwise for venue partnerships, press enquiries, or investor interest.',
  openGraph: {
    title: 'Contact Nightwise',
    description: 'Get in touch for partnerships, press, or investment.',
    images: [{ url: '/og-placeholder.png', width: 1200, height: 630 }],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
