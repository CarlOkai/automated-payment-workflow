'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const ConfirmPage = () => {
    const router = useRouter();
    //useRouter: like a map on the website, helps move people from one page to another
    const searchParams = useSearchParams(); // Get search parameters
    //useSearchParams: looks at the web address(URL) and helps grab the access token from it
    const access_token = searchParams.get('access_token'); // Get the access token from URL parameters
    //accrss token is the secrete code in the link, tells us if user is legit
    useEffect(() => {
        //runs when page first loads and checks if theres an access token
        const confirmUser = async () => {

            if (access_token) {

                const { error } = await supabase.auth.api.confirmUser(access_token);
                if (error) {
                    //If there's an error during the confirmation process, it will be handled here.
                    console.error('Error confirming user:', error.message);
                    //Logs the error message to the console if the confirmation fails
                    return;
                    //Exits the function early if there is an error
                }
                //If no error occurs, user confirmation is successful
                router.push('/success'); // Redirect to a success page after successful confirmation
            }
        };

        confirmUser();
    }, [access_token, router]); // Run the effect when access_token or router changes

    return (
        <div>
            <h2>Confirming your signup...</h2>
            
        </div>
    );
};

export default ConfirmPage;
