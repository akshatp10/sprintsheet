import { getToday } from '@/hooks/useCycleStatus';

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Extracts initials from a string and combines them with the remaining characters,
 * returning an uppercase string limited to the specified length.
 *
 * @param value - The input string from which to extract characters.
 * @param padded - The maximum length of the returned string. Defaults to 3.
 * @returns The uppercase string truncated to the specified length.
 */
export const getExtractedLetterFromString = (value: string, padded?: number): string => {
  const words = value.trim().split(/\s+/).filter(Boolean);
  const maxLength = padded ?? 3;

  const initials = words.map((word) => word[0]).join('');
  const remainders = words.map((word) => word.slice(1)).join('');

  return (initials + remainders).slice(0, maxLength).toUpperCase();
};

/**
 * Calculates the percentage of a current value relative to a total.
 *
 * @param cur - The current value.
 * @param total - The total value.
 * @returns The rounded percentage, or 0 if the total is less than or equal to 0.
 */
export const getPercentage = (cur: number, total: number): number => {
  if (total <= 0) return 0;

  return Math.round((cur / total) * 100);
};

/**
 * Indicates whether the current environment is running on macOS.
 */
export const isMac =
  typeof navigator !== 'undefined' &&
  (navigator.platform.toLowerCase().includes('mac') ||
    navigator.userAgent.toLowerCase().includes('mac'));

/**
 * Formats a date string in YYYY-MM-DD format as an uppercase month abbreviation
 * followed by the day (e.g., "OCT 15").
 *
 * @param date - The date string in YYYY-MM-DD format.
 * @returns The formatted date string.
 */
export const formatDate = (date: string): string => {
  const [year, month, day] = date.split('-').map(Number);

  return new Date(year, month - 1, day)
    .toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
    .toUpperCase();
};

/**
 * Formats a date string in YYYY-MM-DD format as a short month and day
 * (e.g., "Oct 15").
 *
 * @param date - The date string in YYYY-MM-DD format.
 * @returns The formatted cycle date.
 */
export const formatCycleDate = (date: string): string => {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Calculates the duration of a cycle in days using its start and end dates.
 *
 * @param startDate - The cycle start date.
 * @param endDate - The cycle end date.
 * @returns The cycle duration in days, or 0 if either date is missing.
 */
export const getCycleLength = (startDate?: string, endDate?: string): number => {
  if (!startDate || !endDate) return 0;

  return (new Date(endDate).getTime() - new Date(startDate).getTime()) / MILLISECONDS_PER_DAY;
};

/**
 * Calculates the current day of a cycle, starting at day 1 on the start date
 * and capping the result at the cycle length.
 *
 * @param startDate - The cycle start date.
 * @param endDate - The cycle end date.
 * @param today - The date to calculate against. Defaults to getToday().
 * @returns The current cycle day, or 0 if dates are missing or the cycle length is invalid.
 */
export const getCurrentCycleDay = (
  startDate?: string,
  endDate?: string,
  today: string | Date = getToday(),
): number => {
  if (!startDate || !endDate) return 0;

  const cycleLength = getCycleLength(startDate, endDate);

  if (cycleLength <= 0) return 0;

  const elapsedDays = Math.floor(
    (new Date(today).getTime() - new Date(startDate).getTime()) / MILLISECONDS_PER_DAY,
  );

  return Math.min(cycleLength, Math.max(1, elapsedDays + 1));
};
