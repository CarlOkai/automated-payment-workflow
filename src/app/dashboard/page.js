"use client"; //runs as a Client Component

import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import "./dashboard.css";
import BudgetRequestForm from "./request";
import ProtectedRoute from "../../components/ProtectedRoute";

const Dashboard = () => {
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRequests = async () => {
			const { data: user } = await supabase.auth.getUser();
			const { data, error } = await supabase
				.from("budget_requests")
				.select("*")
				.eq("user_id", user?.id); // Fetch requests for the current user

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
		return (
			<div className="h-[100dvh] w-full flex items-center justify-center ">
				Loading...
			</div>
		);
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
