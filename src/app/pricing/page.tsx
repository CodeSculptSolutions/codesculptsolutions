import type { Metadata } from 'next'
import { PricingPage } from '@/components/pricing/PricingPage'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent, project-based pricing for web development, mobile apps, UI/UX design, and custom systems. Region-adjusted rates for Philippines and international clients.',
  alternates: {
    canonical: 'https://codesculptsolutions.com/pricing',
  },
  openGraph: {
    title: 'Pricing — Code Sculpt Solutions',
    description:
      'Transparent, project-based pricing for web development, mobile apps, UI/UX design, and custom systems.',
    url: 'https://codesculptsolutions.com/pricing',
  },
}

export default function Page() {
  return <PricingPage />
}
