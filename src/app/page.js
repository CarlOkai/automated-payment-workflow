"use client"; 
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/register'); // Redirect to the landing page
  }, [router]);

  return null; // No content needed as it redirects
};

export default HomePage;
