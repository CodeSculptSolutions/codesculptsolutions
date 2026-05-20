'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE_OUT_EXPO } from '@/lib/motion'

const mono = { fontFamily: "'JetBrains Mono', monospace" }
const sans = { fontFamily: "'Manrope', system-ui, sans-serif" }
const serif = { fontFamily: "'Fraunces', Georgia, serif" }
const label = { ...mono, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' as const }
const codeChip = { ...mono, fontSize: '12px', backgroundColor: '#D4C9BB', padding: '1px 5px', borderRadius: '2px', color: '#1B1A1F' }

const NOTES = [
  {
    id: 'principle',
    content: (
      <p style={{ ...serif, fontStyle: 'italic', fontSize: 'clamp(22px, 3vw, 30px)', lineHeight: 1.3, color: '#1B1A1F', letterSpacing: '-0.01em' }}>
        &ldquo;The best code I ever wrote is the code I talked myself out of writing.&rdquo;
      </p>
    ),
    bg: '#F4EFE6',
    border: 'none',
    span: 'col-span-1 md:col-span-2',
  },
  {
    id: 'joke',
    content: (
      <div>
        <div className="mb-4" style={{ ...label, color: '#C9A9C7' }}>Studio humor</div>
        <p style={{ ...serif, fontStyle: 'italic', fontSize: '18px', lineHeight: 1.55, color: '#F4EFE6' }}>
          &ldquo;99 little bugs in the code. Take one down, patch it around. 127 little bugs in the code.&rdquo;
        </p>
        <p className="mt-5" style={{ ...mono, fontSize: '11px', color: '#4A4751', letterSpacing: '0.06em' }}>
          — every senior dev, 3am
        </p>
      </div>
    ),
    bg: '#2B2730',
    border: 'none',
    span: 'col-span-1',
  },
  {
    id: 'code-snippet',
    content: (
      <div>
        <div className="mb-3" style={{ ...label, color: '#4A4751' }}>Hook I reach for constantly</div>
        <pre style={{ ...mono, fontSize: '11.5px', lineHeight: 1.8, color: '#1B1A1F', overflow: 'auto', whiteSpace: 'pre' }}>{`function useDebounce<T>(
  value: T,
  delay = 300
): T {
  const [v, setV] = useState(value)
  useEffect(() => {
    const t = setTimeout(
      () => setV(value), delay
    )
    return () => clearTimeout(t)
  }, [value, delay])
  return v
}`}</pre>
      </div>
    ),
    bg: '#E8DFD0',
    border: 'none',
    span: 'col-span-1',
  },
  {
    id: 'rn-lesson',
    content: (
      <div>
        <div className="mb-3" style={{ ...label, color: '#4A4751' }}>Lesson from Budqo</div>
        <p style={{ ...sans, fontSize: '14px', lineHeight: 1.78, color: '#4A4751' }}>
          <code style={codeChip}>FlatList</code> with unstable <code style={codeChip}>keyExtractor</code> keys causes re-render thrash invisible in dev — only shows up in production on a 4-year-old Android. Profile on the actual device, not the simulator.
        </p>
      </div>
    ),
    bg: '#F4EFE6',
    border: 'none',
    span: 'col-span-1',
  },
  {
    id: 'currently-using',
    content: (
      <div>
        <div className="mb-4" style={{ ...label, color: '#4A4751' }}>In the studio right now</div>
        <ul style={{ ...sans, fontSize: '14px', lineHeight: 1.6, color: '#4A4751', listStyle: 'none', padding: 0, margin: 0 }} className="space-y-2">
          {[
            ['Tools', 'Zed, Figma, TablePlus'],
            ['Stack', 'Next.js 16, Expo 53, tRPC'],
            ['Fonts', 'General Sans, Fraunces'],
            ['Listening', 'Floating Points — Crush'],
            ['Obsessing over', 'type-safe everything'],
          ].map(([l, v]) => (
            <li key={l} className="flex gap-3">
              <span style={{ ...mono, fontSize: '11px', color: '#C9A9C7', flexShrink: 0, lineHeight: 1.9 }}>{l}</span>
              <span>{v}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
    bg: 'rgba(201,169,199,0.15)',
    border: '1px solid rgba(201,169,199,0.3)',
    span: 'col-span-1',
  },
  {
    id: 'observation',
    content: (
      <div>
        <div className="mb-3" style={{ ...label, color: '#4A4751' }}>On building for government</div>
        <p style={{ ...sans, fontSize: '15px', lineHeight: 1.78, color: '#4A4751' }}>
          The users who benefit most from good software are the ones nobody designs for — the clerk processing 200 forms a day. Make it fast, make it keyboard-friendly, make it survive a four-year-old Firefox install. Speed is a feature they&apos;ll never thank you for but will feel every single day.
        </p>
      </div>
    ),
    bg: '#F4EFE6',
    border: 'none',
    span: 'col-span-1 md:col-span-2',
  },
  {
    id: 'naming',
    content: (
      <div>
        <div className="mb-3" style={{ ...label, color: '#4A4751' }}>Hot take</div>
        <p style={{ ...sans, fontSize: '14px', lineHeight: 1.78, color: '#4A4751' }}>
          A good variable name is worth more than a comment. If you need a comment to explain what the name means, the name is wrong.
        </p>
        <p className="mt-4" style={{ ...mono, fontSize: '11px', color: '#A8BBD6', letterSpacing: '0.04em' }}>
          — me, during every code review
        </p>
      </div>
    ),
    bg: 'rgba(168,187,214,0.18)',
    border: '1px solid rgba(168,187,214,0.3)',
    span: 'col-span-1',
  },
]

export function Notes() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="notes" ref={ref} className="py-24 md:py-40" aria-labelledby="notes-heading">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="flex items-baseline justify-between mb-14 flex-wrap gap-4">
          <motion.h2
            id="notes-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(40px, 5vw, 72px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#1B1A1F',
            }}
          >
            Studio{' '}
            <em style={{ ...serif, fontStyle: 'italic', color: '#C9A9C7' }}>
              notes
            </em>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.2 }}
            style={{ ...mono, fontSize: '11px', letterSpacing: '0.08em', color: '#4A4751', textTransform: 'uppercase' }}
          >
            Last updated: May 2026
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {NOTES.map((note, i) => (
            <motion.div
              key={note.id}
              className={`p-8 rounded-sm ${note.span}`}
              style={{ backgroundColor: note.bg, border: note.border || 'none' }}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: i * 0.08 }}
            >
              {note.content}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
