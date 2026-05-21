'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, staggerContainer, EASE_OUT_EXPO } from '@/lib/motion'

type StackTok = { name: string; mono: boolean }

const TECH_PARAS: StackTok[][] = [
  [
    { name: 'We build production-grade web applications with ', mono: false },
    { name: 'React', mono: true }, { name: ', ', mono: false },
    { name: 'Next.js', mono: true }, { name: ', and ', mono: false },
    { name: 'TypeScript', mono: true },
    { name: ', and cross-platform mobile apps using ', mono: false },
    { name: 'React Native', mono: true }, { name: ' and ', mono: false },
    { name: 'Expo', mono: true },
    { name: ', maintaining a unified codebase whenever it adds leverage. We design scalable, component-driven systems with ', mono: false },
    { name: 'Tailwind CSS', mono: true }, { name: ' and ', mono: false },
    { name: 'shadcn/ui', mono: true },
    { name: ', prioritizing performance, accessibility, and long-term maintainability.', mono: false },
  ],
  [
    { name: 'We architect backend systems with ', mono: false },
    { name: 'Node.js', mono: true },
    { name: ', API routes, and RPC-driven services, and deploy cloud-native infrastructure on ', mono: false },
    { name: 'AWS', mono: true },
    { name: ' (S3, Lambda, EC2, CloudFront, RDS) with automated CI/CD pipelines. We select the right data layer — ', mono: false },
    { name: 'PostgreSQL', mono: true }, { name: ', ', mono: false },
    { name: 'MySQL', mono: true }, { name: ', ', mono: false },
    { name: 'MongoDB', mono: true }, { name: ', ', mono: false },
    { name: 'Supabase', mono: true }, { name: ', ', mono: false },
    { name: 'Firebase', mono: true }, { name: ', or ', mono: false },
    { name: 'Drizzle ORM', mono: true },
    { name: ' — and enforce end-to-end type safety using ', mono: false },
    { name: 'tRPC', mono: true }, { name: ' and ', mono: false },
    { name: 'Zod', mono: true }, { name: '.', mono: false },
  ],
  [
    { name: 'We implement secure authentication (', mono: false },
    { name: 'OAuth', mono: true }, { name: ', ', mono: false },
    { name: 'JWT', mono: true }, { name: ', ', mono: false },
    { name: 'RBAC', mono: true },
    { name: '), optimize performance at application and infrastructure levels, and write clean, testable, observable code. We use ', mono: false },
    { name: 'Docker', mono: true },
    { name: ' for containerization, ', mono: false },
    { name: 'Git', mono: true },
    { name: ' for version control, and ', mono: false },
    { name: 'Vite', mono: true },
    { name: ' to streamline builds and developer experience.', mono: false },
  ],
  [
    { name: 'When the problem calls for it, we leverage ', mono: false },
    { name: 'Python', mono: true },
    { name: ' (Flask, PyQt) for automation, internal tooling, or system-level utilities. We use ', mono: false },
    { name: 'WordPress', mono: true },
    { name: ' strategically when it aligns with business goals. Our workflow integrates ', mono: false },
    { name: 'Figma', mono: true },
    { name: ' for design collaboration, driven by clear architecture, pragmatic decisions, and a focus on shipping reliable, scalable software.', mono: false },
  ],
]

const STACK_CATEGORIES = [
  { label: 'Frontend',       dot: '#C9A9C7',              chips: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'] },
  { label: 'Mobile',         dot: '#A8BBD6',              chips: ['React Native', 'Expo', 'iOS', 'Android'] },
  { label: 'Backend',        dot: '#F0B8A8',              chips: ['Node.js', 'tRPC', 'Zod', 'REST', 'API Routes'] },
  { label: 'Database',       dot: '#C9A9C7',              chips: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'Firebase', 'Drizzle ORM'] },
  { label: 'Infrastructure', dot: '#A8BBD6',              chips: ['AWS', 'Lambda', 'EC2', 'CloudFront', 'RDS', 'Vercel'] },
  { label: 'Security',       dot: '#F0B8A8',              chips: ['OAuth', 'JWT', 'RBAC', 'Auth flows'] },
  { label: 'Tooling',        dot: '#C9A9C7',              chips: ['Docker', 'Git', 'Vite', 'CI/CD', 'Figma', 'Zed'] },
  { label: 'Other',          dot: 'rgba(74,71,81,0.45)',  chips: ['Python', 'Flask', 'PyQt', 'WordPress'] },
]


const monoLabel: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '10px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--color-ink-soft)',
}

