"use client";
import { supabase } from "@/utils/supabaseClient";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useState, useEffect } from "react";

export default function ManagementDashboard() {
	const [requests, setRequests] = useState([]);

	useEffect(() => {
		fetchRequests();
	}, []);

	const fetchRequests = async () => {
		const { data, error } = await supabase
			.from("budget_requests")
			.select("*, profiles(full_name)");
		if (error) alert(error.message);
		else setRequests(data);
	};

	const updateRequestStatus = async (id, status) => {
		const { error } = await supabase
			.from("budget_requests")
			.update({ status })
			.eq("id", id);
		if (error) alert(error.message);
		else fetchRequests();
	};

	return (
		<ProtectedRoute requiredRole={"management_user"}>
			<div className="p-6">
				<h1 className="text-3xl font-bold text-center">Management Dashboard</h1>
				<h2 className="text-black/60 text-center text-lg">Pending Requests</h2>
				<ul>
					{requests
						.filter((req) => req.status === "pending")
						.map((req) => (
							<li key={req.id}>
								{req.amount} - {req.description} by {req.profiles.full_name}
								<button onClick={() => updateRequestStatus(req.id, "approved")}>
									Approve
								</button>
								<button onClick={() => updateRequestStatus(req.id, "rejected")}>
									Reject
								</button>
							</li>
						))}
				</ul>
			</div>
		</ProtectedRoute>
	);
}
