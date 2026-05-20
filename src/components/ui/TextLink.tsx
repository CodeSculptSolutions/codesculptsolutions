import Link from 'next/link'
import type { AnchorHTMLAttributes } from 'react'

interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  external?: boolean
  className?: string
}

export function TextLink({ href, children, external, className = '', ...props }: TextLinkProps) {
  const classes = `squiggle-link font-medium text-ink ${className}`

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  )
}
