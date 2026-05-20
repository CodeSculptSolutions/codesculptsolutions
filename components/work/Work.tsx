'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'

type FilterKey = 'All' | 'Web' | 'Mobile' | 'UI/UX' | 'Systems'
const FILTERS: FilterKey[] = ['All', 'Web', 'Mobile', 'UI/UX', 'Systems']

/* ── Illustrations — all 280×200 coordinate space, no blob ── */

function PhoneArt() {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Phone body — shorter, better proportioned, centered */}
      <rect x="104" y="24" width="72" height="152" rx="14" stroke="#1B1A1F" strokeWidth="1.8" fill="none" />
      {/* Screen area */}
      <rect x="111" y="42" width="58" height="110" rx="3" fill="#1B1A1F" fillOpacity="0.05" />
      {/* Dynamic island / notch */}
      <rect x="127" y="31" width="26" height="7" rx="3.5" fill="#1B1A1F" fillOpacity="0.2" />
      {/* Home indicator */}
      <rect x="128" y="159" width="24" height="3" rx="1.5" fill="#1B1A1F" fillOpacity="0.22" />
      {/* Screen content — status bar */}
      <rect x="114" y="48" width="22" height="3" rx="1.5" fill="#1B1A1F" fillOpacity="0.1" />
      <rect x="152" y="48" width="14" height="3" rx="1.5" fill="#1B1A1F" fillOpacity="0.1" />
      {/* App grid 2×3 */}
      <rect x="116" y="60" width="20" height="20" rx="5" fill="#1B1A1F" fillOpacity="0.1" />
      <rect x="142" y="60" width="20" height="20" rx="5" fill="#1B1A1F" fillOpacity="0.1" />
      <rect x="116" y="86" width="20" height="20" rx="5" fill="#1B1A1F" fillOpacity="0.07" />
      <rect x="142" y="86" width="20" height="20" rx="5" fill="#1B1A1F" fillOpacity="0.07" />
      <rect x="116" y="112" width="20" height="20" rx="5" fill="#1B1A1F" fillOpacity="0.05" />
      <rect x="142" y="112" width="20" height="20" rx="5" fill="#1B1A1F" fillOpacity="0.05" />
      {/* Bottom dock */}
      <rect x="113" y="138" width="54" height="3" rx="1.5" fill="#1B1A1F" fillOpacity="0.08" />
      {/* Side buttons */}
      <rect x="176" y="56" width="3.5" height="18" rx="1.75" fill="#1B1A1F" fillOpacity="0.18" />
      <rect x="100.5" y="60" width="3.5" height="14" rx="1.75" fill="#1B1A1F" fillOpacity="0.18" />
      <rect x="100.5" y="80" width="3.5" height="14" rx="1.75" fill="#1B1A1F" fillOpacity="0.18" />
    </svg>
  )
}

