import type { Metadata } from 'next'
import { PricingPage } from '@/components/pricing/PricingPage'

export const metadata: Metadata = {
  title: 'Pricing — CodeSculptSolutions',
  description: 'Transparent, project-based pricing for web development, mobile apps, UI/UX design, and custom systems. Auto-detected for your region.',
}

export default function Page() {
  return <PricingPage />
}
