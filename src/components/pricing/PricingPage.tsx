'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { LogoMark } from '@/components/ui/LogoMark'
import { EASE_OUT_EXPO } from '@/lib/motion'

// ─── Types ────────────────────────────────────────────────────────────────────

type Currency = 'USD' | 'AUD' | 'PHP'

// ─── Currency config ──────────────────────────────────────────────────────────

const CURRENCIES: Record<Currency, { symbol: string; label: string; flag: string; locale: string }> = {
  USD: { symbol: '$',  label: 'USD',  flag: '🇺🇸', locale: 'en-US' },
  AUD: { symbol: 'A$', label: 'AUD',  flag: '🇦🇺', locale: 'en-AU' },
  PHP: { symbol: '₱',  label: 'PHP',  flag: '🇵🇭', locale: 'en-PH' },
}

// ─── Pricing data ─────────────────────────────────────────────────────────────

type PriceRange = { from: number; to?: number }
type CurrencyPrices = Record<Currency, PriceRange>

const SERVICES = [
  {
    id: 'web',
    name: 'Web Development',
    color: '#C9A9C7',
    tiers: [
      {
        name: 'Landing Page',
        desc: 'Single-page marketing site or portfolio. Fast, SEO-optimised, and responsive.',
        duration: '1–2 weeks',
        prices: { USD: { from: 800, to: 2500 }, AUD: { from: 1200, to: 3800 }, PHP: { from: 45000, to: 140000 } } as CurrencyPrices,
        includes: ['Up to 6 sections', 'Contact form', 'CMS-ready', 'Mobile-first', 'SEO basics'],
      },
      {
        name: 'Web App / MVP',
        desc: 'Full-stack web application with auth, dashboard, and your core feature set.',
        duration: '4–8 weeks',
        prices: { USD: { from: 4000, to: 12000 }, AUD: { from: 6000, to: 18000 }, PHP: { from: 220000, to: 680000 } } as CurrencyPrices,
        includes: ['Auth (OAuth / JWT)', 'DB design + ORM', 'Admin panel', 'REST or tRPC API', 'Vercel deploy'],
      },
      {
        name: 'Full Platform',
        desc: 'Production-grade platform with advanced features, integrations, and cloud infrastructure.',
        duration: '8–20 weeks',
        prices: { USD: { from: 18000 }, AUD: { from: 27000 }, PHP: { from: 800000, to: 1000000 } } as CurrencyPrices,
        includes: ['Custom AWS infra', 'CI/CD pipelines', 'Multi-role RBAC', 'Payments + billing', 'Analytics + logging'],
        featured: true,
      },
    ],
    hourly: { USD: [55, 85], AUD: [82, 128], PHP: [3100, 4800] } as Record<Currency, number[]>,
  },
  {
    id: 'mobile',
    name: 'Mobile Apps',
    color: '#A8BBD6',
    tiers: [
      {
        name: 'Simple App',
        desc: 'React Native app with core screens, basic auth, and App Store submission.',
        duration: '3–6 weeks',
        prices: { USD: { from: 6000, to: 10000 }, AUD: { from: 9000, to: 15000 }, PHP: { from: 340000, to: 570000 } } as CurrencyPrices,
        includes: ['iOS + Android', 'Auth + onboarding', 'Push notifications', 'App Store submission'],
      },
      {
        name: 'Medium App',
        desc: 'Feature-complete app with API integration, offline support, and payment flows.',
        duration: '6–12 weeks',
        prices: { USD: { from: 10000, to: 22000 }, AUD: { from: 15000, to: 33000 }, PHP: { from: 570000, to: 1250000 } } as CurrencyPrices,
        includes: ['Offline-first', 'Payment integration', 'Real-time sync', 'Analytics + crash logs'],
        featured: true,
      },
      {
        name: 'Complex App',
        desc: 'Enterprise-grade mobile app with complex workflows and custom backend infrastructure.',
        duration: '12–24 weeks',
        prices: { USD: { from: 22000 }, AUD: { from: 33000 }, PHP: { from: 1250000 } } as CurrencyPrices,
        includes: ['Custom backend', 'Admin dashboard', 'Multi-tenant', 'Scale-ready infra', 'SLA available'],
      },
    ],
    hourly: { USD: [60, 90], AUD: [90, 135], PHP: [3400, 5100] } as Record<Currency, number[]>,
  },
  {
    id: 'design',
    name: 'UI/UX Design',
    color: '#F0B8A8',
    tiers: [
      {
        name: 'Landing Page',
        desc: 'High-fidelity Figma design for a marketing site or key product page.',
        duration: '1–2 weeks',
        prices: { USD: { from: 1500, to: 3000 }, AUD: { from: 2200, to: 4500 }, PHP: { from: 85000, to: 170000 } } as CurrencyPrices,
        includes: ['Desktop + mobile', 'Design tokens', 'Figma source file', 'Handoff-ready'],
      },
      {
        name: 'Full App Design',
        desc: 'Complete product design from user flows to high-fidelity screens and prototype.',
        duration: '2–5 weeks',
        prices: { USD: { from: 3500, to: 8000 }, AUD: { from: 5200, to: 12000 }, PHP: { from: 200000, to: 450000 } } as CurrencyPrices,
        includes: ['User flows', 'Wireframes', 'Hi-fi screens', 'Interactive prototype', 'Handoff'],
        featured: true,
      },
      {
        name: 'Design System',
        desc: 'Scalable component library and design tokens for a growing product team.',
        duration: '3–6 weeks',
        prices: { USD: { from: 6000 }, AUD: { from: 9000 }, PHP: { from: 340000 } } as CurrencyPrices,
        includes: ['Full component library', 'Token system', 'Documentation', 'Figma + code tokens'],
      },
    ],
    hourly: { USD: [45, 70], AUD: [67, 105], PHP: [2500, 4000] } as Record<Currency, number[]>,
  },
  {
    id: 'systems',
    name: 'Custom Systems',
    color: '#B5CEA8',
    tiers: [
      {
        name: 'Internal Tool',
        desc: 'Admin dashboard, data management system, or internal workflow automation.',
        duration: '3–8 weeks',
        prices: { USD: { from: 5000, to: 12000 }, AUD: { from: 7500, to: 18000 }, PHP: { from: 280000, to: 680000 } } as CurrencyPrices,
        includes: ['RBAC auth', 'CRUD + filters', 'Reporting + export', 'Role management'],
      },
      {
        name: 'Gov / Enterprise',
        desc: 'Large-scale systems for government agencies, NGOs, or enterprise clients.',
        duration: '10–30+ weeks',
        prices: { USD: { from: 15000 }, AUD: { from: 22500 }, PHP: { from: 900000, to: 1500000 } } as CurrencyPrices,
        includes: ['Compliance-ready', 'Audit logs', 'On-premise option', 'Documentation', 'Training'],
        featured: true,
      },
    ],
    hourly: { USD: [65, 95], AUD: [97, 142], PHP: [3700, 5400] } as Record<Currency, number[]>,
  },
]