function ArtboardArt() {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <rect x="50" y="22" width="130" height="152" rx="3" stroke="#1B1A1F" strokeWidth="1.5" fill="none" strokeOpacity="0.4" />
      <rect x="42" y="14" width="10" height="10" rx="1" stroke="#1B1A1F" strokeWidth="1.3" fill="none" />
      <rect x="178" y="14" width="10" height="10" rx="1" stroke="#1B1A1F" strokeWidth="1.3" fill="none" />
      <rect x="42" y="176" width="10" height="10" rx="1" stroke="#1B1A1F" strokeWidth="1.3" fill="none" />
      <rect x="178" y="176" width="10" height="10" rx="1" stroke="#1B1A1F" strokeWidth="1.3" fill="none" />
      <line x1="115" y1="8" x2="115" y2="192" stroke="#1B1A1F" strokeWidth="0.7" strokeOpacity="0.15" strokeDasharray="3 4" />
      <line x1="36" y1="98" x2="194" y2="98" stroke="#1B1A1F" strokeWidth="0.7" strokeOpacity="0.15" strokeDasharray="3 4" />
      <rect x="62" y="34" width="106" height="44" rx="4" fill="#1B1A1F" fillOpacity="0.06" />
      <rect x="62" y="86" width="70" height="5" rx="2.5" fill="#1B1A1F" fillOpacity="0.11" />
      <rect x="62" y="98" width="90" height="5" rx="2.5" fill="#1B1A1F" fillOpacity="0.07" />
      <rect x="62" y="110" width="55" height="5" rx="2.5" fill="#1B1A1F" fillOpacity="0.07" />
      <circle cx="70" cy="148" r="8" fill="#1B1A1F" fillOpacity="0.2" />
      <circle cx="88" cy="148" r="8" fill="#1B1A1F" fillOpacity="0.12" />
      <circle cx="106" cy="148" r="8" fill="#1B1A1F" fillOpacity="0.07" />
      <path d="M192,115 L192,160 L202,148 L210,165 L216,162 L208,145 L220,145 Z"
        stroke="#1B1A1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

function BrowserArt() {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <rect x="24" y="20" width="232" height="158" rx="9" stroke="#1B1A1F" strokeWidth="1.8" fill="none" />
      <line x1="24" y1="46" x2="256" y2="46" stroke="#1B1A1F" strokeWidth="1.3" strokeOpacity="0.45" />
      <circle cx="40" cy="33" r="4.5" fill="#1B1A1F" fillOpacity="0.16" />
      <circle cx="54" cy="33" r="4.5" fill="#1B1A1F" fillOpacity="0.16" />
      <circle cx="68" cy="33" r="4.5" fill="#1B1A1F" fillOpacity="0.16" />
      <rect x="88" y="26" width="104" height="14" rx="7" stroke="#1B1A1F" strokeWidth="1.1" strokeOpacity="0.25" fill="none" />
      <rect x="36" y="58" width="208" height="7" rx="3.5" fill="#1B1A1F" fillOpacity="0.09" />
      <rect x="36" y="71" width="158" height="7" rx="3.5" fill="#1B1A1F" fillOpacity="0.06" />
      <rect x="36" y="90" width="98" height="66" rx="4" stroke="#1B1A1F" strokeWidth="1.3" fill="none" strokeOpacity="0.16" />
      <path d="M36 142 L58 122 L72 134 L84 126 L134 156" stroke="#1B1A1F" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.16" />
      <rect x="144" y="90" width="100" height="6" rx="3" fill="#1B1A1F" fillOpacity="0.09" />
      <rect x="144" y="103" width="74" height="6" rx="3" fill="#1B1A1F" fillOpacity="0.06" />
      <rect x="144" y="116" width="86" height="6" rx="3" fill="#1B1A1F" fillOpacity="0.06" />
      <rect x="144" y="129" width="52" height="6" rx="3" fill="#1B1A1F" fillOpacity="0.04" />
    </svg>
  )
}

function LockArt({ hint }: { hint: 'phone' | 'server' | 'browser' }) {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Faint background hint of service type */}
      {hint === 'phone' && (
        <g opacity="0.12">
          <rect x="118" y="15" width="44" height="170" rx="10" stroke="#1B1A1F" strokeWidth="1.5" fill="none" />
          <line x1="118" y1="40" x2="162" y2="40" stroke="#1B1A1F" strokeWidth="1" />
        </g>
      )}
      {hint === 'server' && (
        <g opacity="0.12">
          <rect x="60" y="35" width="160" height="28" rx="4" stroke="#1B1A1F" strokeWidth="1.5" fill="none" />
          <rect x="60" y="73" width="160" height="28" rx="4" stroke="#1B1A1F" strokeWidth="1.5" fill="none" />
          <rect x="60" y="111" width="160" height="28" rx="4" stroke="#1B1A1F" strokeWidth="1.5" fill="none" />
        </g>
      )}
      {hint === 'browser' && (
        <g opacity="0.12">
          <rect x="40" y="30" width="200" height="140" rx="8" stroke="#1B1A1F" strokeWidth="1.5" fill="none" />
          <line x1="40" y1="52" x2="240" y2="52" stroke="#1B1A1F" strokeWidth="1" />
        </g>
      )}
      {/* Lock — centered */}
      <rect x="110" y="100" width="60" height="50" rx="7" stroke="#1B1A1F" strokeWidth="1.8" fill="none" strokeOpacity="0.4" />
      <path d="M122,100 L122,84 C122,70 158,70 158,84 L158,100"
        stroke="#1B1A1F" strokeWidth="1.8" strokeLinecap="round" fill="none" strokeOpacity="0.4" />
      <circle cx="140" cy="125" r="7" fill="#1B1A1F" fillOpacity="0.28" />
      <line x1="140" y1="132" x2="140" y2="142" stroke="#1B1A1F" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.28" />
    </svg>
  )
}

