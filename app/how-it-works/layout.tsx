import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works \u2014 Nightwise',
  description:
    'See how NOX the Owl plans your group night out from first message to last venue. Three taps, one plan, zero drama.',
  openGraph: {
    title: 'How Nightwise Works',
    description: 'From "where shall we go?" to "we\'re here" in minutes.',
    images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
  },
}

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
