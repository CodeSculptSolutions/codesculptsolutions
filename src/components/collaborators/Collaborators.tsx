'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE_OUT_EXPO } from '@/lib/motion'

const COLLABORATORS = [
  { name: 'Dokio Software (AU)', href: 'https://dokio.co' },
  { name: 'Raykan Technologies', href: 'https://www.raykan.co' },
  { name: 'Minokode', href: 'https://minokode.com' },
  { name: 'City Government of Mandaue', href: null },
  { name: "Father & Sons' Music", href: null },
]

export function Collaborators() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-40 md:py-56" aria-label="Collaborators">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          <p
            className="text-ink-soft mb-6"
            style={{
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: '15px',
              fontStyle: 'italic',
            }}
          >
            In collaboration with, and shipping for:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
            {COLLABORATORS.map((c, i) => (
              <span key={c.name} className="flex items-center gap-4">
                {i > 0 && (
                  <span className="text-ink-soft opacity-30" aria-hidden="true">
                    •
                  </span>
                )}
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-ink-soft transition-all duration-200"
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontWeight: 500,
                      fontSize: '14px',
                      letterSpacing: '0.06em',
                      textTransform: 'none',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      el.style.color = '#1B1A1F'
                      el.style.letterSpacing = '0.04em'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      el.style.color = '#4A4751'
                      el.style.letterSpacing = '0.06em'
                    }}
                  >
                    {c.name}
                  </a>
                ) : (
                  <span
                    className="text-ink-soft transition-all duration-200"
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontWeight: 500,
                      fontSize: '14px',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {c.name}
                  </span>
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
