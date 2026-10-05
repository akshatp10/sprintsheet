import { cn } from '@/lib/cn';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Content displayed inside the button. */
  children: React.ReactNode;

  /** Callback invoked when the button is clicked. */
  onClick?: () => void;

  /**
   * Visual style variant applied to the button:
   *
   * - `primary` — filled accent background with surface-colored text.
   * - `secondary` — transparent background with accent-colored text and accent border.
   * - `tertiary` — transparent background with secondary ink-colored text and control border.
   */
  variant: 'primary' | 'secondary' | 'tertiary';

  /** Prevents interaction and applies the browser's disabled button behavior. */
  disabled?: boolean;

  /** Additional CSS classes applied to the button. */
  className?: string;
}

const variantClasses = {
  //Filled Button
  primary: 'bg-accent text-surface border border-transparent',
  //Outline Button
  secondary: 'bg-transparent text-accent-deep border border-accent shadow-xs shadow-accent',
  //Default Gray Button
  tertiary: 'bg-transparent text-ink-2 border border-lines-control',
};

const Button = ({
  onClick,
  children,
  disabled,
  variant,
  className,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'cursor-pointer text-center py-0.5 px-2 rounded-md font-medium text-type-body-sm',
        variantClasses[variant],
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
