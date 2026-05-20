'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'

const sans = { fontFamily: "'General Sans', system-ui, sans-serif" }
const serif = { fontFamily: "'Fraunces', Georgia, serif" }
const mono = { fontFamily: "'JetBrains Mono', monospace" }
const manrope = { fontFamily: "'Manrope', system-ui, sans-serif" }

function DiscoverIllustration() {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      {Array.from({ length: 25 }, (_, i) => (
        <motion.circle
          key={i}
          cx={14 + (i % 5) * 17}
          cy={14 + Math.floor(i / 5) * 17}
          r="1.5"
          fill="#F4EFE6"
          initial={{ opacity: 0 }}
          animate={{ opacity: i % 3 === 0 ? 0.55 : 0.12 }}
          transition={{ duration: 0.4, delay: i * 0.025 }}
        />
      ))}
      <motion.circle
        cx="44" cy="44" r="20"
        stroke="#C9A9C7" strokeWidth="2" fill="none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.2 }}
        style={{ transformOrigin: '44px 44px' }}
      />
      <motion.line
        x1="58" y1="58" x2="78" y2="78"
        stroke="#F4EFE6" strokeWidth="2.2" strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        transition={{ duration: 0.4, delay: 0.45 }}
      />
      <motion.circle
        cx="44" cy="44" r="7"
        fill="#C9A9C7"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.65, 0.9, 0.65] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        style={{ transformOrigin: '44px 44px' }}
      />
    </svg>
  )
}

function DesignIllustration() {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <motion.rect
        x="12" y="12" width="72" height="72"
        stroke="#F4EFE6" strokeWidth="1.5" fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ duration: 0.4 }}
      />
      {['M6,12 L12,12 L12,6', 'M84,6 L84,12 L90,12', 'M6,84 L12,84 L12,90', 'M84,90 L84,84 L90,84'].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="#4A4751" strokeWidth="1.5" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 + i * 0.07 }}
        />
      ))}
      <motion.path
        d="M 24 72 C 36 32 60 72 72 32"
        stroke="#C9A9C7" strokeWidth="2" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.3 }}
      />
      <line x1="24" y1="72" x2="36" y2="32" stroke="#F4EFE6" strokeWidth="0.8" opacity="0.18" />
      <line x1="72" y1="32" x2="60" y2="72" stroke="#F4EFE6" strokeWidth="0.8" opacity="0.18" />
      <circle cx="24" cy="72" r="3" fill="#C9A9C7" />
      <circle cx="72" cy="32" r="3" fill="#C9A9C7" />
      <motion.circle cx="36" cy="32" r="2.5" fill="none" stroke="#F4EFE6" strokeWidth="1.5"
        animate={{ scale: [1, 1.45, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{ transformOrigin: '36px 32px' }}
      />
      <motion.circle cx="60" cy="72" r="2.5" fill="none" stroke="#F4EFE6" strokeWidth="1.5"
        animate={{ scale: [1, 1.45, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
        style={{ transformOrigin: '60px 72px' }}
      />
    </svg>
  )
}

function DevelopIllustration() {
  const lines = [
    { x2: 58, y: 38 },
    { x2: 46, y: 50 },
    { x2: 54, y: 62 },
    { x2: 38, y: 74 },
  ]
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <motion.path
        d="M 34 20 L 18 48 L 34 76"
        stroke="#A8BBD6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        animate={{ x: [-3, 0, -3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M 62 20 L 78 48 L 62 76"
        stroke="#A8BBD6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        animate={{ x: [3, 0, 3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {lines.map((l, i) => (
        <motion.line
          key={i}
          x1="42" y1={l.y} x2={l.x2} y2={l.y}
          stroke="#F4EFE6" strokeWidth="1.5" strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
        />
      ))}
      <motion.rect
        x="59" y="58" width="2" height="13"
        fill="#C9A9C7"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.65, repeat: Infinity, repeatType: 'reverse' }}
      />
    </svg>
  )
}

function DeliverIllustration() {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <motion.path
        d="M 18 82 Q 38 22 82 12"
        stroke="#F4EFE6" strokeWidth="1.5" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 1, ease: EASE_OUT_EXPO }}
      />
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.75 }}
      >
        <line x1="66" y1="28" x2="82" y2="12" stroke="#F0B8A8" strokeWidth="2.5" strokeLinecap="round" />
        <polyline points="70,12 82,12 82,24" stroke="#F0B8A8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.g>
      <circle cx="18" cy="82" r="4" fill="#C9A9C7" opacity="0.8" />
      <motion.circle
        cx="18" cy="82" r="10"
        stroke="#C9A9C7" strokeWidth="1" fill="none"
        animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        style={{ transformOrigin: '18px 82px' }}
      />
      {[{ cx: 34, cy: 60 }, { cx: 54, cy: 34 }, { cx: 76, cy: 18 }].map((d, i) => (
        <motion.circle
          key={i}
          cx={d.cx} cy={d.cy} r="2.5"
          fill="#F0B8A8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.65, scale: 1 }}
          style={{ transformOrigin: `${d.cx}px ${d.cy}px` }}
          transition={{ duration: 0.35, delay: 0.45 + i * 0.13 }}
        />
      ))}
    </svg>
  )
}

