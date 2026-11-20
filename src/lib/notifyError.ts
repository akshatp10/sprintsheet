import { toast } from 'react-toastify';
import { getErrorMessage } from '@/lib/getErrorMessage';

const COOLDOWN_MS = 10_000;
const lastShown = new Map<string, number>();

export const notifyError = (error: unknown) => {
  const message = getErrorMessage(error);
  const now = Date.now();

  // Same message shown recently: ignore. Covers other components and retries.
  if (now - (lastShown.get(message) ?? 0) < COOLDOWN_MS) return;

  lastShown.set(message, now);
  toast.error(message, { toastId: message });
};
