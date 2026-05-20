'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, staggerContainer, EASE_OUT_EXPO } from '@/lib/motion'

const TECH_STACK = [
  { name: 'React', mono: true },
  { name: ', ', mono: false },
  { name: 'Next.js', mono: true },
  { name: ', and ', mono: false },
  { name: 'TypeScript', mono: true },
  { name: ' for the web. ', mono: false },
  { name: 'React Native', mono: true },
  { name: ' with ', mono: false },
  { name: 'Expo', mono: true },
  { name: ' for mobile — cross-platform, single codebase. ', mono: false },
  { name: 'Tailwind CSS', mono: true },
  { name: ' and ', mono: false },
  { name: 'shadcn/ui', mono: true },
  { name: ' for styling and components. ', mono: false },
  { name: 'AWS', mono: true },
  { name: ' (S3, Lambda, EC2, CloudFront) for infra and deployments. ', mono: false },
  { name: 'Supabase', mono: true },
  { name: ', ', mono: false },
  { name: 'Firebase', mono: true },
  { name: ', ', mono: false },
  { name: 'PostgreSQL', mono: true },
  { name: ', or ', mono: false },
  { name: 'Drizzle', mono: true },
  { name: ' depending on the data shape. ', mono: false },
  { name: 'tRPC', mono: true },
  { name: ' and ', mono: false },
  { name: 'Zod', mono: true },
  { name: ' for type-safe APIs. ', mono: false },
  { name: 'Python', mono: true },
  { name: ' (Flask, PyQT) for systems that need it. ', mono: false },
  { name: 'WordPress', mono: true },
  { name: " when it's the right tool. ", mono: false },
  { name: 'Figma', mono: true },
  { name: ' for design. ', mono: false },
  { name: 'Docker', mono: true },
  { name: ', ', mono: false },
  { name: 'Git', mono: true },
  { name: ', ', mono: false },
  { name: 'Vite', mono: true },
  { name: ', and a lot of coffee.', mono: false },
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

        {/* ── Tech stack — full width, below a rule ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.4 }}
          style={{ borderTop: '1px solid rgba(27,26,31,0.1)', paddingTop: '28px' }}
        >
          <div style={{ ...monoLabel, marginBottom: '14px' }}>Stack</div>
          <p
            style={{
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: '15px',
              lineHeight: 1.9,
              color: '#4A4751',
              maxWidth: '900px',
            }}
          >
            {TECH_STACK.map((token, i) =>
              token.mono ? (
                <code
                  key={i}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '13px',
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
        </motion.div>

      </div>
    </section>
  )
}
