import { useGoogleOAuthSignIn } from '@/lib/services/auth/hooks';
import { GoogleLogin } from '@react-oauth/google';

const GoogleButton = () => {
  const { mutate: handleGoogleSignin } = useGoogleOAuthSignIn();
  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        const idToken = credentialResponse.credential;

        if (!idToken) {
          console.error('Google did not return an ID token');
          return;
        }

        handleGoogleSignin(idToken);
      }}
      text="continue_with"
      shape="pill"
      theme="outline"
      size="large"
      width="full"
    />
  );
};

export default GoogleButton;
