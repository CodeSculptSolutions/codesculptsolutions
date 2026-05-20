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

const STATS = [
  { number: '30+', label: 'projects shipped', accent: false },
  { number: '20+', label: 'clients in trust', accent: true },
  { number: '4+',  label: 'years in the studio', accent: false },
]

const monoLabel: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '10px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#4A4751',
}

export function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="py-28 md:py-44" aria-labelledby="about-heading">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">

        {/* ── Section label ── */}
        <motion.div
          style={monoLabel}
          className="mb-14"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          About the studio
        </motion.div>

        {/* ── Main grid: [content] [stats margin] ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] lg:grid-cols-[1fr_240px] gap-x-16 lg:gap-x-24 gap-y-16 mb-20 md:mb-28">

          {/* Left — headline + body copy */}
          <div>
            <motion.h2
              id="about-heading"
              className="mb-10 md:mb-14"
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.05 }}
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(48px, 6.5vw, 88px)',
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                color: '#1B1A1F',
              }}
            >
              Tech with the{' '}
              <em
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontStyle: 'italic',
                  color: '#C9A9C7',
                  fontOpticalSizing: 'auto',
                }}
              >
                soul
              </em>{' '}
              of an artist.
            </motion.h2>

            <motion.div
              className="space-y-5 max-w-[580px]"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <motion.p
                variants={fadeUp}
                style={{
                  fontFamily: "'Manrope', system-ui, sans-serif",
                  fontSize: '17px',
                  lineHeight: 1.78,
                  color: '#4A4751',
                }}
              >
                I started CodeSculptSolutions because I kept noticing the same gap. Most studios
                either build well or design well — rarely both, and almost never with a sense of
                craft. I wanted somewhere I could take an idea from a Figma file to a production
                deploy without it losing its soul along the way.
              </motion.p>
              <motion.p
                variants={fadeUp}
                style={{
                  fontFamily: "'Manrope', system-ui, sans-serif",
                  fontSize: '17px',
                  lineHeight: 1.78,
                  color: '#4A4751',
                }}
              >
                Since 2021 I&apos;ve shipped data systems for a city government, led design on a
                fintech product, built mobile apps in React Native, and made production templates
                for software teams in Australia. Different stacks, different industries — same
                obsession with making things that feel intentional.
              </motion.p>
            </motion.div>
          </div>

          {/* Right — stats as margin annotations */}
          <motion.div
            className="self-start divide-y md:pt-2"
            style={{ borderTop: '1px solid rgba(27,26,31,0.1)', borderColor: 'rgba(27,26,31,0.1)' }}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.number}
                variants={fadeUp}
                className="py-5"
                style={{ borderBottom: '1px solid rgba(27,26,31,0.1)' }}
              >
                <div
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: '42px',
                    lineHeight: 1.05,
                    letterSpacing: '-0.03em',
                    color: stat.accent ? '#C9A9C7' : '#1B1A1F',
                  }}
                >
                  {stat.number}
                </div>
                <div
                  className="mt-1"
                  style={{
                    fontFamily: "'Manrope', system-ui, sans-serif",
                    fontSize: '12px',
                    color: '#4A4751',
                    letterSpacing: '0.02em',
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* ── Tech stack — full width ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.4 }}
          style={{ borderTop: '1px solid rgba(27,26,31,0.1)', paddingTop: '36px' }}
        >
          <div style={{ ...monoLabel, marginBottom: '28px' }}>Stack</div>

          {/* Prose — 2-col on large screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-5 mb-14">
            {TECH_PARAS.map((para, pi) => (
              <p
                key={pi}
                style={{
                  fontFamily: "'Manrope', system-ui, sans-serif",
                  fontSize: '15px',
                  lineHeight: 1.85,
                  color: '#4A4751',
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
                        backgroundColor: '#E8DFD0',
                        padding: '1px 5px',
                        borderRadius: '3px',
                        color: '#1B1A1F',
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
                  backgroundColor: 'rgba(27,26,31,0.03)',
                  border: '1px solid rgba(27,26,31,0.08)',
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
                        color: '#4A4751',
                        backgroundColor: 'rgba(27,26,31,0.06)',
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
