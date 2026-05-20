import type { Variants, Transition, Easing } from 'framer-motion'

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
export const EASE_IN_OUT_QUART = [0.76, 0, 0.24, 1] as const
export const EASE_OUT_BACK = [0.34, 1.56, 0.64, 1] as const

export const TRANSITION_BASE: Transition = {
  duration: 0.7,
  ease: EASE_OUT_EXPO,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
}

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
}

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
}

export const blobBreathe = {
  animate: {
    scale: [1, 1.022, 1.018, 1.025, 1],
    rotate: [0, 0.5, -0.3, 0.2, 0],
  },
  transition: {
    duration: 10,
    ease: 'easeInOut' as Easing,
    repeat: Infinity,
    repeatType: 'mirror' as const,
  } satisfies Transition,
}
