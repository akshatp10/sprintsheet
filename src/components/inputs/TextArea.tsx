import type { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/lib/cn';

type BaseProps = {
  /** Additional CSS classes applied to the textarea, allowing its dimensions, spacing, borders, colors, or other visual styles to be customized. */
  className?: string;
} & Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'onChange' | 'className' | 'name'
>;

type ControlledProps = BaseProps & {
  /** Current text displayed in the textarea when using controlled component mode. */
  value: string;

  /** Handles textarea changes and receives the updated text value whenever the user edits the content. */
  onChange: (value: string) => void;

  /** Prevents React Hook Form registration from being used together with controlled textarea mode. */
  register?: never;
};

type RHFProps = BaseProps & {
  /** React Hook Form registration object that connects the textarea to a form field and manages its value, events, validation, and ref. */
  register: UseFormRegisterReturn;

  /** Prevents a manually controlled value from being provided when the textarea is registered with React Hook Form. */
  value?: never;

  /** Prevents a manually controlled change handler from being provided when the textarea is registered with React Hook Form. */
  onChange?: never;
};

type TextAreaProps = ControlledProps | RHFProps;

export default function TextArea({
  className,
  register,
  value,
  onChange,
  ...props
}: TextAreaProps) {
  const sharedClassName = cn(
    'bg-surface rounded-md border border-lines-hairline px-2 py-1.5 text-ink placeholder:text-ink-fades-placeholders h-full text-type-body-sm focus:outline-0',
    className,
  );

  if (register) {
    return <textarea {...props} {...register} className={sharedClassName} />;
  }

  return (
    <textarea
      {...props}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={sharedClassName}
    />
  );
}
