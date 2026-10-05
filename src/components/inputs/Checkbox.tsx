import { Check } from 'lucide-react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/lib/cn';

type BaseProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'onChange' | 'className' | 'type'
> & {
  /**
   * Additional CSS classes applied to the checkbox,
   * allowing its size, colors, borders, or other styles
   * to be customized.
   */
  className?: string;
};

type ControlledProps = BaseProps & {
  /**
   * Current checked state when using controlled component mode.
   */
  checked: boolean;

  /**
   * Handles changes to the checked state.
   */
  onChange: (checked: boolean) => void;

  register?: never;
};

type RHFProps = BaseProps & {
  /**
   * React Hook Form registration object that connects
   * the checkbox to a form field.
   */
  register: UseFormRegisterReturn;

  checked?: never;
  onChange?: never;
};

type CheckboxProps = ControlledProps | RHFProps;

export default function Checkbox({
  className,
  register,
  checked,
  onChange,
  disabled,
  ...props
}: CheckboxProps) {
  const checkboxClassName = cn(
    'peer size-4 appearance-none rounded-sm border border-lines-hairline bg-surface cursor-pointer',
    'checked:border-accent checked:bg-accent',
    'focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    className,
  );

  return (
    <span className="relative inline-flex size-4">
      <input
        {...props}
        {...(register ?? {})}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={register ? undefined : (event) => onChange(event.target.checked)}
        className={checkboxClassName}
      />

      <span
        className={cn(
          'pointer-events-none absolute inset-0',
          'hidden items-center justify-center',
          'peer-checked:flex',
        )}
      >
        <Check size={11} strokeWidth={2.5} className="text-white" />
      </span>
    </span>
  );
}
