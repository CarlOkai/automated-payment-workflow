// src/app/confirm/page.js
'use client'; // Mark this component as a client component

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Use next/navigation

const ConfirmPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Get search parameters
  const access_token = searchParams.get('access_token'); // Get the access token from URL parameters

  useEffect(() => {
    const confirmUser = async () => {
      // Your logic to confirm the user using the access_token
      // e.g., call the Supabase API to confirm the user
      if (access_token) {
        const { error } = await supabase.auth.api.confirmUser(access_token);
        if (error) {
          console.error('Error confirming user:', error.message);
          return;
        }
        // Redirect or show a success message
        router.push('/success'); // Redirect to a success page or wherever appropriate
      }
    };

    confirmUser();
  }, [access_token, router]); // Run the effect when access_token or router changes

  return (
    <div>
      <h2>Confirming your signup...</h2>
      {/* You might want to add a loading state here */}
    </div>
  );
};

export default ConfirmPage;
