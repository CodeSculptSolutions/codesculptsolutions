'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { BLOB_PATHS, BLOB_VIEWBOXES, type BlobKey } from '@/lib/blobs'
import { blobBreathe } from '@/lib/motion'

interface BlobProps {
  variant: BlobKey
  fill?: string
  className?: string
  breathe?: boolean
  id?: string
}

export function Blob({ variant, fill = '#C9A9C7', className = '', breathe = false, id }: BlobProps) {
  const shouldReduce = useReducedMotion()
  const path = BLOB_PATHS[variant]
  const viewBox = BLOB_VIEWBOXES[variant]

  return (
    <motion.svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={breathe && !shouldReduce ? blobBreathe.animate : undefined}
      transition={breathe && !shouldReduce ? blobBreathe.transition : undefined}
      style={{ originX: '50%', originY: '50%' }}
    >
      {id && (
        <defs>
          <clipPath id={id}>
            <path d={path} />
          </clipPath>
        </defs>
      )}
      <path d={path} fill={fill} />
    </motion.svg>
  )
}

export function BlobClipPath({ variant, id }: { variant: BlobKey; id: string }) {
  const path = BLOB_PATHS[variant]
  const viewBox = BLOB_VIEWBOXES[variant]
  return (
    <svg viewBox={viewBox} style={{ position: 'absolute', width: 0, height: 0 }}>
      <defs>
        <clipPath id={id} clipPathUnits="objectBoundingBox">
          <path d={path} transform="scale(0.00222, 0.00263)" />
        </clipPath>
      </defs>
    </svg>
  )
}
