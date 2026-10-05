import Text from '@/components/common/Text';
import type { ReactNode } from 'react';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

const AuthLayout = ({ title, subtitle, children, footer }: AuthLayoutProps) => (
  <div className="flex min-h-screen items-center justify-center bg-surface-desk px-4 py-6">
    <div className="flex w-full max-w-130 flex-col rounded-2xl bg-surface-sunken p-7 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] gap-4">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <Text
          as="span"
          variant="body-sm"
          className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#5B4BB5] font-semibold text-white"
        >
          S
        </Text>

        <Text as="span" variant="h1" className="text-[#26262B]">
          Sprintsheet
        </Text>
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-1">
        <Text variant="display" className="font-medium text-ink">
          {title}
        </Text>

        <Text variant="body" className="text-ink-2">
          {subtitle}
        </Text>
      </div>

      {/* Form / Content */}
      <div className="flex flex-col">{children}</div>

      {/* Footer */}
      <div className="text-sm">{footer}</div>
    </div>
  </div>
);

export default AuthLayout;
