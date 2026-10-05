import Button from '@/components/button/Button';

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M21.35 11.1H12v2.98h5.35c-.23 1.4-1.64 4.1-5.35 4.1a5.98 5.98 0 0 1 0-11.96c1.9 0 3.17.8 3.9 1.5l2.66-2.56C17.5 3.6 15 2.5 12 2.5a9.5 9.5 0 1 0 0 19c5.48 0 9.1-3.85 9.1-9.27 0-.62-.07-1.1-.15-1.13Z"
    />
  </svg>
);

const GoogleButton = () => (
  <Button
    variant="tertiary"
    type="button"
    disabled
    className="flex cursor-not-allowed items-center justify-center gap-2 rounded-md border border-[#DAD7D0] bg-white text-[15px] font-medium text-[#4A4A50] opacity-70"
  >
    <GoogleIcon />
    Continue with Google
  </Button>
);

export default GoogleButton;
