import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Press Kit \u2014 Nightwise',
  description: 'Press kit, brand assets, and media information for Nightwise.',
  openGraph: {
    title: 'Nightwise Press Kit',
    description: 'Brand assets, key facts, and press contact for Nightwise.',
    images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
  },
}

export default function PressLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
