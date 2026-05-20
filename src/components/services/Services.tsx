'use client'

import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE_OUT_EXPO } from '@/lib/motion'

/* ── Hand-drawn service illustrations ───────────────────────
   Each draws inside a ~260×260 coordinate space, centered.
   Stroke color uses the service's ink value (dark on light blobs,
   slightly lighter on the canvas-deep blob).                   */

function WebIllustration({ ink }: { ink: string }) {
  return (
    /* Browser window — loose, slightly imperfect proportions */
    <svg viewBox="0 0 260 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-full">
      {/* Window frame */}
      <rect x="28" y="44" width="204" height="152" rx="10" stroke={ink} strokeWidth="2" fill="none" />
      {/* Title bar */}
      <line x1="28" y1="72" x2="232" y2="72" stroke={ink} strokeWidth="1.5" strokeOpacity="0.6" />
      {/* Traffic lights */}
      <circle cx="48" cy="58" r="5" fill={ink} fillOpacity="0.18" />
      <circle cx="63" cy="58" r="5" fill={ink} fillOpacity="0.18" />
      <circle cx="78" cy="58" r="5" fill={ink} fillOpacity="0.18" />
      {/* URL bar */}
      <rect x="92" y="51" width="100" height="14" rx="7" stroke={ink} strokeWidth="1.2" fill="none" strokeOpacity="0.3" />
      {/* Content lines */}
      <rect x="44" y="88" width="172" height="8" rx="4" fill={ink} fillOpacity="0.12" />
      <rect x="44" y="104" width="130" height="8" rx="4" fill={ink} fillOpacity="0.08" />
      {/* Image placeholder */}
      <rect x="44" y="122" width="80" height="58" rx="4" stroke={ink} strokeWidth="1.5" fill="none" strokeOpacity="0.2" />
      <path d="M44 162 L68 140 L84 154 L92 145 L124 180" stroke={ink} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.2" />
      {/* Text content blocks */}
      <rect x="136" y="122" width="80" height="5" rx="2.5" fill={ink} fillOpacity="0.12" />
      <rect x="136" y="135" width="64" height="5" rx="2.5" fill={ink} fillOpacity="0.08" />
      <rect x="136" y="148" width="72" height="5" rx="2.5" fill={ink} fillOpacity="0.08" />
      <rect x="136" y="161" width="48" height="5" rx="2.5" fill={ink} fillOpacity="0.06" />
    </svg>
  )
}

function MobileIllustration({ ink }: { ink: string }) {
  return (
    /* Phone — centered, slightly asymmetric notch, organic feel */
    <svg viewBox="0 0 260 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-full">
      {/* Phone body */}
      <rect x="82" y="20" width="96" height="200" rx="18" stroke={ink} strokeWidth="2.2" fill="none" />
      {/* Screen area */}
      <rect x="90" y="46" width="80" height="142" rx="4" fill={ink} fillOpacity="0.06" />
      {/* Dynamic island / notch */}
      <rect x="108" y="28" width="44" height="12" rx="6" fill={ink} fillOpacity="0.18" />
      {/* Home indicator */}
      <rect x="112" y="208" width="36" height="4" rx="2" fill={ink} fillOpacity="0.25" />
      {/* Screen content — app-like UI */}
      <rect x="98" y="58" width="64" height="7" rx="3.5" fill={ink} fillOpacity="0.15" />
      {/* App grid */}
      <rect x="98" y="76" width="24" height="24" rx="6" fill={ink} fillOpacity="0.12" />
      <rect x="130" y="76" width="24" height="24" rx="6" fill={ink} fillOpacity="0.12" />
      <rect x="98" y="108" width="24" height="24" rx="6" fill={ink} fillOpacity="0.1" />
      <rect x="130" y="108" width="24" height="24" rx="6" fill={ink} fillOpacity="0.1" />
      {/* Bottom bar lines */}
      <rect x="98" y="142" width="64" height="5" rx="2.5" fill={ink} fillOpacity="0.1" />
      <rect x="98" y="154" width="44" height="5" rx="2.5" fill={ink} fillOpacity="0.07" />
      {/* Side buttons */}
      <rect x="178" y="64" width="5" height="24" rx="2.5" fill={ink} fillOpacity="0.2" />
      <rect x="77" y="72" width="5" height="18" rx="2.5" fill={ink} fillOpacity="0.2" />
      <rect x="77" y="96" width="5" height="18" rx="2.5" fill={ink} fillOpacity="0.2" />
    </svg>
  )
}

