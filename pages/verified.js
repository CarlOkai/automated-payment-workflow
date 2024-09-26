import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Verified() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/login'); // Automatically redirect to login page after 3 seconds
    }, 3000); // 3-second delay
  }, []);

  return (
    <div>
      <h1>Email Confirmed!</h1>
      <p>Your email has been successfully verified. Redirecting to the login page...</p>
    </div>
  );
}
