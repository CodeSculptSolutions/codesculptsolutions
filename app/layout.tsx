import type { Metadata } from 'next'
import { Manrope, Fraunces, JetBrains_Mono, Caveat } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/components/ui/SmoothScroll'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['italic', 'normal'],
  axes: ['opsz'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://codesculptsolutions.com'),
  title: 'CodeSculptSolutions — Built with Code. Crafted with Purpose.',
  description:
    'A studio in Cebu making web, mobile, and custom systems for teams who care about how things feel — not just how they work.',
  keywords: ['web development', 'mobile apps', 'UI/UX design', 'React', 'Next.js', 'Cebu', 'Philippines'],
  authors: [{ name: 'Jake Lourence A. Villar' }],
  openGraph: {
    title: 'CodeSculptSolutions',
    description: 'Built with Code. Crafted with Purpose.',
    url: 'https://codesculptsolutions.com',
    siteName: 'CodeSculptSolutions',
    type: 'website',
    locale: 'en_PH',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CodeSculptSolutions — Built with Code. Crafted with Purpose.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeSculptSolutions',
    description: 'Built with Code. Crafted with Purpose.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${fraunces.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'CodeSculptSolutions',
              url: 'https://codesculptsolutions.com',
              description: 'A one-person studio making web, mobile, and custom systems.',
              founder: { '@type': 'Person', name: 'Jake Lourence A. Villar' },
              address: { '@type': 'PostalAddress', addressLocality: 'Mandaue City', addressRegion: 'Cebu', addressCountry: 'PH' },
              contactPoint: { '@type': 'ContactPoint', email: 'hello@codesculptsolutions.com', contactType: 'customer service' },
            }),
          }}
        />
      </head>
      <body className="grain">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
