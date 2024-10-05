"use client"; // Client-side only since it uses state

import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";

const BudgetRequestForm = () => {
	const [department, setDepartment] = useState("");
	const [amount, setAmount] = useState("");
	const [purpose, setPurpose] = useState("");
	const [deadline, setDeadline] = useState("");
	const [message, setMessage] = useState("");
	const [userId, setUserId] = useState(null); // State to hold the authenticated user ID

	useEffect(() => {
		// Function to fetch user session
		const fetchUserSession = async () => {
			const { data: { user } } = await supabase.auth.getUser(); // Fetch user
			if (user) {
				setUserId(user.id); // Set user ID
				console.log("Authenticated User ID:", user.id); // Log the authenticated user ID
			} else {
				setMessage("User not authenticated.");
			}
		};

		// Fetch user session on component mount
		fetchUserSession();

		// Subscribe to auth state changes
		const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
			if (session) {
				setUserId(session.user.id); // Update user ID on state change
				console.log("Authenticated User ID:", session.user.id); // Log the authenticated user ID
			} else {
				setUserId(null); // Reset user ID if no session
				setMessage("User not authenticated.");
			}
		});

		// Cleanup subscription on unmount
		return () => {
			subscription?.unsubscribe();
		};
	}, []); // Empty dependency array to run only once when the component mounts

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!userId) {
			setMessage("User not authenticated.");
			return; // Exit if the user is not authenticated
		}
	
		const { error } = await supabase.from("budget_requests").insert({
			department,
			amount,
			purpose,
			deadline,
			user_id: userId, // Associate request with the current user
			status: "Pending",
		});
	
		if (error) {
			setMessage("Error submitting request: " + error.message);
		} else {
			setMessage("Budget request submitted successfully!");
			setDepartment("");
			setAmount("");
			setPurpose("");
			setDeadline("");
		}
	};
	

	return (
		<div className="mt-7">
			<form onSubmit={handleSubmit}>
				<label>
					Department:
					<input
						type="text"
						className="input-field"
						value={department}
						onChange={(e) => setDepartment(e.target.value)}
						required
					/>
				</label>
				<label>
					Amount:
					<input
						type="number"
						className="input-field"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						required
					/>
				</label>
				<label>
					Purpose:
					<textarea
						value={purpose}
						className="input-field"
						onChange={(e) => setPurpose(e.target.value)}
						required
					/>
				</label>
				<label>
					Deadline:
					<input
						type="date"
						className="input-field"
						value={deadline}
						onChange={(e) => setDeadline(e.target.value)}
						required
					/>
				</label>
				<button className="button" type="submit">
					Submit
				</button>
			</form>
			{message && <p className="mt-2 text-center">{message}</p>}
		</div>
	);
};

export default BudgetRequestForm;
