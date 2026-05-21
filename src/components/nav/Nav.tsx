'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { LogoMark } from '@/components/ui/LogoMark'
import { useTheme } from '@/components/ui/ThemeProvider'

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Studio', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Notes', href: '#notes' },
  { label: 'Contact', href: '#contact' },
] as const

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => item.href.slice(1))
    const observers: IntersectionObserver[] = []

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { threshold: 0.35, rootMargin: '-80px 0px 0px 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleNavClick = useCallback((href: string) => {
    const id = href.slice(1)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-ink/10 bg-canvas/90 backdrop-blur-sm py-4'
          : 'py-6'
      }`}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      <nav className="max-w-[1440px] mx-auto px-8 md:px-16 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex items-center gap-2.5 focus-visible:outline-none group"
          aria-label="Code Sculpt Solutions — home"
        >
          <motion.div
            className="flex items-center"
            style={{ gap: '2px' }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92, rotate: -5 }}
            transition={{ type: 'spring', stiffness: 320, damping: 10 }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#4A4751', fontSize: '14px', lineHeight: 1, userSelect: 'none' }}>{'<'}</span>
            <LogoMark size={18} animated={false} variant="compact" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#4A4751', fontSize: '14px', lineHeight: 1, userSelect: 'none' }}>{'>'}</span>
          </motion.div>
          <span
            className="text-ink font-semibold text-[14px]"
            style={{ fontFamily: "'General Sans', system-ui, sans-serif", letterSpacing: '-0.02em' }}
          >
            Code Sculpt Solutions
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_ITEMS.map((item) => {
            const id = item.href.slice(1)
            const isActive = active === id
            return (
              <li key={item.href}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={`squiggle-link text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none ${
                    isActive ? 'text-ink nav-active' : 'text-ink-soft hover:text-ink'
                  }`}
                  style={{ fontFamily: "'General Sans', system-ui, sans-serif", letterSpacing: '0.01em' }}
                >
                  {item.label}
                </button>
              </li>
            )
          })}
          <li>
            <Link
              href="/pricing"
              className="text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none text-ink-soft hover:text-ink"
              style={{ fontFamily: "'General Sans', system-ui, sans-serif", letterSpacing: '0.01em' }}
            >
              Pricing
            </Link>
          </li>
          <li>
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="text-ink-soft hover:text-ink transition-colors duration-200 focus-visible:outline-none"
              style={{ display: 'flex', alignItems: 'center', padding: '2px' }}
            >
              {theme === 'dark' ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          </li>
        </ul>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-ink p-1 focus-visible:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className="block w-5 h-[1.5px] bg-current mb-1.5 transition-transform" style={{ transform: menuOpen ? 'rotate(45deg) translateY(5px)' : 'none' }} />
          <span className="block w-5 h-[1.5px] bg-current transition-opacity" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="block w-5 h-[1.5px] bg-current mt-1.5 transition-transform" style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-5px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-canvas border-b border-ink/10 px-8 py-6"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="flex flex-col gap-5" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-ink text-lg font-medium"
                    style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