const RETAINERS = [
  {
    name: 'Part-time',
    hours: '~40 hrs / mo',
    desc: 'Regular development bandwidth for startups and teams with ongoing feature work.',
    prices: { USD: 2500, AUD: 3750, PHP: 140000 } as Record<Currency, number>,
    includes: ['~40 hrs/month', 'Priority response', 'Monthly planning call', 'Async comms (Slack / Discord)', 'Monthly progress report'],
  },
  {
    name: 'Full-time',
    hours: '~160 hrs / mo',
    desc: 'Full studio bandwidth. Embedded as a dedicated team member.',
    prices: { USD: 5000, AUD: 7500, PHP: 280000 } as Record<Currency, number>,
    includes: ['~160 hrs/month', 'Daily standups available', 'Design + development', 'On-call support', 'Priority queue always'],
    featured: true,
  },
]

const FAQS = [
  {
    q: 'Do you require a deposit?',
    a: "Yes — 40% upfront before work begins, 40% at the midpoint milestone, and 20% on delivery. For retainers, it's billed monthly at the start of each period.",
  },
  {
    q: 'What if the scope changes mid-project?',
    a: "We document scope clearly at the start. Changes are handled via a simple change order — we'll quote any additions before touching them. No surprise invoices.",
  },
  {
    q: 'Do you sign NDAs?',
    a: "Yes, happy to. Send yours and we'll review it before the project starts.",
  },
  {
    q: 'Can we be hired for just one part — design only or dev only?',
    a: "Absolutely. Design-only and development-only engagements are available. Most clients end up wanting both, but there's no requirement.",
  },
  {
    q: 'How does the discovery call work?',
    a: "It's a 30–45 minute call where we learn about your project, goals, timeline, and constraints. No sales pitch — just questions. From there we send a written proposal with scope and pricing within 2 business days.",
  },
  {
    q: 'Do these prices include hosting and third-party services?',
    a: "No — hosting (Vercel, AWS), domains, third-party APIs, and SaaS tools are billed separately at cost. We'll be upfront about expected running costs before the project starts.",
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number, currency: Currency): string {
  const { locale, symbol } = CURRENCIES[currency]
  const formatted = n.toLocaleString(locale, { maximumFractionDigits: 0 })
  return currency === 'AUD' ? `A$${formatted}` : `${symbol}${formatted}`
}

function fmtRange(range: PriceRange, currency: Currency): string {
  if (range.to) return `${fmt(range.from, currency)} – ${fmt(range.to, currency)}`
  return `From ${fmt(range.from, currency)}`
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const gs  = { fontFamily: "'General Sans', system-ui, sans-serif" }
const mn  = { fontFamily: "'Manrope', system-ui, sans-serif" }
const mono = { fontFamily: "'JetBrains Mono', monospace" }
const serif = { fontFamily: "'Fraunces', Georgia, serif" }

// ─── Sub-components ───────────────────────────────────────────────────────────

function CurrencyBadge({ current, onChange }: { current: Currency; onChange: (c: Currency) => void }) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-full" style={{ backgroundColor: 'rgba(var(--ink-rgb), 0.06)' }}>
      {(Object.keys(CURRENCIES) as Currency[]).map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 focus-visible:outline-none text-sm font-medium"
          style={{
            ...gs,
            backgroundColor: current === c ? 'var(--color-ink)' : 'transparent',
            color: current === c ? 'var(--color-canvas)' : 'var(--color-ink-soft)',
            fontSize: '12px',
            letterSpacing: '0.02em',
          }}
        >
          <span>{CURRENCIES[c].flag}</span>
          <span style={mono}>{CURRENCIES[c].label}</span>
        </button>
      ))}
    </div>
  )
}

