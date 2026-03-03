import { InputHTMLAttributes, forwardRef, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-text-muted">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full rounded-lg border border-card-border bg-background px-4 py-3 text-text',
            'transition-all duration-300',
            'input-glow',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)

Input.displayName = 'Input'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, children, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-text-muted">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={clsx(
            'w-full rounded-lg border border-card-border bg-background px-4 py-3 text-text',
            'transition-all duration-300',
            'input-glow',
            className
          )}
          {...props}
        >
          {children}
        </select>
      </div>
    )
  }
)

Select.displayName = 'Select'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-text-muted">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={clsx(
            'w-full rounded-lg border border-card-border bg-background px-4 py-3 text-text',
            'transition-all duration-300',
            'input-glow min-h-[120px] resize-none',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Input, Select, Textarea }