const ILLUSTRATIONS = [DiscoverIllustration, DesignIllustration, DevelopIllustration, DeliverIllustration]

const STAGES = [
  {
    number: '01',
    name: 'Discover',
    description: 'Understanding the problem before touching a tool. Conversations, context, constraints. What are you actually trying to solve — and for who?',
  },
  {
    number: '02',
    name: 'Design',
    description: 'Figma, sketchbook, whiteboard — whatever gets the idea out fast. Structure first, aesthetics second. Flows before pixels.',
  },
  {
    number: '03',
    name: 'Develop',
    description: 'Build in the open. Frequent deploys, short feedback loops. Code that will still make sense to the next person who reads it.',
  },
  {
    number: '04',
    name: 'Deliver',
    description: 'Ship it. CI/CD, App Store, production deploy — handled. Then: monitor, iterate, and stay available when questions come up.',
  },
]

export function Process() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [active, setActive] = useState(0)

  const ActiveIllustration = ILLUSTRATIONS[active]

  return (
    <section
      id="process"
      ref={ref}
      className="py-24 md:py-40"
      style={{ backgroundColor: '#2B2730', color: '#F4EFE6' }}
      aria-labelledby="process-heading"
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">

        <motion.h2
          id="process-heading"
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          style={{
            ...sans,
            fontWeight: 700,
            fontSize: 'clamp(40px, 5vw, 72px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
          }}
        >
          How we{' '}
          <em style={{ ...serif, fontStyle: 'italic', color: '#C9A9C7' }}>work</em>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-12 md:gap-20 items-start">

          {/* Step nav */}
          <nav aria-label="Process stages">
            {STAGES.map((stage, i) => (
              <motion.button
                key={stage.name}
                className="relative w-full text-left py-5 pr-4 pl-6 focus-visible:outline-none"
                style={{ cursor: 'pointer', background: 'none', border: 'none' }}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.3 + i * 0.1 }}
                whileHover={{ x: active === i ? 0 : 6 }}
              >
                {/* Active indicator bar */}
                <motion.div
                  className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full"
                  style={{ backgroundColor: '#C9A9C7' }}
                  initial={false}
                  animate={{ scaleY: active === i ? 1 : 0, opacity: active === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                />

                <div className="flex items-baseline gap-3">
                  <motion.span
                    style={{ ...mono, fontSize: '11px', letterSpacing: '0.08em' }}
                    animate={{ color: active === i ? '#C9A9C7' : 'rgba(244,239,230,0.28)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {stage.number}
                  </motion.span>
                  <motion.span
                    style={{ ...serif, fontStyle: 'italic', fontSize: '20px', letterSpacing: '-0.01em' }}
                    animate={{ color: active === i ? '#F4EFE6' : 'rgba(244,239,230,0.38)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {stage.name}
                  </motion.span>
                </div>
              </motion.button>
            ))}
          </nav>

          {/* Active stage content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            >
              {/* Ghost number */}
              <div
                aria-hidden="true"
                style={{
                  ...serif,
                  fontStyle: 'italic',
                  fontSize: 'clamp(80px, 14vw, 176px)',
                  lineHeight: 0.85,
                  letterSpacing: '-0.04em',
                  color: 'rgba(244,239,230,0.055)',
                  userSelect: 'none',
                }}
              >
                {STAGES[active].number}
              </div>

              {/* Stage name */}
              <h3
                style={{
                  ...sans,
                  fontWeight: 700,
                  fontSize: 'clamp(32px, 4.5vw, 56px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.0,
                  color: '#F4EFE6',
                  marginTop: '-16px',
                  marginBottom: '32px',
                }}
              >
                {STAGES[active].name}
              </h3>

              {/* Draw-in separator */}
              <motion.div
                style={{
                  height: '1px',
                  backgroundColor: 'rgba(244,239,230,0.1)',
                  transformOrigin: 'left',
                  marginBottom: '40px',
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: 0.1 }}
              />

              {/* Illustration + description */}
              <div className="flex gap-10 items-start flex-wrap sm:flex-nowrap">
                <div className="flex-shrink-0">
                  <ActiveIllustration />
                </div>
                <p
                  style={{
                    ...manrope,
                    fontSize: '16px',
                    lineHeight: 1.82,
                    color: 'rgba(244,239,230,0.62)',
                    paddingTop: '8px',
                    maxWidth: '400px',
                  }}
                >
                  {STAGES[active].description}
                </p>
              </div>

              {/* Phase tag */}
              <div
                style={{
                  ...mono,
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(244,239,230,0.2)',
                  marginTop: '48px',
                }}
              >
                Phase {active + 1} of {STAGES.length}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
