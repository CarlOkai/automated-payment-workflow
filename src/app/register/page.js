"use client"; // Mark this component as a Client Component

import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import "./register.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define the Register component
export default function Register() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	// On component mount, sign out any existing session
	useEffect(() => {
		const checkSession = async () => {
			const { data: sessionData } = await supabase.auth.getSession();

			if (sessionData?.session) {
				// Log out the session before rendering the register page
				await supabase.auth.signOut();
				console.log("Logged out existing session");
			}
		};

		checkSession();
	}, []); // Only runs once when the component is mounted

	// Function to handle user registration
	const handleRegister = async (e) => {
		e.preventDefault();

		const response = await supabase.auth.signUp({
			email,
			password,
		});

		console.log("Response from Supabase:", response);

		const { user, session, error } = response;

		if (error) {
			setErrorMessage(error.message);
		} else {
			alert("Registration successful! Check your email for a verification link.");
			setEmail("");
			setPassword("");
		}
	};

	return (
		<div className="register-container">
			<h1>Register</h1>
			<form onSubmit={handleRegister}>
				<input
					className="input-field"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					required
				/>
				<input
					className="input-field"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					required
				/>
				<button className="register-button" type="submit">
					Register
				</button>
				<span className="mt-5">
					Already have an account?{" "}
					<Link href={"/login"} className="text-blue-500 underline">
						Login Here{" "}
					</Link>{" "}
				</span>
			</form>
			{errorMessage && <p className="error-message">{errorMessage}</p>}
		</div>
	);
}
