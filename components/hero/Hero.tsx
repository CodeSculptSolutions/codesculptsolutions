'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'

type Splat = { id: number; x: number; y: number; color: string; r: number }
const SPLAT_COLORS = ['#C9A9C7', '#A8BBD6', '#F0B8A8']

function StudioComposition() {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [splats, setSplats] = useState<Splat[]>([])
  const splatIdRef = useRef(0)
  const [idle, setIdle] = useState(false)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const resetIdle = useCallback(() => {
    setIdle(false)
    if (idleTimer.current) clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => setIdle(true), 30000)
  }, [])

  useEffect(() => {
    resetIdle()
    window.addEventListener('mousemove', resetIdle)
    window.addEventListener('keydown', resetIdle)
    window.addEventListener('click', resetIdle)
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current)
      window.removeEventListener('mousemove', resetIdle)
      window.removeEventListener('keydown', resetIdle)
      window.removeEventListener('click', resetIdle)
    }
  }, [resetIdle])

  /* ── Parallax spring values ── */
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 55, damping: 18 })
  const springY = useSpring(rawY, { stiffness: 55, damping: 18 })
  const bgX = useTransform(springX, v => v * 5)
  const bgY = useTransform(springY, v => v * 5)
  const midX = useTransform(springX, v => v * 14)
  const midY = useTransform(springY, v => v * 14)
  const fgX = useTransform(springX, v => v * 26)
  const fgY = useTransform(springY, v => v * 26)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2))
    rawY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2))
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  /* ── Click → ink splat at cursor position in SVG coords ── */
  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 480
    const y = ((e.clientY - rect.top) / rect.height) * 420
    const id = ++splatIdRef.current
    const color = SPLAT_COLORS[id % SPLAT_COLORS.length]
    const r = 12 + Math.random() * 20
    setSplats(prev => [...prev, { id, x, y, color, r }])
    setTimeout(() => setSplats(prev => prev.filter(s => s.id !== id)), 900)
  }

  const dots = Array.from({ length: 25 }, (_, i) => ({ row: Math.floor(i / 5), col: i % 5 }))
  const bgStyle = reduced ? {} : { x: bgX, y: bgY }
  const midStyle = reduced ? {} : { x: midX, y: midY }
  const fgStyle = reduced ? {} : { x: fgX, y: fgY }

  return (
    <div
      ref={containerRef}
      className="relative w-full flex items-center justify-center md:justify-end"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.svg
        viewBox="0 0 480 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[520px] md:max-w-none md:w-[50vw] max-h-[80vh] cursor-crosshair select-none"
        initial={{ opacity: 0, y: 24 }}
        animate={idle
          ? { opacity: 0.7, y: 16, rotate: 3, scale: 0.96 }
          : { opacity: 1, y: 0, rotate: 0, scale: 1 }
        }
        transition={{ duration: idle ? 3 : 1.8, ease: 'easeInOut', ...(idle ? {} : { delay: 0 }) }}
        onClick={handleClick}
        aria-hidden="true"
      >
        {/* ── Layer 0: background — moves barely ── */}
        <motion.g style={bgStyle}>
          <motion.path
            d="M78,72 C50,28 150,-6 238,20 C326,48 402,32 445,108
               C488,182 462,275 416,334 C370,392 280,406 200,380
               C120,354 54,298 44,222 C34,150 64,140 78,72 Z"
            fill="#C9A9C7" opacity="0.2"
            animate={!reduced ? { scale: [1, 1.018, 1.012, 1.022, 1] } : {}}
            transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
            style={{ originX: '50%', originY: '50%' }}
          />
          <motion.path
            d="M108,98 C84,60 164,38 238,60 C312,82 372,66 408,128
               C444,188 430,268 394,316 C358,362 280,376 212,356
               C144,336 92,284 84,217 C74,154 92,148 108,98 Z"
            fill="#C9A9C7" opacity="0.26"
            animate={!reduced ? { scale: [1, 1.012, 1.022, 1.008, 1] } : {}}
            transition={{ duration: 11, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror', delay: 1.5 }}
            style={{ originX: '50%', originY: '50%' }}
          />
          {/* Artboard corner marks */}
          <path d="M80,84 L80,100 M80,84 L96,84" stroke="#1B1A1F" strokeWidth="1.3" strokeOpacity="0.18" strokeLinecap="round" />
          <path d="M400,84 L400,100 M400,84 L384,84" stroke="#1B1A1F" strokeWidth="1.3" strokeOpacity="0.18" strokeLinecap="round" />
          <path d="M80,336 L80,320 M80,336 L96,336" stroke="#1B1A1F" strokeWidth="1.3" strokeOpacity="0.18" strokeLinecap="round" />
          <path d="M400,336 L400,320 M400,336 L384,336" stroke="#1B1A1F" strokeWidth="1.3" strokeOpacity="0.18" strokeLinecap="round" />
        </motion.g>

        {/* ── Layer 1: mid — dot grid, node tree, bezier ── */}
        <motion.g style={midStyle}>
          {/* 5×5 dot grid — structure/data */}
          {dots.map(({ row, col }) => (
            <motion.circle
              key={`dot-${row}-${col}`}
              cx={108 + col * 18}
              cy={110 + row * 18}
              r="1.6"
              fill="#1B1A1F"
              fillOpacity="0.14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.7 + (row * 5 + col) * 0.022 }}
            />
          ))}

          {/* Node tree — systems / architecture */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.0 }}
          >
            <line x1="358" y1="120" x2="334" y2="150" stroke="#A8BBD6" strokeWidth="1" strokeOpacity="0.5" />
            <line x1="358" y1="120" x2="382" y2="150" stroke="#A8BBD6" strokeWidth="1" strokeOpacity="0.5" />
            <line x1="334" y1="156" x2="324" y2="180" stroke="#A8BBD6" strokeWidth="0.9" strokeOpacity="0.4" />
            <line x1="334" y1="156" x2="346" y2="180" stroke="#A8BBD6" strokeWidth="0.9" strokeOpacity="0.4" />
            <circle cx="358" cy="113" r="7" stroke="#A8BBD6" strokeWidth="1.4" fill="white" fillOpacity="0.7" />
            <circle cx="334" cy="153" r="5.5" stroke="#A8BBD6" strokeWidth="1.2" fill="white" fillOpacity="0.65" />
            <circle cx="382" cy="153" r="5.5" stroke="#A8BBD6" strokeWidth="1.2" fill="white" fillOpacity="0.65" />
            <circle cx="324" cy="184" r="3.8" stroke="#A8BBD6" strokeWidth="1.1" fill="white" fillOpacity="0.6" />
            <circle cx="346" cy="184" r="3.8" stroke="#A8BBD6" strokeWidth="1.1" fill="white" fillOpacity="0.6" />
          </motion.g>

          {/* Bezier curve with design-tool handles — art × code craft */}
          <motion.line
            x1="132" y1="312" x2="132" y2="224"
            stroke="#1B1A1F" strokeWidth="0.9" strokeOpacity="0.15" strokeDasharray="3 4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          />
          <motion.line
            x1="348" y1="108" x2="348" y2="196"
            stroke="#1B1A1F" strokeWidth="0.9" strokeOpacity="0.15" strokeDasharray="3 4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          />
          <motion.path
            d="M132,312 C132,224 348,196 348,108"
            stroke="#1B1A1F" strokeWidth="1.8" strokeOpacity="0.3" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.85, ease: EASE_OUT_EXPO }}
          />
          <motion.rect
            x="126" y="306" width="12" height="12" rx="2"
            fill="white" stroke="#1B1A1F" strokeWidth="1.5" strokeOpacity="0.4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.3 }}
          />
          <motion.rect
            x="342" y="102" width="12" height="12" rx="2"
            fill="white" stroke="#1B1A1F" strokeWidth="1.5" strokeOpacity="0.4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.3 }}
          />
          <motion.circle
            cx="132" cy="224" r="4.5"
            fill="white" stroke="#1B1A1F" strokeWidth="1.2" strokeOpacity="0.3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.4 }}
          />
          <motion.circle
            cx="348" cy="196" r="4.5"
            fill="white" stroke="#1B1A1F" strokeWidth="1.2" strokeOpacity="0.3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.4 }}
          />
        </motion.g>

        {/* ── Layer 2: foreground — moves most ── */}
        <motion.g style={fgStyle}>
          {/* Annotation */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <line x1="126" y1="318" x2="90" y2="352" stroke="#1B1A1F" strokeWidth="0.7" strokeOpacity="0.18" />
            <text
              x="32" y="366"
              fontFamily="'Caveat', cursive"
              fontSize="13"
              fill="#4A4751"
              fillOpacity="0.42"
            >
              anchor point
            </text>
          </motion.g>

          {/* Color palette swatches */}
          <motion.g
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: EASE_OUT_EXPO }}
          >
            <rect x="410" y="188" width="30" height="16" rx="3" fill="#C9A9C7" />
            <rect x="410" y="210" width="30" height="16" rx="3" fill="#A8BBD6" />
            <rect x="410" y="232" width="30" height="16" rx="3" fill="#F0B8A8" />
            <rect x="410" y="254" width="30" height="16" rx="3" fill="#E8DFD0" stroke="#1B1A1F" strokeWidth="0.8" strokeOpacity="0.15" />
          </motion.g>

          {/* < /> angle brackets — code */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <path d="M200,358 L182,372 L200,386" stroke="#1B1A1F" strokeWidth="2.2" strokeOpacity="0.07" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="214" y1="358" x2="226" y2="386" stroke="#1B1A1F" strokeWidth="2.2" strokeOpacity="0.07" strokeLinecap="round" />
            <path d="M240,358 L258,372 L240,386" stroke="#1B1A1F" strokeWidth="2.2" strokeOpacity="0.07" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>

          {/* Paint ink blob — raw art element */}
          <motion.path
            d="M218,355 C230,344 258,346 265,358 C272,370 260,382 244,380 C228,378 208,364 218,355 Z"
            fill="#F0B8A8" opacity="0.55"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.55 }}
            transition={{ duration: 0.6, delay: 1.25, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ originX: '242px', originY: '364px' }}
          />

          {/* Crosshair / registration mark */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.35 }}
          >
            <circle cx="390" cy="290" r="10" stroke="#1B1A1F" strokeWidth="0.9" strokeOpacity="0.12" fill="none" />
            <line x1="390" y1="276" x2="390" y2="304" stroke="#1B1A1F" strokeWidth="0.9" strokeOpacity="0.12" />
            <line x1="376" y1="290" x2="404" y2="290" stroke="#1B1A1F" strokeWidth="0.9" strokeOpacity="0.12" />
          </motion.g>
        </motion.g>

        {/* ── Ink splats on click ── */}
        {splats.map(splat => (
          <motion.circle
            key={splat.id}
            cx={splat.x}
            cy={splat.y}
            r={splat.r}
            fill={splat.color}
            initial={{ scale: 0, opacity: 0.75 }}
            animate={{ scale: 2.8, opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </motion.svg>
    </div>
  )
}

export function Hero() {
  const [melting, setMelting] = useState(false)
  const meltTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const startMelt = () => {
    meltTimer.current = setTimeout(() => setMelting(true), 600)
  }
  const stopMelt = () => {
    if (meltTimer.current) clearTimeout(meltTimer.current)
    if (melting) setTimeout(() => setMelting(false), 1200)
    else setMelting(false)
  }

  const slideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay, ease: EASE_OUT_EXPO },
    }),
  }

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
      aria-label="Hero"
    >
      {/* Studio log — below nav */}
      <motion.div
        className="absolute top-24 right-10 md:right-54 text-ink-soft"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2, ease: EASE_OUT_EXPO }}
        aria-hidden="true"
      >
        Studio Log — Est. 2022 — Cebu, PH
      </motion.div>

      <div className="max-w-[1440px] mx-auto px-8 md:px-16 w-full grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 md:gap-20 lg:gap-32 items-center">
        {/* Left — headline */}
        <div className="relative z-10 md:max-w-[580px]">
          <motion.div
            className="mb-5 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_EXPO }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#C9A9C7', letterSpacing: '0.04em' }}>~/studio</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'rgba(74,71,81,0.4)', letterSpacing: '0.04em' }}>·</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#4A4751', letterSpacing: '0.04em' }}>available for new projects</span>
          </motion.div>
          <motion.h1
            className="mb-8"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(52px, 6.5vw, 96px)',
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              color: '#1B1A1F',
            }}
            initial="hidden"
            animate="visible"
          >
            <motion.span custom={0.3} variants={slideUp} className="block">
              We shape
            </motion.span>
            {/* Outer span handles slide-up variant, inner em handles melt — no conflict */}
            <motion.span custom={0.45} variants={slideUp} className="block">
              <motion.em
                className="not-italic cursor-pointer select-none"
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontStyle: 'italic',
                  color: '#C9A9C7',
                  fontOpticalSizing: 'auto',
                  display: 'block',
                  transformOrigin: 'left center',
                }}
                animate={melting
                  ? { skewX: 8, skewY: 4, y: 12, scaleY: 1.12, opacity: 0.75 }
                  : { skewX: 0, skewY: 0, y: 0, scaleY: 1, opacity: 1 }
                }
                transition={{ duration: melting ? 0.9 : 1.4, ease: melting ? [0.25,0.46,0.45,0.94] : [0.34,1.56,0.64,1] }}
                onPointerDown={startMelt}
                onPointerUp={stopMelt}
                onPointerLeave={stopMelt}
                title="hold me"
              >
                software
              </motion.em>
            </motion.span>
            <motion.span custom={0.6} variants={slideUp} className="block">
              with our hands.
            </motion.span>
          </motion.h1>

          <motion.p
            custom={0.75}
            variants={slideUp}
            initial="hidden"
            animate="visible"
            className="text-ink-soft leading-relaxed mb-10"
            style={{
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: '17px',
              lineHeight: 1.75,
              maxWidth: '460px',
            }}
          >
            CodeSculptSolutions is a studio in Cebu making web, mobile, and custom
            systems for teams who care about how things feel — not just how they work.
          </motion.p>

          <motion.div custom={0.9} variants={slideUp} initial="hidden" animate="visible">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="squiggle-link group inline-flex items-center gap-2 text-ink"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: '16px',
                letterSpacing: '-0.01em',
              }}
            >
              See what we&apos;ve made
              <span
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </motion.div>
        </div>

        {/* Right — studio composition */}
        <StudioComposition />
      </div>

      {/* Subtle bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #F4EFE6)' }}
        aria-hidden="true"
      />
    </section>
  )
}
