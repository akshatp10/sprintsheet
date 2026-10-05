import { cn } from '@/lib/cn';
import Text from '../common/Text';

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current progress value represented as a percentage, controlling the filled portion of the progress bar from 0 to 100. */
  progress: number;

  /** Tailwind/CSS utility classes applied to the filled portion of the progress bar, allowing its background color or other visual styling to be customized. Defaults to `bg-accent`. */
  color?: string;

  /** Additional CSS classes applied to the progress track, allowing its dimensions, spacing, background, or other visual styles to be customized. */
  className?: string;

  /** Optional progress count displayed beside the bar as `current/total`, providing a numeric representation of the current progress. */
  label?: {
    /** Current completed or achieved count displayed before the `/`. */
    cur: number;

    /** Total count representing the maximum or target value displayed after the `/`. */
    total: number;
  };
}

const ProgressBar = ({
  progress,
  color = 'bg-accent',
  className,
  label,
  ...props
}: ProgressBarProps) => {
  return (
    <div className="flex w-full items-center gap-2" {...props}>
      {/* Progress bar */}
      <div className={cn('h-2 w-full overflow-hidden rounded-full bg-surface-track', className)}>
        <div
          className={cn('h-full rounded-full transition-all duration-300 ease-out', color)}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Label */}
      {label && (
        <Text variant="caption" className="shrink-0 text-ink-3">
          {label.cur}/{label.total}
        </Text>
      )}
    </div>
  );
};

export default ProgressBar;
