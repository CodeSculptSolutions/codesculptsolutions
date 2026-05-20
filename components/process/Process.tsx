'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'

const STAGES = [
  {
    number: '01',
    name: 'Discover',
    description: 'Understanding the problem before touching a tool. Conversations, context, constraints. What are you actually trying to solve — and for who?',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="22" cy="22" r="12" stroke="#F4EFE6" strokeWidth="1.5" fill="none" />
        <line x1="31" y1="31" x2="42" y2="42" stroke="#F4EFE6" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="22" cy="22" r="4" fill="#C9A9C7" opacity="0.6" />
      </svg>
    ),
  },
  {
    number: '02',
    name: 'Design',
    description: 'Figma, sketchbook, whiteboard — whatever gets the idea out fast. Structure first, aesthetics second. Flows before pixels.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M10,38 L20,12 L24,16 L28,8 L38,38" stroke="#F4EFE6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M18,30 L30,30" stroke="#C9A9C7" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="22" cy="20" r="2" fill="#F0B8A8" opacity="0.7" />
      </svg>
    ),
  },
  {
    number: '03',
    name: 'Develop',
    description: 'Build in the open. Frequent deploys, short feedback loops. Code that will still make sense to the next person who reads it.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M14,24 L8,18 L14,12" stroke="#A8BBD6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M34,24 L40,18 L34,12" stroke="#A8BBD6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M22,36 L26,8" stroke="#F4EFE6" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    number: '04',
    name: 'Deliver',
    description: 'Ship it. CI/CD, App Store, production deploy — handled. Then: monitor, iterate, and stay available when questions come up.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M24,6 L20,26 L24,22 L28,26 Z" stroke="#F0B8A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M14,36 Q24,42 34,36" stroke="#F4EFE6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
        <line x1="24" y1="22" x2="24" y2="38" stroke="#F4EFE6" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
  },
]

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (shouldReduce || !trackRef.current || !sectionRef.current) return

    let gsap: typeof import('gsap').gsap
    let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger

    const init = async () => {
      const gsapModule = await import('gsap')
      const stModule = await import('gsap/ScrollTrigger')

      gsap = gsapModule.gsap
      ScrollTrigger = stModule.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      const track = trackRef.current!
      const section = sectionRef.current!
      const cards = track.querySelectorAll<HTMLElement>('.process-card')

      const totalWidth = Array.from(cards).reduce((acc, card) => acc + card.offsetWidth + 48, 0)
      const scrollAmount = totalWidth - window.innerWidth + 128

      if (scrollAmount <= 0) return

      gsap.to(track, {
        x: -scrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollAmount}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }

    init()

    return () => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => ScrollTrigger.getAll().forEach((t) => t.kill()))
    }
  }, [shouldReduce])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="overflow-hidden"
      style={{ backgroundColor: '#2B2730', color: '#F4EFE6' }}
      aria-labelledby="process-heading"
    >
      <div className={`${shouldReduce ? 'py-24 md:py-40' : 'h-screen flex flex-col justify-center'}`}>
        {/* Section header */}
        <motion.div
          className="px-8 md:px-16 mb-16 md:mb-20 flex-shrink-0"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          <h2
            id="process-heading"
            style={{
              fontFamily: "'General Sans', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(40px, 5vw, 72px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#F4EFE6',
            }}
          >
            How we{' '}
            <em
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontStyle: 'italic',
                color: '#C9A9C7',
              }}
            >
              work
            </em>
          </h2>
        </motion.div>

        {/* Horizontal track */}
        <div className="overflow-hidden flex-shrink-0">
          <div
            ref={trackRef}
            className={`flex gap-12 px-8 md:px-16 ${shouldReduce ? 'flex-wrap' : 'flex-nowrap'}`}
            style={{ willChange: 'transform' }}
          >
            {STAGES.map((stage, i) => (
              <motion.div
                key={stage.name}
                className="process-card flex-shrink-0 w-[320px] md:w-[400px] border border-canvas/10 p-10 rounded-sm"
                style={{ backgroundColor: 'rgba(244,239,230,0.04)' }}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: i * 0.1 }}
              >
                <div className="mb-8">{stage.icon}</div>

                <div
                  className="mb-2"
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontStyle: 'italic',
                    fontSize: 'clamp(48px, 6vw, 72px)',
                    lineHeight: 1.0,
                    color: '#F4EFE6',
                    opacity: 0.2,
                    letterSpacing: '-0.03em',
                  }}
                  aria-hidden="true"
                >
                  {stage.number}
                </div>

                <h3
                  className="mb-4"
                  style={{
                    fontFamily: "'General Sans', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: '24px',
                    letterSpacing: '-0.02em',
                    color: '#F4EFE6',
                  }}
                >
                  {stage.name}
                </h3>

                <p
                  style={{
                    fontFamily: "'Manrope', system-ui, sans-serif",
                    fontSize: '15px',
                    lineHeight: 1.7,
                    color: 'rgba(244,239,230,0.65)',
                  }}
                >
                  {stage.description}
                </p>
              </motion.div>
            ))}

            {/* Trailing space for scroll */}
            {!shouldReduce && <div className="flex-shrink-0 w-16" aria-hidden="true" />}
          </div>
        </div>
      </div>
    </section>
  )
}
