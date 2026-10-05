import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormInputBox from '@/components/inputs/FormInputBox';
import Input from '@/components/inputs/Input';
import AuthLayout from '@/features/auth/components/AuthLayout';
import GoogleButton from '@/features/auth/components/GoogleButton';

import { Link } from 'react-router-dom';
import Button from '@/components/button/Button';
import Text from '@/components/common/Text';
import {
  loginDefaultValues,
  loginSchema,
  type LoginFormData,
} from '@/features/auth/types/authFormData';

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  const onSubmit = () => {};

  return (
    <AuthLayout
      title="Sign in"
      subtitle="Use your work email. Invites land in the same place."
      footer={
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Text className="text-ink-3">
            Already have an account?{' '}
            <Link to="/auth/register" className="text-accent-mid">
              Register
            </Link>
          </Text>
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <FormInputBox label="Work email" error={errors.email?.message}>
          <Input
            register={register('email')}
            type="email"
            autoComplete="email"
            placeholder="you@thealteroffice.com"
            autoFocus
          />
        </FormInputBox>
        <FormInputBox label="Password" error={errors.password?.message}>
          <Input
            register={register('password')}
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
          />
        </FormInputBox>
        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
          className="disabled:cursor-not-allowed disabled:opacity-60"
        >
          Sign in <span aria-hidden="true">→</span>
        </Button>
      </form>

      <div className="my-2 flex items-center gap-3 text-sm text-[#A5A3AA]">
        <span className="h-px flex-1 bg-[#DAD7D0]" />
        or
        <span className="h-px flex-1 bg-[#DAD7D0]" />
      </div>

      <GoogleButton />
    </AuthLayout>
  );
};

export default SignInPage;