function TierCard({ tier, currency, accent }: { tier: typeof SERVICES[0]['tiers'][0]; currency: Currency; accent: string }) {
  return (
    <div
      className="relative flex flex-col p-4 md:p-6 rounded-sm"
      style={{
        backgroundColor: tier.featured ? 'var(--color-ink)' : 'var(--color-canvas)',
        border: tier.featured ? 'none' : '1px solid rgba(var(--ink-rgb), 0.1)',
        flex: 1,
      }}
    >
      {tier.featured && (
        <div className="absolute top-4 right-4">
          <span style={{ ...mono, fontSize: '9px', letterSpacing: '0.1em', color: accent, textTransform: 'uppercase' }}>
            Popular
          </span>
        </div>
      )}

      <div className="mb-4">
        <div style={{ ...mono, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: tier.featured ? 'rgba(var(--canvas-rgb), 0.45)' : 'var(--color-ink-soft)', marginBottom: '6px' }}>
          {tier.duration}
        </div>
        <div style={{ ...gs, fontWeight: 600, fontSize: '16px', color: tier.featured ? 'var(--color-canvas)' : 'var(--color-ink)', letterSpacing: '-0.01em' }}>
          {tier.name}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currency + tier.name}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="mb-4"
        >
          <div style={{ ...gs, fontWeight: 700, fontSize: 'clamp(20px, 2.5vw, 26px)', letterSpacing: '-0.02em', color: tier.featured ? accent : 'var(--color-ink)', lineHeight: 1.1 }}>
            {fmtRange(tier.prices[currency], currency)}
          </div>
        </motion.div>
      </AnimatePresence>

      <p style={{ ...mn, fontSize: '13px', lineHeight: 1.65, color: tier.featured ? 'rgba(var(--canvas-rgb), 0.6)' : 'var(--color-ink-soft)', marginBottom: '20px' }}>
        {tier.desc}
      </p>

      <ul className="mt-auto space-y-2">
        {tier.includes.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span style={{ color: accent, fontSize: '12px', lineHeight: 1.8, flexShrink: 0 }}>✦</span>
            <span style={{ ...mono, fontSize: '11px', color: tier.featured ? 'rgba(var(--canvas-rgb), 0.7)' : 'var(--color-ink-soft)', lineHeight: 1.7 }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ServiceSection({ service, currency }: { service: typeof SERVICES[0]; currency: Currency }) {
  const hourly = service.hourly[currency]
  return (
    <div className="mb-20">
      <div className="flex items-baseline justify-between mb-8 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: service.color, display: 'inline-block', flexShrink: 0 }} />
          <h2 style={{ ...gs, fontWeight: 700, fontSize: 'clamp(22px, 3vw, 32px)', letterSpacing: '-0.02em', color: 'var(--color-ink)' }}>
            {service.name}
          </h2>
        </div>
        <div style={{ ...mono, fontSize: '11px', color: 'var(--color-ink-soft)', letterSpacing: '0.04em' }}>
          Hourly:{' '}
          <AnimatePresence mode="wait">
            <motion.span
              key={currency}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {fmt(hourly[0], currency)} – {fmt(hourly[1], currency)}/hr
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {service.tiers.map((tier) => (
          <TierCard key={tier.name} tier={tier} currency={currency} accent={service.color} />
        ))}
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function PricingPage() {
  const [currency, setCurrency] = useState<Currency>('USD')
  const [detected, setDetected] = useState<Currency | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then((d: { country_code?: string }) => {
        const c = d.country_code
        const resolved: Currency = c === 'AU' ? 'AUD' : c === 'PH' ? 'PHP' : 'USD'
        setCurrency(resolved)
        setDetected(resolved)
      })
      .catch(() => setDetected('USD'))
  }, [])

  return (
    <div style={{ backgroundColor: 'var(--color-canvas)', minHeight: '100vh' }}>

      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'rgba(var(--canvas-rgb), 0.92)', backdropFilter: 'blur(8px)', borderColor: 'rgba(var(--ink-rgb), 0.08)' }}>
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 focus-visible:outline-none group">
            <div className="flex items-center" style={{ gap: '2px' }}>
              <span style={{ ...mono, color: 'var(--color-ink-soft)', fontSize: '14px', lineHeight: 1, userSelect: 'none' }}>{'<'}</span>
              <LogoMark size={18} animated={false} variant="compact" />
              <span style={{ ...mono, color: 'var(--color-ink-soft)', fontSize: '14px', lineHeight: 1, userSelect: 'none' }}>{'>'}</span>
            </div>
            <span style={{ ...gs, fontWeight: 600, fontSize: '14px', letterSpacing: '-0.02em', color: 'var(--color-ink)' }}>
              Code Sculpt Solutions
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/#contact"
              className="text-[13px] font-medium transition-colors duration-200"
              style={{ ...gs, color: 'var(--color-ink-soft)', letterSpacing: '0.01em' }}
            >
              Let&apos;s talk →
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-8 md:px-16">

        {/* ── Hero ── */}
        <div className="pt-12 pb-10 md:pt-20 md:pb-16 border-b" style={{ borderColor: 'rgba(var(--ink-rgb), 0.1)' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          >
            <div style={{ ...mono, fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-soft)', marginBottom: '16px' }}>
              Transparent Pricing
            </div>
            <h1 style={{ ...gs, fontWeight: 700, fontSize: 'clamp(48px, 7vw, 96px)', letterSpacing: '-0.03em', lineHeight: 1.02, color: 'var(--color-ink)', marginBottom: '16px' }}>
              What it{' '}
              <em style={{ ...serif, fontStyle: 'italic', color: '#C9A9C7' }}>costs.</em>
            </h1>
            <p style={{ ...mn, fontSize: '17px', lineHeight: 1.75, color: 'var(--color-ink-soft)', maxWidth: '560px', marginBottom: '32px' }}>
              Project-based pricing with no hidden fees. Every engagement starts with a discovery call — scope is defined in writing before a single line of code is written.
            </p>

            {/* Currency switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <CurrencyBadge current={currency} onChange={setCurrency} />
              {detected && (
                <span style={{ ...mono, fontSize: '11px', color: 'rgba(74,71,81,0.5)', letterSpacing: '0.04em' }}>
                  {CURRENCIES[detected].flag} Auto-detected · {CURRENCIES[detected].label}
                </span>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── Services pricing ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.15 }}
          className="pt-20"
        >
          {SERVICES.map((service) => (
            <ServiceSection key={service.id} service={service} currency={currency} />
          ))}
        </motion.div>

        {/* ── Retainers ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.2 }}
          className="pb-20 border-t pt-16"
          style={{ borderColor: 'rgba(var(--ink-rgb), 0.1)' }}
        >
          <div className="mb-10">
            <div style={{ ...mono, fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-ink-soft)', marginBottom: '8px' }}>
              Ongoing work
            </div>
            <h2 style={{ ...gs, fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.025em', color: 'var(--color-ink)' }}>
              Monthly{' '}
              <em style={{ ...serif, fontStyle: 'italic', color: '#C9A9C7' }}>retainers</em>
            </h2>
            <p style={{ ...mn, fontSize: '15px', lineHeight: 1.7, color: 'var(--color-ink-soft)', maxWidth: '520px', marginTop: '10px' }}>
              For teams that need consistent bandwidth. No scope, no surprises — just dedicated time, billed monthly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[800px]">
            {RETAINERS.map((r) => (
              <div
                key={r.name}
                className="p-8 rounded-sm"
                style={{
                  backgroundColor: r.featured ? 'var(--color-kiln)' : 'rgba(var(--ink-rgb), 0.04)',
                  border: r.featured ? 'none' : '1px solid rgba(var(--ink-rgb), 0.08)',
                }}
              >
                <div style={{ ...mono, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: r.featured ? '#C9A9C7' : 'var(--color-ink-soft)', marginBottom: '6px' }}>
                  {r.hours}
                </div>
                <div style={{ ...gs, fontWeight: 700, fontSize: '20px', letterSpacing: '-0.02em', color: r.featured ? 'var(--color-canvas)' : 'var(--color-ink)', marginBottom: '4px' }}>
                  {r.name}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currency + r.name}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    style={{ ...gs, fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-0.03em', color: r.featured ? '#C9A9C7' : 'var(--color-ink)', lineHeight: 1.05, margin: '12px 0' }}
                  >
                    {fmt(r.prices[currency], currency)}
                    <span style={{ ...mn, fontSize: '14px', fontWeight: 400, color: r.featured ? 'rgba(var(--canvas-rgb), 0.4)' : 'rgba(74,71,81,0.5)', marginLeft: '6px' }}>/mo</span>
                  </motion.div>
                </AnimatePresence>

                <p style={{ ...mn, fontSize: '13px', lineHeight: 1.65, color: r.featured ? 'rgba(var(--canvas-rgb), 0.55)' : 'var(--color-ink-soft)', marginBottom: '20px' }}>
                  {r.desc}
                </p>
                <ul className="space-y-2">
                  {r.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span style={{ color: '#C9A9C7', fontSize: '12px', lineHeight: 1.8, flexShrink: 0 }}>✦</span>
                      <span style={{ ...mono, fontSize: '11px', color: r.featured ? 'rgba(var(--canvas-rgb), 0.65)' : 'var(--color-ink-soft)', lineHeight: 1.7 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── What's always included ── */}
        <div className="py-16 border-t" style={{ borderColor: 'rgba(var(--ink-rgb), 0.1)' }}>
          <div style={{ ...mono, fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-ink-soft)', marginBottom: '8px' }}>
            Every project
          </div>
          <h2 style={{ ...gs, fontWeight: 700, fontSize: 'clamp(24px, 3vw, 38px)', letterSpacing: '-0.025em', color: 'var(--color-ink)', marginBottom: '32px' }}>
            What&apos;s always included
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Written scope', desc: 'Every project starts with a written proposal. Scope, deliverables, and timeline — agreed in writing before work begins.' },
              { label: 'Figma designs', desc: 'You get the source Figma file. Not just a handoff export — the actual working file, yours to keep.' },
              { label: 'Clean, commented code', desc: 'GitHub repo access throughout the project. Your code, your repo. No lock-in.' },
              { label: 'Deployment', desc: "First deployment is included. We'll get it live on Vercel, AWS, or wherever makes sense for your stack." },
              { label: '30-day support', desc: 'Bug fixes at no additional cost for 30 days after delivery. Not feature requests — bugs.' },
              { label: 'Knowledge transfer', desc: 'A walkthrough session on delivery so your team knows how to work with what we built.' },
            ].map((item) => (
              <div key={item.label} className="p-6 rounded-sm" style={{ backgroundColor: 'rgba(var(--ink-rgb), 0.03)', border: '1px solid rgba(var(--ink-rgb), 0.07)' }}>
                <div style={{ ...gs, fontWeight: 600, fontSize: '14px', color: 'var(--color-ink)', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                  {item.label}
                </div>
                <p style={{ ...mn, fontSize: '13px', lineHeight: 1.65, color: 'var(--color-ink-soft)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="py-16 border-t" style={{ borderColor: 'rgba(var(--ink-rgb), 0.1)' }}>
          <div style={{ ...mono, fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-ink-soft)', marginBottom: '8px' }}>
            Common questions
          </div>
          <h2 style={{ ...gs, fontWeight: 700, fontSize: 'clamp(24px, 3vw, 38px)', letterSpacing: '-0.025em', color: 'var(--color-ink)', marginBottom: '32px' }}>
            FAQ
          </h2>
          <div className="max-w-[720px] divide-y" style={{ borderColor: 'rgba(var(--ink-rgb), 0.1)' }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderTop: i === 0 ? '1px solid rgba(var(--ink-rgb), 0.1)' : 'none', borderBottom: '1px solid rgba(var(--ink-rgb), 0.1)' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left focus-visible:outline-none"
                >
                  <span style={{ ...gs, fontWeight: 600, fontSize: '15px', color: 'var(--color-ink)', letterSpacing: '-0.01em', paddingRight: '24px' }}>
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    style={{ ...mono, fontSize: '18px', color: '#C9A9C7', flexShrink: 0 }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ ...mn, fontSize: '14px', lineHeight: 1.75, color: 'var(--color-ink-soft)', paddingBottom: '20px' }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="py-20 border-t" style={{ borderColor: 'rgba(var(--ink-rgb), 0.1)' }}>
          <div className="max-w-[640px]">
            <div style={{ ...mono, fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-ink-soft)', marginBottom: '16px' }}>
              Ready to start?
            </div>
            <h2 style={{ ...gs, fontWeight: 700, fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--color-ink)', marginBottom: '16px' }}>
              Every project starts with a{' '}
              <em style={{ ...serif, fontStyle: 'italic', color: '#C9A9C7' }}>conversation.</em>
            </h2>
            <p style={{ ...mn, fontSize: '16px', lineHeight: 1.75, color: 'var(--color-ink-soft)', marginBottom: '32px' }}>
              Book a free 30-minute discovery call. No commitment, no pitch — just a conversation about your project and whether we&apos;re a good fit.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm transition-colors duration-200"
                style={{ ...gs, fontWeight: 600, fontSize: '14px', backgroundColor: 'var(--color-ink)', color: 'var(--color-canvas)', letterSpacing: '-0.01em' }}
              >
                Start a project →
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm transition-colors duration-200"
                style={{ ...gs, fontWeight: 500, fontSize: '14px', backgroundColor: 'rgba(var(--ink-rgb), 0.06)', color: 'var(--color-ink)', letterSpacing: '-0.01em' }}
              >
                ← Back to studio
              </Link>
            </div>
          </div>
        </div>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t py-10" style={{ borderColor: 'rgba(var(--ink-rgb), 0.1)', backgroundColor: 'var(--color-canvas)' }}>
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div style={{ ...gs, fontWeight: 600, fontSize: '13px', color: 'var(--color-ink)', letterSpacing: '-0.01em' }}>
              Code Sculpt Solutions
            </div>
            <em style={{ ...serif, fontStyle: 'italic', fontSize: '13px', color: 'var(--color-ink-soft)' }}>
              Built with Code. Crafted with Purpose.
            </em>
          </div>
          <span style={{ ...mono, fontSize: '11px', color: 'rgba(74,71,81,0.45)', letterSpacing: '0.05em' }}>
            © {new Date().getFullYear()} Jake Lourence A. Villar
          </span>
        </div>
      </footer>

    </div>
  )
}
