'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { EASE_OUT_EXPO } from '@/lib/motion'

type FormState = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [state, setState] = useState<FormState>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message || state === 'sending') return

    setState('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) throw new Error('Send failed')
      setState('sent')
    } catch {
      setState('error')
    }
  }

  const fieldBase: React.CSSProperties = {
    fontFamily: "'Manrope', system-ui, sans-serif",
    fontSize: '15px',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(var(--ink-rgb), 0.15)',
    borderRadius: 0,
    padding: '12px 0',
    color: 'var(--color-ink)',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.25s ease',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-ink-soft)',
    display: 'block',
    marginBottom: '6px',
  }

  return (
    <section id="contact" ref={ref} className="py-14 md:py-40" aria-labelledby="contact-heading">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left — headline and context */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
          >
            <h2
              id="contact-heading"
              className="mb-8"
              style={{
                fontFamily: "'General Sans', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(40px, 5.5vw, 80px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: 'var(--color-ink)',
              }}
            >
              Have something you want to{' '}
              <em style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic', color: '#C9A9C7' }}>
                make?
              </em>
              {' '}Write to the studio.
            </h2>

            <p
              className="text-ink-soft mb-8"
              style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: '16px', lineHeight: 1.75, maxWidth: '480px' }}
            >
              We read every message. If we&apos;re a fit, we&apos;ll reply within a day or two with
              questions and a rough sense of what&apos;s possible. If we&apos;re not, we&apos;ll
              tell you that too — and try to point you somewhere useful.
            </p>

            <div className="space-y-3">
              <div style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: '15px', color: 'var(--color-ink-soft)' }}>
                Email{' '}
                <a
                  href="mailto:hello@codesculptsolutions.com"
                  className="squiggle-link text-ink font-medium"
                >
                  hello@codesculptsolutions.com
                </a>
              </div>
              <div style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: '15px', color: 'var(--color-ink-soft)' }}>
                Phone{' '}
                <a href="tel:+639457542691" className="squiggle-link text-ink font-medium">
                  +63 945 754 2691
                </a>
              </div>
              <div
                className="text-ink-soft"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '4px' }}
              >
                Mandaue City, Cebu, Philippines
              </div>
            </div>

            <Link
              href="/business-card"
              className="inline-flex items-center gap-1.5 mt-8"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(74,71,81,0.45)' }}
            >
              Print business card →
            </Link>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {state === 'sent' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                  className="flex flex-col items-start gap-5 py-8"
                >
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                    <path
                      d="M10,24 C16,30 20,34 24,32 C28,30 34,20 40,16"
                      stroke="#C9A9C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
                    />
                    <circle cx="24" cy="24" r="22" stroke="rgba(201,169,199,0.25)" strokeWidth="1" fill="none" />
                  </svg>
                  <p style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 600, fontSize: '26px', letterSpacing: '-0.02em', color: 'var(--color-ink)', lineHeight: 1.1 }}>
                    Got it.<br />Talk soon.
                  </p>
                  <p style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: '15px', color: 'var(--color-ink-soft)', lineHeight: 1.7 }}>
                    We&apos;ll be in touch within a couple of days.<br />
                    Check your inbox — you should have a reply from the studio.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-0"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label htmlFor="name" style={labelStyle}>Name</label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        style={fieldBase}
                        onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#C9A9C7' }}
                        onBlur={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(var(--ink-rgb), 0.15)' }}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" style={labelStyle}>Email</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        style={fieldBase}
                        onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#C9A9C7' }}
                        onBlur={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(var(--ink-rgb), 0.15)' }}
                      />
                    </div>
                  </div>

                  {/* Message — full width, underline only */}
                  <div className="mb-12">
                    <label htmlFor="message" style={labelStyle}>
                      What are you making?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="A mobile app for tracking plant care. A web platform for our nonprofit. An internal tool that replaces a spreadsheet we've been hating for three years."
                      style={{
                        ...fieldBase,
                        resize: 'none',
                        paddingTop: '14px',
                        lineHeight: '1.7',
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#C9A9C7' }}
                      onBlur={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(var(--ink-rgb), 0.15)' }}
                    />
                  </div>

                  {/* Submit row */}
                  <div className="flex items-center gap-6 flex-wrap">
                    <motion.button
                      type="submit"
                      disabled={state === 'sending'}
                      className="group inline-flex items-center gap-3"
                      style={{
                        fontFamily: "'General Sans', system-ui, sans-serif",
                        fontWeight: 600,
                        fontSize: '15px',
                        letterSpacing: '-0.01em',
                        backgroundColor: 'var(--color-ink)',
                        color: 'var(--color-canvas)',
                        border: 'none',
                        borderRadius: '3px',
                        padding: '14px 28px',
                        cursor: state === 'sending' ? 'wait' : 'pointer',
                        opacity: state === 'sending' ? 0.6 : 1,
                      }}
                      whileHover={state !== 'sending' ? { backgroundColor: '#C9A9C7', color: '#1B1A1F' } : {}}
                      whileTap={state !== 'sending' ? { scale: 0.97 } : {}}
                      transition={{ duration: 0.2 }}
                    >
                      {state === 'sending' ? 'Sending…' : 'Send it'}
                      <motion.span
                        aria-hidden="true"
                        animate={state === 'sending' ? { x: [0, 4, 0] } : {}}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="group-hover:translate-x-1 transition-transform duration-200"
                      >
                        →
                      </motion.span>
                    </motion.button>

                    {state === 'error' ? (
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#F0B8A8', letterSpacing: '0.04em' }}>
                        Something went wrong — try hello@codesculptsolutions.com
                      </span>
                    ) : (
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--color-ink-soft)', letterSpacing: '0.04em' }}>
                        Usually reply within 2 days
                      </span>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