const PROJECTS = [
  {
    id: 'budqo',
    name: 'Budqo',
    subtitle: 'Our product',
    description: 'A cross-platform personal finance app — smart budgeting, expense tracking, and financial insights. Ships to iOS and Google Play.',
    stack: ['React Native', 'Expo 53', 'TypeScript', 'Supabase'],
    tags: ['Product', 'Mobile', 'React Native'],
    filter: ['Mobile'] as FilterKey[],
    href: 'https://budqo.com/',
    confidential: false,
    annotation: '← our favorite from this year',
    accent: '#C9A9C7',
    Art: () => <PhoneArt />,
  },
  {
    id: 'kando',
    name: 'Kando',
    subtitle: 'Raykan Technologies',
    description: 'End-to-end product design — user research, wireframes, prototypes, and a full design system. UI/UX lead from zero to launch.',
    stack: ['Figma', 'Design Systems', 'Prototyping'],
    tags: ['Client', 'UI/UX', 'Figma', 'Design System'],
    filter: ['UI/UX'] as FilterKey[],
    href: 'https://www.raykan.co/kando/',
    confidential: false,
    annotation: null,
    accent: '#A8BBD6',
    Art: () => <ArtboardArt />,
  },
  {
    id: 'b2b-portal',
    name: 'B2B Portal',
    subtitle: 'Minokode',
    description: 'B2B e-commerce portal with complex catalog management, ordering flows, and account structures for business buyers.',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'Stripe'],
    tags: ['Partner', 'Web', 'E-commerce'],
    filter: ['Web'] as FilterKey[],
    href: 'https://minokode.com/',
    confidential: false,
    annotation: null,
    accent: '#F0B8A8',
    Art: () => <BrowserArt />,
  },
  {
    id: 'lenders',
    name: 'Lenders',
    subtitle: 'Fintech client · NDA',
    description: 'A mobile lending platform handling loan origination, approval workflows, and repayment tracking. Details on a call.',
    stack: ['React Native', 'Expo', 'TypeScript', 'Fintech APIs'],
    tags: ['Confidential', 'Mobile', 'Fintech'],
    filter: ['Mobile'] as FilterKey[],
    href: null,
    confidential: true,
    annotation: null,
    accent: '#C9A9C7',
    Art: () => <LockArt hint="phone" />,
  },
  {
    id: 'mandaue',
    name: 'Centralized System',
    subtitle: 'City Gov. of Mandaue · NDA',
    description: 'Internal platform replacing paper processes across city government offices. Document workflows, inter-office routing. Active deployment.',
    stack: ['Next.js', 'PostgreSQL', 'Python', 'Docker'],
    tags: ['Confidential', 'Systems', 'Government'],
    filter: ['Systems', 'Web'] as FilterKey[],
    href: null,
    confidential: true,
    annotation: null,
    accent: '#A8BBD6',
    Art: () => <LockArt hint="server" />,
  },
  {
    id: 'shopped',
    name: 'Shopped',
    subtitle: 'Pre-launch · NDA',
    description: 'Consumer e-commerce platform in pre-launch. Built end-to-end — storefront, admin, payments. Details on request.',
    stack: ['Next.js', 'Supabase', 'Stripe', 'TypeScript'],
    tags: ['Confidential', 'Web', 'E-commerce'],
    filter: ['Web'] as FilterKey[],
    href: null,
    confidential: true,
    annotation: null,
    accent: '#F0B8A8',
    Art: () => <LockArt hint="browser" />,
  },
]

interface ProjectCardProps {
  project: (typeof PROJECTS)[number]
  isInView: boolean
  index: number
}

