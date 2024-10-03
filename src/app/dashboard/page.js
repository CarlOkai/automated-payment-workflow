"use client"; //runs as a Client Component

import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import "./dashboard.css";
import BudgetRequestForm from "./request";
import ProtectedRoute from "../../components/ProtectedRoute";

const Dashboard = () => {
	const [requests, setRequests] = useState([]); //state to store budget requests
	const [loading, setLoading] = useState(true); //state to show loading indicator while data is being fetched

	useEffect(() => {
		const fetchRequests = async () => {
			const { data: user } = await supabase.auth.getUser(); //Get the currently logged in user
			const { data, error } = await supabase
				.from("budget_requests") //Fetch data from the budhet_requests table
				.select("*") //select all columns
				.eq("user_id", user?.id); // Fetch only requests for the current user

			if (error) {
				console.error(error);
			} else {
				setRequests(data);
			}
			setLoading(false);
		};
		fetchRequests();
	}, []);

	if (loading) {
		return <div>Loading...</div>; // show this wile the data is loading
	}

	return (
		<ProtectedRoute requiredRole={"department_user"}>
			<div className="p-6">
				<h1 className="text-3xl font-bold text-center">Department Dashboard</h1>
				<h2 className="text-black/60 text-center text-lg">
					Submit a Budget Request
				</h2>
				<BudgetRequestForm />
			</div>
		</ProtectedRoute>
	);
};

export default Dashboard;
