'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'
import { EASE_OUT_EXPO } from '@/lib/motion'

const mono = { fontFamily: "'JetBrains Mono', monospace" }
const sans = { fontFamily: "'Manrope', system-ui, sans-serif" }
const serif = { fontFamily: "'Fraunces', Georgia, serif" }
const label = { ...mono, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' as const }
const codeChip = { ...mono, fontSize: '12px', backgroundColor: '#D4C9BB', padding: '1px 5px', borderRadius: '2px', color: '#1B1A1F' }

// VSCode Dark+ palette
const K  = '#569cd6'
const F  = '#dcdcaa'
const P  = '#9cdcfe'
const TY = '#4ec9b0'
const NN = '#b5cea8'
const D  = '#d4d4d4'
const SS = '#ce9178'

type Tok = { t: string; c: string }

const HOOKS: { label: string; tokens: Tok[] }[] = [
  {
    label: 'Hook we reach for constantly',
    tokens: [
      { t: 'function ', c: K }, { t: 'useDebounce', c: F },
      { t: '<', c: D }, { t: 'T', c: TY }, { t: '>(\n  ', c: D },
      { t: 'value', c: P }, { t: ': ', c: D }, { t: 'T', c: TY },
      { t: ',\n  ', c: D }, { t: 'delay', c: P }, { t: ' = ', c: D },
      { t: '300', c: NN }, { t: '\n): ', c: D }, { t: 'T', c: TY },
      { t: ' {\n  ', c: D }, { t: 'const', c: K }, { t: ' [', c: D },
      { t: 'v', c: P }, { t: ', ', c: D }, { t: 'setV', c: F },
      { t: '] = useState(', c: D }, { t: 'value', c: P }, { t: ')\n  ', c: D },
      { t: 'useEffect', c: F }, { t: '(() => {\n    ', c: D },
      { t: 'const', c: K }, { t: ' ', c: D }, { t: 't', c: P },
      { t: ' = setTimeout(\n      () => ', c: D }, { t: 'setV', c: F },
      { t: '(', c: D }, { t: 'value', c: P }, { t: '), ', c: D },
      { t: 'delay', c: P }, { t: '\n    )\n    ', c: D },
      { t: 'return', c: K }, { t: ' () => clearTimeout(', c: D },
      { t: 't', c: P }, { t: ')\n  }, [', c: D }, { t: 'value', c: P },
      { t: ', ', c: D }, { t: 'delay', c: P }, { t: '])\n  ', c: D },
      { t: 'return', c: K }, { t: ' ', c: D }, { t: 'v', c: P },
      { t: '\n}', c: D },
    ],
  },
  {
    label: 'Another one we always ship with',
    tokens: [
      { t: 'function ', c: K }, { t: 'useLocalStorage', c: F },
      { t: '<', c: D }, { t: 'T', c: TY }, { t: '>(\n  ', c: D },
      { t: 'key', c: P }, { t: ': ', c: D }, { t: 'string', c: TY },
      { t: ',\n  ', c: D }, { t: 'init', c: P }, { t: ': ', c: D },
      { t: 'T', c: TY }, { t: '\n): [', c: D }, { t: 'T', c: TY },
      { t: ', (', c: D }, { t: 'v', c: P }, { t: ': ', c: D },
      { t: 'T', c: TY }, { t: ') => ', c: D }, { t: 'void', c: K },
      { t: '] {\n  ', c: D }, { t: 'const', c: K }, { t: ' [', c: D },
      { t: 'val', c: P }, { t: ', ', c: D }, { t: 'setVal', c: F },
      { t: '] = useState<', c: D }, { t: 'T', c: TY },
      { t: '>(() => {\n    ', c: D }, { t: 'const', c: K },
      { t: ' ', c: D }, { t: 'raw', c: P },
      { t: ' = localStorage.', c: D }, { t: 'getItem', c: F },
      { t: '(', c: D }, { t: 'key', c: P }, { t: ')\n    ', c: D },
      { t: 'return', c: K }, { t: ' ', c: D }, { t: 'raw', c: P },
      { t: ' ? JSON.', c: D }, { t: 'parse', c: F }, { t: '(', c: D },
      { t: 'raw', c: P }, { t: ') ', c: D }, { t: 'as', c: K },
      { t: ' ', c: D }, { t: 'T', c: TY }, { t: ' : ', c: D },
      { t: 'init', c: P }, { t: '\n  })\n  ', c: D },
      { t: 'const', c: K }, { t: ' ', c: D }, { t: 'save', c: F },
      { t: ' = (', c: D }, { t: 'v', c: P }, { t: ': ', c: D },
      { t: 'T', c: TY }, { t: ') => {\n    ', c: D },
      { t: 'setVal', c: F }, { t: '(', c: D }, { t: 'v', c: P },
      { t: ')\n    localStorage.', c: D }, { t: 'setItem', c: F },
      { t: '(\n      ', c: D }, { t: 'key', c: P },
      { t: ', JSON.', c: D }, { t: 'stringify', c: F },
      { t: '(', c: D }, { t: 'v', c: P },
      { t: ')\n    )\n  }\n  ', c: D },
      { t: 'return', c: K }, { t: ' [', c: D }, { t: 'val', c: P },
      { t: ', ', c: D }, { t: 'save', c: F }, { t: ']\n}', c: D },
    ],
  },
  {
    label: 'The classic UI pattern',
    tokens: [
      { t: 'function ', c: K }, { t: 'useOnClickOutside', c: F },
      { t: '(\n  ', c: D }, { t: 'ref', c: P },
      { t: ': RefObject<', c: D }, { t: 'Element', c: TY },
      { t: '>,\n  ', c: D }, { t: 'cb', c: P },
      { t: ': () => ', c: D }, { t: 'void', c: K },
      { t: '\n) {\n  ', c: D }, { t: 'useEffect', c: F },
      { t: '(() => {\n    ', c: D }, { t: 'const', c: K },
      { t: ' ', c: D }, { t: 'fn', c: F }, { t: ' = (', c: D },
      { t: 'e', c: P }, { t: ': ', c: D }, { t: 'MouseEvent', c: TY },
      { t: ') =>\n      !', c: D }, { t: 'ref', c: P },
      { t: '.current?.', c: D }, { t: 'contains', c: F },
      { t: '(\n        ', c: D }, { t: 'e', c: P },
      { t: '.target ', c: D }, { t: 'as', c: K }, { t: ' ', c: D },
      { t: 'Node', c: TY }, { t: '\n      ) && ', c: D },
      { t: 'cb', c: P }, { t: '()\n    document.', c: D },
      { t: 'addEventListener', c: F }, { t: '(', c: D },
      { t: "'mousedown'", c: SS }, { t: ', ', c: D },
      { t: 'fn', c: F }, { t: ')\n    ', c: D },
      { t: 'return', c: K }, { t: ' () =>\n      document.', c: D },
      { t: 'removeEventListener', c: F }, { t: '(', c: D },
      { t: "'mousedown'", c: SS }, { t: ', ', c: D },
      { t: 'fn', c: F }, { t: ')\n  }, [', c: D },
      { t: 'ref', c: P }, { t: ', ', c: D }, { t: 'cb', c: P },
      { t: '])\n}', c: D },
    ],
  },
  {
    label: 'Simple but powerful',
    tokens: [
      { t: 'function ', c: K }, { t: 'usePrevious', c: F },
      { t: '<', c: D }, { t: 'T', c: TY }, { t: '>(\n  ', c: D },
      { t: 'value', c: P }, { t: ': ', c: D }, { t: 'T', c: TY },
      { t: '\n): ', c: D }, { t: 'T', c: TY }, { t: ' | ', c: D },
      { t: 'undefined', c: K }, { t: ' {\n  ', c: D },
      { t: 'const', c: K }, { t: ' ', c: D }, { t: 'ref', c: P },
      { t: ' = useRef<', c: D }, { t: 'T', c: TY },
      { t: '>()\n  ', c: D }, { t: 'useEffect', c: F },
      { t: '(() => {\n    ', c: D }, { t: 'ref', c: P },
      { t: '.current = ', c: D }, { t: 'value', c: P },
      { t: '\n  }, [', c: D }, { t: 'value', c: P },
      { t: '])\n  ', c: D }, { t: 'return', c: K },
      { t: ' ', c: D }, { t: 'ref', c: P },
      { t: '.current\n}', c: D },
    ],
  },
]

function CodeTyper() {
  const [hookIdx, setHookIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'clearing'>('typing')
  const [cursor, setCursor] = useState(true)

  const chars = useMemo(
    () => HOOKS[hookIdx].tokens.flatMap(({ t, c }) => [...t].map(ch => ({ ch, c }))),
    [hookIdx]
  )

  useEffect(() => {
    const id = setInterval(() => setCursor(v => !v), 530)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (phase === 'typing') {
      if (charIdx >= chars.length) {
        timer = setTimeout(() => setPhase('clearing'), 2800)
      } else {
        const ch = chars[charIdx].ch
        timer = setTimeout(
          () => setCharIdx(n => n + 1),
          ch === '\n' ? 18 : 36 + Math.random() * 44
        )
      }
    } else {
      if (charIdx <= 0) {
        setHookIdx(i => (i + 1) % HOOKS.length)
        setPhase('typing')
        return
      }
      timer = setTimeout(() => setCharIdx(n => n - 1), 6)
    }
    return () => clearTimeout(timer)
  }, [phase, charIdx, chars])

  const segments: { text: string; color: string }[] = []
  for (const { ch, c } of chars.slice(0, charIdx)) {
    const last = segments[segments.length - 1]
    if (last && last.color === c) last.text += ch
    else segments.push({ text: ch, color: c })
  }

  return (
    <div>
      <div className="mb-3" style={{ ...label, color: '#4A4751' }}>
        {HOOKS[hookIdx].label}
      </div>
      <div style={{ backgroundColor: '#2B2730', borderRadius: '4px', padding: '14px 16px', overflow: 'hidden' }}>
        <pre style={{ ...mono, fontSize: '11px', lineHeight: 1.8, margin: 0, whiteSpace: 'pre', minHeight: '300px' }}>
          {segments.map((seg, i) => (
            <span key={i} style={{ color: seg.color }}>{seg.text}</span>
          ))}
          {cursor && <span style={{ color: '#C9A9C7' }}>▌</span>}
        </pre>
      </div>
    </div>
  )
}

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
    content: <CodeTyper />,
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
          — us, during every code review
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
