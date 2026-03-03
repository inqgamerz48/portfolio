import { ButtonHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'relative overflow-hidden rounded-lg font-medium transition-all duration-300',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-primary text-white hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(193,18,31,0.5)]':
              variant === 'primary',
            'bg-accent text-white hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(232,93,4,0.5)]':
              variant === 'secondary',
            'border-2 border-primary text-primary hover:bg-primary hover:text-white':
              variant === 'outline',
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-6 py-2.5 text-base': size === 'md',
            'px-8 py-3.5 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
