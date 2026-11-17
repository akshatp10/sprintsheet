export const getSafeRedirect = (value: string | null, fallback = '/') => {
  if (!value) return fallback;
  if (!value.startsWith('/')) return fallback;
  if (value.startsWith('//') || value.startsWith('/\\')) return fallback;
  return value;
};

export const getPostAuthRedirect = () =>
  getSafeRedirect(new URLSearchParams(window.location.search).get('redirect'));
