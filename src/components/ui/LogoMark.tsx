'use client'

import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'

interface LogoMarkProps {
  size?: number
  animated?: boolean
  variant?: 'full' | 'compact'
  className?: string
}

export function LogoMark({
  size = 56,
  animated = true,
  variant = 'full',
  className,
}: LogoMarkProps) {
  const height = Math.round(size * (72 / 56))
  const spring = [0.34, 1.56, 0.64, 1] as const

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 56 72"
      fill="none"
      aria-label="Code Sculpt Solutions"
      className={className}
    >
      {/* S bezier curve */}
      <motion.path
        d="M 38,14 C 52,10 52,30 28,34 C 4,38 4,58 18,62"
        stroke="#C9A9C7"
        strokeWidth="2"
        strokeLinecap="round"
        {...(animated
          ? {
              initial: { pathLength: 0 },
              animate: { pathLength: 1 },
              transition: { delay: 0.1, duration: 1.0, ease: EASE_OUT_EXPO },
            }
          : {})}
      />

      {/* Start anchor square */}
      <motion.rect
        x="34" y="10" width="8" height="8" rx="1.5"
        fill="#F4EFE6"
        stroke="#C9A9C7"
        strokeWidth="1.5"
        style={{ transformOrigin: '38px 14px' }}
        {...(animated
          ? {
              initial: { scale: 0 },
              animate: { scale: 1 },
              transition: { delay: 0, duration: 0.3, ease: spring },
            }
          : {})}
      />

      {/* End anchor square */}
      <motion.rect
        x="14" y="58" width="8" height="8" rx="1.5"
        fill="#F4EFE6"
        stroke="#C9A9C7"
        strokeWidth="1.5"
        style={{ transformOrigin: '18px 62px' }}
        {...(animated
          ? {
              initial: { scale: 0 },
              animate: { scale: 1 },
              transition: { delay: 1.05, duration: 0.3, ease: spring },
            }
          : {})}
      />

      {variant === 'full' && (
        <>
          {/* Inner handle lines */}
          <motion.line
            x1="28" y1="34" x2="52" y2="30"
            stroke="rgba(201,169,199,0.2)"
            strokeWidth="0.7"
            {...(animated
              ? {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 0.6, duration: 0.4 },
                }
              : {})}
          />
          <motion.line
            x1="28" y1="34" x2="4" y2="38"
            stroke="rgba(201,169,199,0.2)"
            strokeWidth="0.7"
            {...(animated
              ? {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 0.6, duration: 0.4 },
                }
              : {})}
          />

          {/* Inner handle dots */}
          <motion.circle
            cx="52" cy="30" r="1.8"
            fill="rgba(201,169,199,0.5)"
            style={{ transformOrigin: '52px 30px' }}
            {...(animated
              ? {
                  initial: { scale: 0 },
                  animate: { scale: 1 },
                  transition: { delay: 0.65, duration: 0.25 },
                }
              : {})}
          />
          <motion.circle
            cx="4" cy="38" r="1.8"
            fill="rgba(201,169,199,0.5)"
            style={{ transformOrigin: '4px 38px' }}
            {...(animated
              ? {
                  initial: { scale: 0 },
                  animate: { scale: 1 },
                  transition: { delay: 0.65, duration: 0.25 },
                }
              : {})}
          />

          {/* Outer handle lines */}
          <motion.line
            x1="38" y1="14" x2="52" y2="10"
            stroke="rgba(201,169,199,0.45)"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            {...(animated
              ? {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 1.1, duration: 0.35 },
                }
              : {})}
          />
          <motion.line
            x1="18" y1="62" x2="4" y2="62"
            stroke="rgba(201,169,199,0.45)"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            {...(animated
              ? {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 1.1, duration: 0.35 },
                }
              : {})}
          />

          {/* Outer handle dots */}
          <motion.circle
            cx="52" cy="10" r="2.5"
            fill="#C9A9C7"
            style={{ transformOrigin: '52px 10px' }}
            {...(animated
              ? {
                  initial: { scale: 0 },
                  animate: { scale: 1 },
                  transition: { delay: 1.15, duration: 0.25 },
                }
              : {})}
          />
          <motion.circle
            cx="4" cy="62" r="2.5"
            fill="#C9A9C7"
            style={{ transformOrigin: '4px 62px' }}
            {...(animated
              ? {
                  initial: { scale: 0 },
                  animate: { scale: 1 },
                  transition: { delay: 1.15, duration: 0.25 },
                }
              : {})}
          />
        </>
      )}
    </svg>
  )
}
