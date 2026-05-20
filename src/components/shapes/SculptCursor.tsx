'use client'

import { useRef, useState, useEffect, useCallback, type RefObject } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

interface SculptCursorProps {
  children: React.ReactNode
  blobRef: RefObject<SVGSVGElement | null>
}

export function SculptCursor({ children, blobRef }: SculptCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const shouldReduce = useReducedMotion()

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  const blobDeformX = useMotionValue(0)
  const blobDeformY = useMotionValue(0)
  const blobScale = useSpring(1, { damping: 20, stiffness: 200 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    cursorX.set(e.clientX - rect.left)
    cursorY.set(e.clientY - rect.top)

    if (blobRef.current) {
      const blobRect = blobRef.current.getBoundingClientRect()
      const cx = blobRect.left + blobRect.width / 2
      const cy = blobRect.top + blobRect.height / 2
      const dx = (e.clientX - cx) / blobRect.width
      const dy = (e.clientY - cy) / blobRect.height
      blobDeformX.set(dx * 6)
      blobDeformY.set(dy * 6)
    }
  }, [cursorX, cursorY, blobDeformX, blobDeformY, blobRef])

  const handleMouseDown = useCallback(() => {
    setIsPressed(true)
    blobScale.set(0.94)
    if (blobRef.current) {
      blobRef.current.style.transition = 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)'
      blobRef.current.style.transform = `scale(0.94) skew(${blobDeformX.get() * 0.5}deg, ${blobDeformY.get() * 0.3}deg)`
    }
  }, [blobScale, blobRef, blobDeformX, blobDeformY])

  const handleMouseUp = useCallback(() => {
    setIsPressed(false)
    blobScale.set(1)
    if (blobRef.current) {
      blobRef.current.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
      blobRef.current.style.transform = 'scale(1) skew(0deg, 0deg)'
    }
  }, [blobScale, blobRef])

  useEffect(() => {
    const el = containerRef.current
    if (!el || shouldReduce) return

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mousedown', handleMouseDown)
    el.addEventListener('mouseup', handleMouseUp)
    el.addEventListener('mouseleave', handleMouseUp)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mousedown', handleMouseDown)
      el.removeEventListener('mouseup', handleMouseUp)
      el.removeEventListener('mouseleave', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseDown, handleMouseUp, shouldReduce])

  if (shouldReduce) {
    return <div>{children}</div>
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => { setIsHovering(false); blobDeformX.set(0); blobDeformY.set(0) }}
      style={{ cursor: 'none' }}
    >
      {children}

      {/* Custom sculpting cursor */}
      <motion.div
        className="pointer-events-none absolute z-20 select-none"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
        aria-hidden="true"
      >
        {/* Pinch fingers / sculpting tool SVG */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          style={{ transform: isPressed ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.15s ease' }}
        >
          {/* Thumb */}
          <path
            d="M18,28 C16,26 14,22 14,18 C14,16 15,14 18,14"
            stroke="#1B1A1F"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Index finger */}
          <path
            d="M18,8 C20,10 22,14 22,18 C22,20 21,22 18,22"
            stroke="#1B1A1F"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Pinch point dot */}
          <circle
            cx="18"
            cy="18"
            r={isPressed ? '3' : '1.5'}
            fill="#C9A9C7"
            style={{ transition: 'r 0.15s ease' }}
          />
        </svg>
      </motion.div>
    </div>
  )
}
