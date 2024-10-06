// src/app/dashboard/page.js

"use client"; // Runs as a Client Component

import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import "./dashboard.css";
import BudgetRequestForm from "./request";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useRouter } from "next/navigation";

const Dashboard = () => {
	const router = useRouter(); 
	const [requests, setRequests] = useState([]); // State to store budget requests
	const [loading, setLoading] = useState(true); // State to show loading indicator while data is being fetched
	const [showRequests, setShowRequests] = useState(false); // State to manage the display of budget requests
	const [error, setError] = useState(null); // State to manage errors

	useEffect(() => {
		const fetchRequests = async () => {
			const { data: user } = await supabase.auth.getUser(); // Get the currently logged in user
			if (user) {
				const { data, error } = await supabase
					.from("budget_requests") // Fetch data from the budget_requests table
					.select("*") // Select all columns
					.eq("user_id", user?.id); // Fetch only requests for the current user

				if (error) {
					console.error(error);
					setError(error.message);
				} else {
					setRequests(data);
				}
			}
			setLoading(false);
		};
		fetchRequests();
	}, []);

	const handleSignOut = async () => {
		const { error } = await supabase.auth.signOut(); // Sign the user out
		if (error) {
			console.error("Error signing out:", error.message);
		} else {
			window.location.href = "/login"; // Redirect to the login page
		}
	};

	const handleShowRequests = async () => {
		try {
			const { data: userData, error: userError } = await supabase.auth.getUser();
			if (userError) {
				console.error("Error fetching user:", userError);
				return;
			}
	
			const user = userData?.user;
	
			if (!user || !user.id) {
				console.error("User ID is missing or undefined.");
				return;
			}
	
			console.log("User ID:", user.id);
	
			const { data: roleData, error: roleError } = await supabase
				.from("users")
				.select("role")
				.eq("id", user.id)
				.single();
	
			if (roleError) {
				console.error("Error fetching user role:", roleError);
				return;
			}
	
			if (!roleData) {
				console.error("No user found with the provided ID.");
				return;
			}
	
			const userRole = roleData.role; // Directly access role
	
			console.log("User role from users table:", userRole);
	
			if (userRole === "management_user") {
				// Redirect to all requests page
				router.push("/dashboard/all-requests");
				console.log("AllRequests component loaded");

			} else {
				alert("You do not have permission to view all budget requests.");
			}
		} catch (error) {
			console.error("An unexpected error occurred:", error);
		}
	};
	
	



	if (loading) {
		return <div>Loading...</div>; // Show this while the data is loading
	}

	return (
		<ProtectedRoute requiredRole={"department_user"}>
			<div className="p-6">
				<h1 className="text-3xl font-bold text-center">Department Dashboard</h1>
				<h2 className="text-black/60 text-center text-lg">
					Submit a Budget Request
				</h2>
				<BudgetRequestForm />

				{/* Button for management users to view all budget requests */}
				<button onClick={handleShowRequests} className="button">
					View All Budget Requests
				</button>

				{/* Display all budget requests if the user is a management user */}
				{showRequests && (
					<div>
						<h2 className="text-lg font-bold mt-4">All Budget Requests</h2>
						<ul>
							{requests.map((request) => (
								<li key={request.id}>{request.details}</li>
							))}
						</ul>
					</div>
				)}

				{/* Sign Out Button */}
				<button onClick={handleSignOut} className="button mt-4">
					Sign Out
				</button>
			</div>
		</ProtectedRoute>
	);
};

export default Dashboard;
