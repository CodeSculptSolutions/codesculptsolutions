'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
          className="flex items-center gap-1 focus-visible:outline-none"
          aria-label="CodeSculptSolutions — home"
        >
          <span
            className="text-ink font-semibold tracking-tight text-[15px]"
            style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
          >
            Code
          </span>
          {/* Clay blob glyph replacing "S" in Sculpt — click to wobble */}
          <motion.svg
            width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true"
            className="relative top-[-1px] cursor-pointer"
            whileHover={{ rotate: -12, scale: 1.3 }}
            whileTap={{ rotate: [0, -20, 18, -10, 0], scale: [1, 1.4, 1.2, 1.3, 1] }}
            transition={{ type: 'spring', stiffness: 260, damping: 12 }}
          >
            <path
              d="M7,2 C10,1 13,3 13,6 C13,9 10,10 7,10 C4,10 1,11 1,14 C1,16.5 3.5,17 7,17 C10.5,17 13,16 13,14"
              stroke="#C9A9C7"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
          </motion.svg>
          <span
            className="text-ink font-semibold tracking-tight text-[15px]"
            style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
          >
            culptSolutions
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
                  className={`text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none ${
                    isActive ? 'text-ink nav-active' : 'text-ink-soft hover:text-ink'
                  }`}
                  style={{ fontFamily: "'General Sans', system-ui, sans-serif", letterSpacing: '0.01em' }}
                >
                  {item.label}
                </button>
              </li>
            )
          })}
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