export function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="relative overflow-hidden py-16 md:py-44" aria-labelledby="about-heading">

      {/* Floating accent shapes — desktop only */}
      <div className="pointer-events-none select-none hidden lg:block" aria-hidden="true">

        {/* ── Code symbols ── */}

        {/* </> */}
        <motion.div
          style={{ position: 'absolute', top: '7%', right: '8%', fontFamily: "'JetBrains Mono', monospace", fontSize: '44px', fontWeight: 700, color: '#C9A9C7', opacity: 0.32, letterSpacing: '-0.02em', lineHeight: 1 }}
          animate={{ y: [0, -24, 0], x: [0, 6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {'</>'}
        </motion.div>

        {/* { } */}
        <motion.div
          style={{ position: 'absolute', top: '55%', right: '5%', fontFamily: "'JetBrains Mono', monospace", fontSize: '30px', fontWeight: 400, color: '#A8BBD6', opacity: 0.36, letterSpacing: '0.08em', lineHeight: 1 }}
          animate={{ y: [0, 20, 0], x: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        >
          {'{ }'}
        </motion.div>

        {/* // craft */}
        <motion.div
          style={{ position: 'absolute', top: '20%', right: '17%', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: 'var(--color-ink-soft)', opacity: 0.35, letterSpacing: '0.04em' }}
          animate={{ y: [0, -16, 0], opacity: [0.35, 0.15, 0.35] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        >
          {'// craft'}
        </motion.div>

        {/* ( ) => */}
        <motion.div
          style={{ position: 'absolute', top: '42%', right: '13%', fontFamily: "'JetBrains Mono', monospace", fontSize: '20px', fontWeight: 700, color: '#F0B8A8', opacity: 0.38, letterSpacing: '0.02em' }}
          animate={{ y: [0, 18, 0], x: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        >
          {'( ) =>'}
        </motion.div>

        {/* Binary block */}
        <motion.div
          style={{ position: 'absolute', top: '65%', right: '18%', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--color-ink-soft)', opacity: 0.22, letterSpacing: '0.14em', lineHeight: 1.8 }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        >
          {'01101'}<br />{'11010'}<br />{'00101'}
        </motion.div>

        {/* ── Geometric shapes ── */}

        {/* Clay circle outline */}
        <motion.div
          style={{ position: 'absolute', top: '4%', right: '22%', width: '72px', height: '72px', borderRadius: '50%', border: '2px solid #C9A9C7', opacity: 0.55 }}
          animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* Mist diamond */}
        <motion.div
          style={{ position: 'absolute', top: '30%', right: '23%', width: '20px', height: '20px', backgroundColor: '#A8BBD6', opacity: 0.55, rotate: 45 }}
          animate={{ y: [0, 22, 0], rotate: [45, 90, 45] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Bloom dot */}
        <motion.div
          style={{ position: 'absolute', top: '13%', right: '6%', width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#F0B8A8', opacity: 0.7 }}
          animate={{ y: [0, -18, 0], x: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />

        {/* Large ghost circle */}
        <motion.div
          style={{ position: 'absolute', top: '-10%', right: '-6%', width: '360px', height: '360px', borderRadius: '50%', border: '1.5px solid rgba(201,169,199,0.2)' }}
          animate={{ scale: [1, 1.06, 1], rotate: [0, 12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

      </div>

      <div className="max-w-[1440px] mx-auto px-8 md:px-16">

        {/* ── Label + Headline ── */}
        <div className="mb-12 md:mb-16">
          <motion.div
            style={monoLabel}
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            About the studio
          </motion.div>

          <motion.h2
            id="about-heading"
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.05 }}
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(48px, 8.5vw, 120px)',
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              color: 'var(--color-ink)',
            }}
          >
            Tech with the{' '}
            <em
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontStyle: 'italic',
                color: '#C9A9C7',
                fontOpticalSizing: 'auto',
                position: 'relative',
                display: 'inline-block',
              }}
            >
              soul
              <motion.span
                style={{
                  position: 'absolute',
                  bottom: '2px',
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: '#C9A9C7',
                  transformOrigin: 'left',
                  display: 'block',
                }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.6 }}
              />
            </em>
            <br />
            of an artist.
          </motion.h2>
        </div>

        {/* ── Body copy ── */}
        <motion.div
          className="flex flex-col gap-5 mb-20 md:mb-28"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(19px, 1.8vw, 22px)',
              lineHeight: 1.55,
              color: 'var(--color-ink)',
              letterSpacing: '-0.01em',
            }}
          >
            Code Sculpt Solutions is a solo studio out of Cebu, Philippines. One builder,
            no handoffs — every project runs from the first wireframe to the final deploy
            through the same hands.
          </motion.p>
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: '17px',
              lineHeight: 1.78,
              color: 'var(--color-ink-soft)',
            }}
          >
            Since 2021 we&apos;ve shipped a data management system for city government,
            led design on a fintech product, built mobile apps in React Native, and made
            production templates for software teams in Australia. Different stacks,
            different industries — same obsession with craft.
          </motion.p>
        </motion.div>

        {/* ── Tech stack — full width ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.4 }}
          style={{ borderTop: '1px solid rgba(var(--ink-rgb), 0.1)', paddingTop: '36px' }}
        >
          <div style={{ ...monoLabel, marginBottom: '28px' }}>Stack</div>

          {/* Prose — 2-col on large screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-5 mb-14">
            {TECH_PARAS.map((para, pi) => (
              <p
                key={pi}
                className={pi >= 2 ? 'hidden md:block' : undefined}
                style={{
                  fontFamily: "'Manrope', system-ui, sans-serif",
                  fontSize: '15px',
                  lineHeight: 1.85,
                  color: 'var(--color-ink-soft)',
                  margin: 0,
                }}
              >
                {para.map((token, i) =>
                  token.mono ? (
                    <code
                      key={i}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '12.5px',
                        backgroundColor: 'var(--color-canvas-deep)',
                        padding: '1px 5px',
                        borderRadius: '3px',
                        color: 'var(--color-ink)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {token.name}
                    </code>
                  ) : (
                    <span key={i}>{token.name}</span>
                  )
                )}
              </p>
            ))}
          </div>

          {/* Category chips grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STACK_CATEGORIES.map((cat) => (
              <div
                key={cat.label}
                style={{
                  backgroundColor: 'rgba(var(--ink-rgb), 0.03)',
                  border: '1px solid rgba(var(--ink-rgb), 0.08)',
                  borderRadius: '4px',
                  padding: '14px 16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: cat.dot, flexShrink: 0, display: 'inline-block' }} />
                  <span style={{ ...monoLabel }}>{cat.label}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {cat.chips.map((chip) => (
                    <span
                      key={chip}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '10.5px',
                        letterSpacing: '0.02em',
                        color: 'var(--color-ink-soft)',
                        backgroundColor: 'rgba(var(--ink-rgb), 0.06)',
                        padding: '2px 6px',
                        borderRadius: '2px',
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
