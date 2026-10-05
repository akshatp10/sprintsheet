import { cn } from '@/lib/cn';

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Text displayed inside the chip. */
  text: React.ReactNode;

  /**
   * Visual style variant applied to the chip:
   *
   * - `primary` — filled background using `bg-lines-control` and colors as accent.
   * - `secondary` — transparent background with a border of accent color.
   * - `default` — transparent background with a border; same styling as `secondary` but line color ie grayish.
   *
   * Defaults to `default`.
   */
  variant?: 'primary' | 'secondary' | 'default';

  /** Additional background color or utility classes applied to the chip. */
  bgColor?: string;

  /** Additional border color or utility classes applied to the chip. */
  borderColor?: string;

  /** Additional text color or utility classes applied to the chip. */
  textColor?: string;

  /** Additional typography or text-style utility classes applied to the chip. */
  textType?: string;

  /** Additional CSS classes applied to the chip. */
  className?: string;
}

const Chip = ({
  text,
  variant = 'default',
  bgColor = '',
  borderColor = '',
  textColor = '',
  textType = '',
  className,
  ...props
}: ChipProps) => {
  const commonClass = 'w-fit h-fit text-center px-2 py-0.5 text-type-body rounded-sm text-ink-2';

  const variantClasses = {
    primary: cn(commonClass, ' bg-lines-control'),
    secondary: cn(commonClass, ' bg-transparent border border-lines-border'),
    default: cn(commonClass, 'bg-transparent border border-lines-border'),
  };

  return (
    <div
      className={cn(variantClasses[variant], bgColor, borderColor, textColor, textType, className)}
      {...props}
    >
      {text}
    </div>
  );
};

export default Chip;
