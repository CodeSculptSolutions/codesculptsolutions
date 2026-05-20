'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
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

  const inputStyle = {
    fontFamily: "'Manrope', system-ui, sans-serif",
    fontSize: '15px',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(27,26,31,0.2)',
    borderRadius: 0,
    padding: '10px 0',
    color: '#1B1A1F',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s ease',
  }

  const labelStyle = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: '#4A4751',
    display: 'block',
    marginBottom: '4px',
  }

  return (
    <section id="contact" ref={ref} className="py-24 md:py-40" aria-labelledby="contact-heading">
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
                color: '#1B1A1F',
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
              I read every message. If we&apos;re a fit, I&apos;ll reply within a day or two with
              questions and a rough sense of what&apos;s possible. If we&apos;re not, I&apos;ll
              tell you that too — and try to point you somewhere useful.
            </p>

            <div className="space-y-3">
              <div style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: '15px', color: '#4A4751' }}>
                Email{' '}
                <a
                  href="mailto:hello@codesculptsolutions.com"
                  className="squiggle-link text-ink font-medium"
                >
                  hello@codesculptsolutions.com
                </a>
              </div>
              <div style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: '15px', color: '#4A4751' }}>
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
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  className="flex flex-col items-start gap-4 py-8"
                >
                  {/* Hand-drawn checkmark */}
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
                    <circle cx="28" cy="28" r="26" stroke="#C9A9C7" strokeWidth="1.5" fill="none" />
                    <path d="M16,28 C20,32 24,36 28,34 C32,32 38,22 44,18" stroke="#1B1A1F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  <p
                    style={{ fontFamily: "'General Sans', system-ui, sans-serif", fontWeight: 600, fontSize: '24px', letterSpacing: '-0.02em', color: '#1B1A1F' }}
                  >
                    Got it. Talk soon.
                  </p>
                  <p
                    className="text-ink-soft"
                    style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: '15px' }}
                  >
                    I&apos;ll be in touch within a couple of days.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>
                    <label htmlFor="message" style={labelStyle}>
                      Tell me about what you&apos;re making
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="A mobile app for tracking plant care. A web platform for our nonprofit. An internal tool that replaces a spreadsheet we've been hating for three years."
                      style={{
                        ...inputStyle,
                        borderBottom: 'none',
                        border: '1px solid rgba(27,26,31,0.15)',
                        padding: '12px',
                        borderRadius: '2px',
                        resize: 'vertical',
                        minHeight: '120px',
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#C9A9C7' }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(27,26,31,0.15)' }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
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
                        style={inputStyle}
                        onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#C9A9C7' }}
                        onBlur={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(27,26,31,0.2)' }}
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
                        style={inputStyle}
                        onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#C9A9C7' }}
                        onBlur={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(27,26,31,0.2)' }}
                      />
                    </div>
                  </div>

                  {state === 'error' && (
                    <p
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#F0B8A8' }}
                    >
                      Something went wrong. Try emailing directly at hello@codesculptsolutions.com
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={state === 'sending'}
                    className="squiggle-link group inline-flex items-center gap-2 text-ink"
                    style={{
                      fontFamily: "'General Sans', system-ui, sans-serif",
                      fontWeight: 500,
                      fontSize: '16px',
                      letterSpacing: '-0.01em',
                      background: 'none',
                      border: 'none',
                      cursor: state === 'sending' ? 'wait' : 'pointer',
                      padding: 0,
                      opacity: state === 'sending' ? 0.5 : 1,
                    }}
                  >
                    {state === 'sending' ? 'Sending...' : 'Send it'}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
