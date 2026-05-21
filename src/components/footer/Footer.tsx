'use client'

import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'

export function Footer() {
  return (
    <footer
      className="border-t border-ink/10 py-12 md:py-16"
      style={{ backgroundColor: 'var(--color-canvas)' }}
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

          {/* Left — studio mark + tagline */}
          <div>
            <div
              className="mb-2 text-ink"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: '14px',
                letterSpacing: '-0.01em',
              }}
            >
              Code Sculpt Solutions
            </div>
            <em
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontStyle: 'italic',
                fontSize: '14px',
                color: 'var(--color-ink-soft)',
              }}
            >
              Built with Code. Crafted with Purpose.
            </em>
          </div>

          {/* Right — copyright + build info */}
          <div className="flex flex-col items-start md:items-end gap-1">
            <span
              className="text-ink-soft"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '0.06em' }}
            >
              © {new Date().getFullYear()} Jake Lourence A. Villar
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.05em', color: 'rgba(74,71,81,0.45)' }}>
              Next.js 16 · TypeScript · Framer Motion · Vercel
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
