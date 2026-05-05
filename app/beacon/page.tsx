import type { Metadata } from 'next'
import BeaconHero from '@/components/beacon/BeaconHero'
import AuditTool from '@/components/beacon/AuditTool'
import SixPillars from '@/components/beacon/SixPillars'
import HonestAiNote from '@/components/beacon/HonestAiNote'
import EarlyResults from '@/components/beacon/EarlyResults'
import BeaconPricing from '@/components/beacon/BeaconPricing'
import FoundingVenue from '@/components/beacon/FoundingVenue'
import FaqAccordion from '@/components/beacon/FaqAccordion'

export const metadata: Metadata = {
  title: 'Nightwise Beacon \u2014 AI Visibility Audit for London Venues',
  description:
    'Find out how visible your venue is to AI, Google, TikTok and beyond. Free audit tool for London venue owners. No signup required.',
  openGraph: {
    title: 'Nightwise Beacon \u2014 AI Visibility Audit for London Venues',
    description:
      'Find out how visible your venue is to AI, Google, TikTok and beyond. Free audit tool for London venue owners.',
    images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
  },
}

export default function BeaconPage() {
  return (
    <>
      <BeaconHero />
      <AuditTool />
      <SixPillars />
      <HonestAiNote />
      <EarlyResults />
      <BeaconPricing />
      <FoundingVenue />
      <FaqAccordion />
    </>
  )
}
