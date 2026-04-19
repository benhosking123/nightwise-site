import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const poppins = Poppins({
  weight: ['600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

const inter = Inter({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nightwise \u2014 Skip the group chat drama',
  description:
    "NOX the Owl plans your night out \u2014 so your mates don't have to argue about it. AI-powered group nightlife planning, based in London.",
  metadataBase: new URL('https://nightwise.co'),
  openGraph: {
    title: 'Nightwise \u2014 Skip the group chat drama',
    description:
      "NOX the Owl plans your night out \u2014 so your mates don't have to argue about it.",
    type: 'website',
    url: 'https://nightwise.co',
    images: [{ url: '/og-placeholder.png', width: 1200, height: 630, alt: 'Nightwise' }],
    siteName: 'Nightwise',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nightwise \u2014 Skip the group chat drama',
    description:
      "NOX the Owl plans your night out \u2014 so your mates don't have to argue about it.",
    images: ['/og-placeholder.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
