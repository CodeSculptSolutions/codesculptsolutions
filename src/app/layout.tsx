import type { Metadata } from 'next'
import { Manrope, Fraunces, JetBrains_Mono, Caveat } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/components/ui/SmoothScroll'
import { ThemeProvider } from '@/components/ui/ThemeProvider'

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
  title: {
    default: 'Code Sculpt Solutions — Built with Code. Crafted with Purpose.',
    template: '%s — Code Sculpt Solutions',
  },
  description:
    'Software studio in Cebu, Philippines building web apps, mobile apps, UI/UX design, and custom systems. React, Next.js, React Native specialists.',
  keywords: [
    'web development Cebu',
    'mobile app development Philippines',
    'software studio Cebu',
    'UI/UX design Philippines',
    'custom software development Cebu',
    'React developer Philippines',
    'Next.js developer Cebu',
    'React Native developer Philippines',
    'Code Sculpt Solutions',
    'app development Cebu',
    'web design Cebu',
    'software company Philippines',
  ],
  authors: [{ name: 'Jake Lourence A. Villar' }],
  creator: 'Code Sculpt Solutions',
  publisher: 'Code Sculpt Solutions',
  alternates: {
    canonical: 'https://codesculptsolutions.com',
  },
  openGraph: {
    title: 'Code Sculpt Solutions — Built with Code. Crafted with Purpose.',
    description:
      'Software studio in Cebu, Philippines building web apps, mobile apps, UI/UX design, and custom systems.',
    url: 'https://codesculptsolutions.com',
    siteName: 'Code Sculpt Solutions',
    type: 'website',
    locale: 'en_PH',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code Sculpt Solutions — Built with Code. Crafted with Purpose.',
    description:
      'Software studio in Cebu, Philippines building web apps, mobile apps, UI/UX design, and custom systems.',
    creator: '@codesculpt',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
              '@type': 'ProfessionalService',
              name: 'Code Sculpt Solutions',
              url: 'https://codesculptsolutions.com',
              logo: 'https://codesculptsolutions.com/logo-mark.svg',
              image: 'https://codesculptsolutions.com/opengraph-image',
              description:
                'Software studio in Cebu, Philippines specializing in web apps, mobile apps, UI/UX design, and custom systems.',
              founder: { '@type': 'Person', name: 'Jake Lourence A. Villar' },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Mandaue City',
                addressRegion: 'Cebu',
                addressCountry: 'PH',
              },
              areaServed: [
                { '@type': 'City', name: 'Cebu City' },
                { '@type': 'Country', name: 'Philippines' },
                { '@type': 'Place', name: 'Worldwide' },
              ],
              serviceType: [
                'Web Development',
                'Mobile App Development',
                'UI/UX Design',
                'Custom Software Development',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'hello@codesculptsolutions.com',
                contactType: 'customer service',
                areaServed: 'PH',
                availableLanguage: 'English',
              },
              knowsAbout: [
                'React',
                'Next.js',
                'React Native',
                'TypeScript',
                'UI/UX Design',
                'Mobile App Development',
                'Web Development',
              ],
            }),
          }}
        />
      </head>
      <body className="grain">
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