function ProjectCard({ project, isInView, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const card = (
    <motion.article
      className="flex flex-col group"
      style={{
        border: '1px solid rgba(27,26,31,0.08)',
        borderRadius: '4px',
        overflow: 'hidden',
        backgroundColor: '#F4EFE6',
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -5, boxShadow: '0 12px 32px rgba(27,26,31,0.08)' }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: index * 0.07 }}
      onMouseEnter={() => { setHovered(true); project.confidential && setShowTooltip(true) }}
      onMouseLeave={() => { setHovered(false); setShowTooltip(false) }}
    >
      {/* Art area — tints to accent on hover */}
      <div
        className="relative flex items-center justify-center"
        style={{
          height: '200px',
          padding: '24px 32px',
          backgroundColor: hovered ? `${project.accent}28` : 'transparent',
          borderBottom: `1px solid ${hovered ? `${project.accent}40` : 'rgba(27,26,31,0.06)'}`,
          transition: 'background-color 0.35s ease, border-color 0.35s ease',
        }}
      >
        <motion.div
          className="w-full h-full max-w-[220px]"
          animate={{ scale: hovered ? 1.07 : 1, opacity: hovered ? 0.9 : 0.65 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <project.Art />
        </motion.div>

        <AnimatePresence>
          {showTooltip && (
            <motion.div
              className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none z-10"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
            >
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.04em',
                color: '#F4EFE6',
                backgroundColor: '#2B2730',
                padding: '4px 10px',
                borderRadius: '2px',
                display: 'block',
                whiteSpace: 'nowrap',
              }}>
                Write to the studio for details
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1 p-5">
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#4A4751',
        }}>
          {project.subtitle}
        </div>

        <div className="flex items-start justify-between gap-2">
          <h3
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: '20px',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: hovered ? project.accent : '#1B1A1F',
              transition: 'color 0.3s ease',
            }}
          >
            {project.name}
          </h3>
          {project.annotation && (
            <span
              className="-rotate-1 flex-shrink-0 mt-0.5"
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '13px',
                color: '#4A4751',
                opacity: 0.7,
                whiteSpace: 'nowrap',
              }}
            >
              {project.annotation}
            </span>
          )}
        </div>

        <p style={{
          fontFamily: "'Manrope', system-ui, sans-serif",
          fontSize: '13px',
          lineHeight: 1.7,
          color: '#4A4751',
          flex: 1,
        }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((tech) => (
            <span key={tech} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.04em',
              color: '#4A4751',
              backgroundColor: 'rgba(27,26,31,0.06)',
              padding: '2px 6px',
              borderRadius: '2px',
            }}>
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-x-1.5 gap-y-1 pt-1">
          {project.tags.map((tag, i) => (
            <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#4A4751', letterSpacing: '0.02em' }}>
              {i > 0 && <span className="opacity-25 mr-1.5">·</span>}{tag}
            </span>
          ))}
        </div>

        {!project.confidential && (
          <div className="pt-2">
            <span className="squiggle-link" style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: '13px',
              color: '#1B1A1F',
            }}>
              View project →
            </span>
          </div>
        )}
      </div>
    </motion.article>
  )

  if (!project.confidential && project.href) {
    return (
      <a href={project.href} target="_blank" rel="noopener noreferrer" className="block focus-visible:outline-none">
        {card}
      </a>
    )
  }

  return card
}

export function Work() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('All')
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const filtered = PROJECTS.filter(
    (p) => activeFilter === 'All' || p.filter.includes(activeFilter)
  )

  return (
    <section id="work" ref={ref} className="py-14 md:py-40" aria-labelledby="work-heading">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <motion.h2
            id="work-heading"
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
            Selected{' '}
            <em style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic', color: '#C9A9C7' }}>
              work
            </em>
          </motion.h2>

          <motion.nav
            aria-label="Work filter"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.2 }}
          >
            <ul className="flex items-center overflow-x-auto pb-1 gap-0" role="list" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
              {FILTERS.map((f, i) => (
                <li key={f} className="flex items-center flex-shrink-0">
                  {i > 0 && <span className="mx-2.5 text-ink-soft opacity-30" aria-hidden="true">/</span>}
                  <button
                    onClick={() => setActiveFilter(f)}
                    className={`transition-colors duration-200 focus-visible:outline-none ${activeFilter === f ? 'text-ink nav-active' : 'text-ink-soft hover:text-ink'}`}
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontWeight: 500,
                      fontSize: '14px',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                    }}
                    aria-current={activeFilter === f ? 'true' : undefined}
                  >
                    {f}
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} isInView={isInView} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
