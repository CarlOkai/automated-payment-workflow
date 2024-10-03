'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabaseClient'; 

const ConfirmPage = () => {
    const router = useRouter();

    useEffect(() => {
        const confirmUser = async () => {
            // Extract the URL parameters
            const params = new URLSearchParams(window.location.search);
            const access_token = params.get('access_token'); // Get the access token from the URL

            if (access_token) {
                // Confirm the user's email
                const { error } = await supabase.auth.api.confirmUser(access_token);
                if (error) {
                    console.error('Error confirming user:', error.message);
                    return;
                }
                // Redirect to the login page after confirmation
                router.push('/login'); // Ensure this path is correct
            }
        };

        confirmUser();
    }, [router]);

    return <h2>Confirming your signup...</h2>;
};

export default ConfirmPage;
