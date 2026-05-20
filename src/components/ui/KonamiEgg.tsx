'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'

const SEQUENCE = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
]

export function KonamiEgg() {
  const [active, setActive] = useState(false)
  const seqIdx = useRef(0)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== SEQUENCE[seqIdx.current]) {
        seqIdx.current = e.key === SEQUENCE[0] ? 1 : 0
        return
      }
      seqIdx.current += 1
      if (seqIdx.current === SEQUENCE.length) {
        setActive(true)
        seqIdx.current = 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: 'rgba(27,26,31,0.94)', backdropFilter: 'blur(8px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => setActive(false)}
        >
          <motion.div
            className="text-center px-8 max-w-lg"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            onClick={e => e.stopPropagation()}
          >
            {/* Decorative clay blob */}
            <motion.div
              className="mx-auto mb-8"
              style={{ width: 64, height: 64 }}
              animate={{ rotate: [0, 5, -4, 3, 0], scale: [1, 1.08, 1.04, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12,14 C8,4 28,-2 42,6 C56,14 62,30 58,46 C54,60 36,68 22,60 C8,52 2,38 6,24 C9,14 14,20 12,14 Z"
                  fill="#C9A9C7" opacity="0.9"
                />
              </svg>
            </motion.div>

            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.16em',
              color: '#C9A9C7',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Easter egg unlocked
            </p>

            <h2 style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(48px, 8vw, 88px)',
              color: '#F4EFE6',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              marginBottom: '24px',
            }}>
              You found it.
            </h2>

            <p style={{
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: '16px',
              lineHeight: 1.78,
              color: '#4A4751',
              marginBottom: '36px',
            }}>
              Not many people make it this far.<br />
              If you&apos;re a developer — I see you. Respect.
            </p>

            <button
              onClick={() => setActive(false)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#C9A9C7',
                background: 'none',
                border: '1px solid rgba(201,169,199,0.3)',
                padding: '10px 22px',
                borderRadius: '3px',
                cursor: 'pointer',
              }}
            >
              Close ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
