'use client'

import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/jakelourencevillar' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jake-lourence-villar' },
  { label: 'Dribbble', href: 'https://dribbble.com/jakelourencevillar' },
]

export function Footer() {
  return (
    <footer
      className="border-t border-ink/10 py-12 md:py-16"
      style={{ backgroundColor: '#F4EFE6' }}
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
              CodeSculptSolutions
            </div>
            <em
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontStyle: 'italic',
                fontSize: '14px',
                color: '#4A4751',
              }}
            >
              Built with Code. Crafted with Purpose.
            </em>
          </div>

          {/* Center — social links */}
          <nav aria-label="Social links">
            <ul className="flex items-center gap-6" role="list">
              {SOCIALS.map((s, i) => (
                <li key={s.label} className="flex items-center gap-6">
                  {i > 0 && (
                    <span className="text-ink-soft opacity-30" aria-hidden="true">/</span>
                  )}
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="squiggle-link text-ink-soft hover:text-ink transition-colors duration-200"
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontWeight: 500,
                      fontSize: '13px',
                    }}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right — copyright + hidden pot */}
          <div className="flex items-center gap-4">
            <span
              className="text-ink-soft"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '0.06em' }}
            >
              © {new Date().getFullYear()} Jake Lourence A. Villar
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
