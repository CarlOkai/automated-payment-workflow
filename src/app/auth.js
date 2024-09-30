// pages/auth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';

const AuthHandler = () => {
  const router = useRouter();

  useEffect(() => {
    const { access_token } = router.query;

    if (access_token) {
      // Sign in with the access token received from the URL
      supabase.auth.setSession({ access_token }).then(() => {
        // Redirect to the login page or wherever you want
        router.push('/login');
      }).catch((error) => {
        console.error('Error setting session:', error.message);
      });
    }
  }, [router]);

  return <div>Loading...</div>; // Optionally show a loading state
};

export default AuthHandler;
