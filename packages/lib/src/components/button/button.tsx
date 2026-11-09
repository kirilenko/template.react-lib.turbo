import type { ButtonHTMLAttributes } from 'react'

import './button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

export function Button({
  children,
  className,
  disabled,
  loading = false,
  size = 'md',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const classes = [
    'lib-button',
    `lib-button--${variant}`,
    `lib-button--${size}`,
    loading && 'lib-button--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} disabled={loading || disabled} aria-busy={loading} {...props}>
      {loading && <span className="lib-button__spinner" aria-hidden="true" />}
      {children}
    </button>
  )
}
