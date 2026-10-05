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
  registerDefaultValues,
  registerSchema,
  type RegisterFormData,
} from '@/features/auth/types/authFormData';

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });

  const onSubmit = () => {};

  return (
    <AuthLayout
      title="Create account"
      subtitle="Use your work email so your team can find you."
      footer={
        <Text className="text-ink-3">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-accent-mid">
            Sign in
          </Link>
        </Text>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <FormInputBox label="Full name" error={errors.name?.message}>
          <Input
            register={register('name')}
            autoComplete="name"
            placeholder="Your name"
            autoFocus
          />
        </FormInputBox>
        <FormInputBox label="Work email" error={errors.email?.message}>
          <Input
            register={register('email')}
            type="email"
            autoComplete="email"
            placeholder="you@thealteroffice.com"
          />
        </FormInputBox>
        <FormInputBox label="Password" error={errors.password?.message}>
          <Input
            register={register('password')}
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
          />
        </FormInputBox>
        <FormInputBox label="Confirm password" error={errors.confirmPassword?.message}>
          <Input
            register={register('confirmPassword')}
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter your password"
          />
        </FormInputBox>
        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
          className="disabled:cursor-not-allowed disabled:opacity-60"
        >
          Create Account <span aria-hidden="true">→</span>
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

export default SignUpPage;