function DesignIllustration({ ink }: { ink: string }) {
  return (
    /* Figma-ish artboard with cursor — loose editorial style */
    <svg viewBox="0 0 260 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-full">
      {/* Artboard frame */}
      <rect x="44" y="34" width="130" height="152" rx="3" stroke={ink} strokeWidth="1.8" fill="none" strokeOpacity="0.5" />
      {/* Corner handles */}
      <rect x="38" y="28" width="10" height="10" rx="1" stroke={ink} strokeWidth="1.5" fill="none" />
      <rect x="168" y="28" width="10" height="10" rx="1" stroke={ink} strokeWidth="1.5" fill="none" />
      <rect x="38" y="180" width="10" height="10" rx="1" stroke={ink} strokeWidth="1.5" fill="none" />
      <rect x="168" y="180" width="10" height="10" rx="1" stroke={ink} strokeWidth="1.5" fill="none" />
      {/* Guides */}
      <line x1="109" y1="20" x2="109" y2="200" stroke={ink} strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="3 4" />
      <line x1="30" y1="110" x2="192" y2="110" stroke={ink} strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="3 4" />
      {/* Content blocks inside artboard */}
      <rect x="56" y="48" width="106" height="40" rx="4" fill={ink} fillOpacity="0.07" />
      <rect x="56" y="96" width="72" height="5" rx="2.5" fill={ink} fillOpacity="0.12" />
      <rect x="56" y="108" width="90" height="5" rx="2.5" fill={ink} fillOpacity="0.08" />
      <rect x="56" y="120" width="60" height="5" rx="2.5" fill={ink} fillOpacity="0.08" />
      {/* Color swatches */}
      <circle cx="60" cy="158" r="8" fill={ink} fillOpacity="0.25" />
      <circle cx="78" cy="158" r="8" fill={ink} fillOpacity="0.15" />
      <circle cx="96" cy="158" r="8" fill={ink} fillOpacity="0.09" />
      {/* Cursor — hand drawn arrow */}
      <path d="M168,128 L168,172 L178,160 L186,176 L191,173 L183,157 L196,157 Z"
        stroke={ink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

function SystemsIllustration({ ink }: { ink: string }) {
  return (
    /* Server stack + connecting nodes — slightly circuit-like */
    <svg viewBox="0 0 260 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-full">
      {/* Server racks */}
      <rect x="48" y="42" width="164" height="36" rx="6" stroke={ink} strokeWidth="1.8" fill="none" />
      <rect x="48" y="90" width="164" height="36" rx="6" stroke={ink} strokeWidth="1.8" fill="none" />
      <rect x="48" y="138" width="164" height="36" rx="6" stroke={ink} strokeWidth="1.8" fill="none" />
      {/* Status LEDs */}
      <circle cx="196" cy="60" r="4" fill={ink} fillOpacity="0.35" />
      <circle cx="196" cy="108" r="4" fill={ink} fillOpacity="0.25" />
      <circle cx="196" cy="156" r="4" fill={ink} fillOpacity="0.2" />
      {/* Slot lines on servers */}
      <rect x="64" y="54" width="100" height="3" rx="1.5" fill={ink} fillOpacity="0.12" />
      <rect x="64" y="62" width="70" height="3" rx="1.5" fill={ink} fillOpacity="0.08" />
      <rect x="64" y="102" width="100" height="3" rx="1.5" fill={ink} fillOpacity="0.12" />
      <rect x="64" y="110" width="80" height="3" rx="1.5" fill={ink} fillOpacity="0.08" />
      <rect x="64" y="150" width="100" height="3" rx="1.5" fill={ink} fillOpacity="0.12" />
      <rect x="64" y="158" width="55" height="3" rx="1.5" fill={ink} fillOpacity="0.08" />
      {/* Connection line down */}
      <line x1="130" y1="78" x2="130" y2="90" stroke={ink} strokeWidth="1.2" strokeOpacity="0.3" />
      <line x1="130" y1="126" x2="130" y2="138" stroke={ink} strokeWidth="1.2" strokeOpacity="0.3" />
      {/* Branching lines to endpoints */}
      <line x1="130" y1="174" x2="130" y2="194" stroke={ink} strokeWidth="1.2" strokeOpacity="0.25" />
      <line x1="130" y1="194" x2="88" y2="210" stroke={ink} strokeWidth="1.2" strokeOpacity="0.2" />
      <line x1="130" y1="194" x2="172" y2="210" stroke={ink} strokeWidth="1.2" strokeOpacity="0.2" />
      <circle cx="88" cy="212" r="4" stroke={ink} strokeWidth="1.5" fill="none" strokeOpacity="0.4" />
      <circle cx="172" cy="212" r="4" stroke={ink} strokeWidth="1.5" fill="none" strokeOpacity="0.4" />
    </svg>
  )
}

const SERVICE_ILLUSTRATIONS = {
  'Web Development': WebIllustration,
  'Mobile Apps': MobileIllustration,
  'UI/UX Design': DesignIllustration,
  'Custom Systems': SystemsIllustration,
} as const

const SERVICES = [
  {
    name: 'Web Development' as const,
    blob: `M10,15 C2,5 -8,50 4,118 C14,180 -5,222 8,255 C25,278 95,268 168,254 C238,240 296,192 308,128 C320,65 278,10 208,4 C145,-4 18,24 10,15 Z`,
    viewBox: '-15 -12 338 296',
    color: '#C9A9C7',
    ink: 'var(--color-kiln)',
    description: 'Production-ready web apps built in Next.js, React, and TypeScript. Fast, accessible, and shaped around how your users actually move through them — not just how they look in a browser window.',
    capabilities: ['Next.js · React · TypeScript', 'Performance & SEO', 'CMS integration · WordPress', 'E-commerce · Checkout flows'],
  },
  {
    name: 'Mobile Apps' as const,
    // Tall narrow teardrop — wide at top, tapers toward bottom, slightly leans left
    blob: `M88,8 C128,-8 182,18 192,68 C202,118 178,160 182,215 C186,264 156,294 116,290 C76,286 46,256 42,212 C36,162 56,122 52,72 C46,24 50,24 88,8 Z`,
    viewBox: '28 -5 180 308',
    color: '#A8BBD6',
    ink: 'var(--color-kiln)',
    description: "Cross-platform mobile apps with a single React Native + Expo codebase — iOS and Android, without the duplication. We've shipped to the App Store and Google Play. The unglamorous deployment bits are handled.",
    capabilities: ['React Native · Expo', 'iOS & Android', 'Offline-first · Push notifications', 'App Store & Play Store'],
  },
  {
    name: 'UI/UX Design' as const,
    // Amoeba: two distinct lobes — top-left lobe bigger, bottom-right lobe smaller
    blob: `M30,65 C22,10 92,-5 155,18 C198,34 218,8 265,42 C308,74 315,138 290,188 C265,238 205,260 152,252 C95,244 28,218 12,168 C-2,125 38,115 30,65 Z`,
    viewBox: '-5 -10 330 278',
    color: '#F0B8A8',
    ink: 'var(--color-kiln)',
    description: 'Design that starts with your users and ends with a working system. User research, wireframes, high-fidelity prototypes, and design systems built in Figma — then handed over in a state a developer can actually use.',
    capabilities: ['Figma · Design systems', 'User research · Wireframing', 'Interaction design', 'Handoff-ready prototypes'],
  },
  {
    name: 'Custom Systems' as const,
    // Pillow slab: very wide and flat, near-straight top, organic lumpy bottom edge
    blob: `M15,55 C12,18 75,5 148,8 C215,10 278,18 305,65 C330,108 322,175 280,212 C238,248 168,252 105,235 C45,218 8,180 5,138 C2,105 18,88 15,55 Z`,
    viewBox: '0 0 338 262',
    color: '#E8DFD0',
    ink: 'var(--color-ink)',
    description: 'Internal tools, admin dashboards, data management systems, and government-grade web platforms. The kind of software that nobody sees but everyone depends on. Built to last, not to demo.',
    capabilities: ['Admin tools · Dashboards', 'Data management systems', 'Government · NGO platforms', 'Python · Flask · PyQT · SQL'],
  },
]

interface ServiceEntryProps {
  service: (typeof SERVICES)[number]
  index: number
  isInView: boolean
}

function ServiceEntry({ service, index, isInView }: ServiceEntryProps) {
  const [hovered, setHovered] = useState(false)
  const Illustration = SERVICE_ILLUSTRATIONS[service.name]

  return (
    <motion.div
      className="group grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 md:gap-16 py-10 md:py-16 border-t border-ink/10"
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left — blob with illustration inside */}
      <div className="flex items-center justify-center md:justify-start">
        <div className="relative w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px]" aria-hidden="true">
          {/* Organic blob background */}
          <motion.svg
            viewBox={service.viewBox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full"
            animate={hovered ? { rotate: 7, scale: 1.05 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          >
            <path d={service.blob} fill={service.color} opacity="0.9" />
          </motion.svg>

          {/* Illustration — sits on top of blob, inset so it stays inside */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center p-6"
            animate={hovered ? { scale: 1.04 } : { scale: 1 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          >
            <Illustration ink={service.ink} />
          </motion.div>
        </div>
      </div>

      {/* Right — content */}
      <div className="flex flex-col justify-center">
        <motion.h3
          className="mb-4"
          animate={hovered ? { color: service.color === '#E8DFD0' ? 'var(--color-ink-soft)' : service.color } : { color: 'var(--color-ink)' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {service.name}
        </motion.h3>
        <p
          className="text-ink-soft mb-6 max-w-xl"
          style={{
            fontFamily: "'Manrope', system-ui, sans-serif",
            fontSize: '16px',
            lineHeight: 1.75,
          }}
        >
          {service.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {service.capabilities.map((cap) => (
            <span
              key={cap}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.03em',
                color: 'var(--color-ink-soft)',
                backgroundColor: 'rgba(var(--ink-rgb), 0.06)',
                padding: '4px 9px',
                borderRadius: '3px',
              }}
            >
              {cap}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Services() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" ref={ref} className="py-14 md:py-40" aria-labelledby="services-heading">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          <h2
            id="services-heading"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(40px, 5vw, 72px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: 'var(--color-ink)',
            }}
          >
            What we{' '}
            <em
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontStyle: 'italic',
                color: '#C9A9C7',
              }}
            >
              build
            </em>
          </h2>
        </motion.div>

        <div>
          {SERVICES.map((service, i) => (
            <ServiceEntry key={service.name} service={service} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
