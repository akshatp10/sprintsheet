import { getToday } from '@/hooks/useCycleStatus';

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

type CycleDate = string | Date | undefined;

/**
 * Extracts initials from a string and combines them with the remaining characters,
 * returning an uppercase string limited to the specified length.
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
 * Converts a date-only string or ISO timestamp to a valid Date.
 * Supports YYYY-MM-DD, ISO timestamps, and Date instances.
 */
const parseCycleDate = (date?: CycleDate): Date | null => {
  if (!date) return null;

  const parsed =
    date instanceof Date
      ? new Date(date.getTime())
      : /^\d{4}-\d{2}-\d{2}$/.test(date)
        ? new Date(`${date}T00:00:00.000Z`)
        : new Date(date);

  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

/**
 * Formats a date as an uppercase month abbreviation and day (e.g., "OCT 27").
 * Supports YYYY-MM-DD and ISO timestamps.
 */
export const formatDate = (date: string): string => {
  const parsed = parseCycleDate(date);

  if (!parsed) return '';

  return parsed
    .toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    })
    .toUpperCase();
};

/**
 * Formats a cycle date as a short month and day (e.g., "Oct 27").
 * Supports YYYY-MM-DD and ISO timestamps.
 */
export const formatCycleDate = (date: string): string => {
  const parsed = parseCycleDate(date);

  if (!parsed) return '';

  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
};

/**
 * Calculates the duration of a cycle in days.
 * Supports YYYY-MM-DD and ISO timestamps.
 *
 * Uses calendar dates in UTC and returns the inclusive cycle length.
 */
export const getCycleLength = (startDate?: string, endDate?: string): number => {
  const start = parseCycleDate(startDate);
  const end = parseCycleDate(endDate);

  if (!start || !end || end < start) return 0;

  const startDay = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());

  const endDay = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());

  return Math.floor((endDay - startDay) / MILLISECONDS_PER_DAY) + 1;
};

/**
 * Calculates the current day of a cycle.
 * Day 1 is the start date, and the result is capped at the cycle length.
 */
export const getCurrentCycleDay = (
  startDate?: string,
  endDate?: string,
  today: string | Date = getToday(),
): number => {
  const start = parseCycleDate(startDate);
  const end = parseCycleDate(endDate);
  const current = parseCycleDate(today);

  if (!start || !end || !current) return 0;

  const cycleLength = getCycleLength(startDate, endDate);

  if (cycleLength <= 0) return 0;

  const toUtcDay = (date: Date) =>
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

  const elapsedDays = Math.floor((toUtcDay(current) - toUtcDay(start)) / MILLISECONDS_PER_DAY);

  return Math.min(cycleLength, Math.max(1, elapsedDays + 1));
};
