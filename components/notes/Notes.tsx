'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE_OUT_EXPO, staggerContainer } from '@/lib/motion'

const NOTES = [
  {
    id: 'principle',
    type: 'quote',
    content: (
      <p
        style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontStyle: 'italic',
          fontSize: 'clamp(22px, 3vw, 32px)',
          lineHeight: 1.3,
          color: '#1B1A1F',
          letterSpacing: '-0.01em',
        }}
      >
        &ldquo;Ship the boring version first. Polish the right things second.&rdquo;
      </p>
    ),
    bg: '#F4EFE6',
    span: 'col-span-1 md:col-span-2',
  },
  {
    id: 'rn-lesson',
    type: 'note',
    content: (
      <div>
        <div
          className="mb-3 text-ink-soft"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          Lesson from Budqo
        </div>
        <p
          style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: '14px', lineHeight: 1.75, color: '#4A4751' }}
        >
          Turns out{' '}
          <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', backgroundColor: '#E8DFD0', padding: '1px 4px', borderRadius: '2px', color: '#1B1A1F' }}>
            FlatList
          </code>{' '}
          with{' '}
          <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', backgroundColor: '#E8DFD0', padding: '1px 4px', borderRadius: '2px', color: '#1B1A1F' }}>
            keyExtractor
          </code>{' '}
          returning unstable keys causes re-render thrash you won&apos;t see in dev — only in production on a 4-year-old phone. Profile on the device, not the simulator.
        </p>
      </div>
    ),
    bg: '#F4EFE6',
    span: 'col-span-1',
  },
  {
    id: 'code-snippet',
    type: 'code',
    content: (
      <div>
        <div
          className="mb-3 text-ink-soft"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          A pattern I keep using
        </div>
        <pre
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            lineHeight: 1.75,
            color: '#1B1A1F',
            overflow: 'auto',
            whiteSpace: 'pre',
          }}
        >{`async function getUser(id: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}`}</pre>
      </div>
    ),
    bg: '#E8DFD0',
    span: 'col-span-1',
  },
  {
    id: 'book-quote',
    type: 'book',
    content: (
      <div>
        <div
          className="mb-3 text-ink-soft"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          Currently reading
        </div>
        <blockquote
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontStyle: 'italic',
            fontSize: '18px',
            lineHeight: 1.6,
            color: '#1B1A1F',
            borderLeft: '2px solid #C9A9C7',
            paddingLeft: '16px',
          }}
        >
          &ldquo;A designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away.&rdquo;
        </blockquote>
        <div
          className="mt-3 text-ink-soft"
          style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: '13px' }}
        >
          — Antoine de Saint-Exupéry
        </div>
      </div>
    ),
    bg: '#F4EFE6',
    span: 'col-span-1',
  },
  {
    id: 'currently-using',
    type: 'list',
    content: (
      <div>
        <div
          className="mb-4 text-ink-soft"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          In the studio right now
        </div>
        <ul
          className="space-y-2"
          style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: '14px', lineHeight: 1.6, color: '#4A4751', listStyle: 'none', padding: 0 }}
        >
          {[
            ['Tools', 'Cursor, Zed, Figma'],
            ['Stack', 'Next.js 16, Expo 53'],
            ['Fonts', 'General Sans, Fraunces'],
            ['Listening', 'Nils Frahm — All Melody'],
            ['Thinking about', 'what makes software feel kind'],
          ].map(([label, val]) => (
            <li key={label} className="flex gap-3">
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#C9A9C7', flexShrink: 0, lineHeight: 1.9 }}>
                {label}
              </span>
              <span>{val}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
    bg: '#F4EFE6',
    span: 'col-span-1',
  },
  {
    id: 'observation',
    type: 'note',
    content: (
      <div>
        <div
          className="mb-3 text-ink-soft"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          On building for government
        </div>
        <p
          style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: '14px', lineHeight: 1.75, color: '#4A4751' }}
        >
          The users who benefit most from good software are the ones no one designs for — the clerk processing 200 forms a day. Make it fast, make it keyboard-friendly, make it work on a four-year-old Firefox install.
        </p>
      </div>
    ),
    bg: '#F4EFE6',
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
            <em style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic', color: '#C9A9C7' }}>
              notes
            </em>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.2 }}
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '0.08em', color: '#4A4751', textTransform: 'uppercase' }}
          >
            Last updated: May 2025
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {NOTES.map((note, i) => (
            <motion.div
              key={note.id}
              className={`p-8 rounded-sm ${note.span}`}
              style={{ backgroundColor: note.bg }}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: i * 0.1 }}
            >
              {note.content}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
