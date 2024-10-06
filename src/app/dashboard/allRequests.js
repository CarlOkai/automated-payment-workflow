"use client"; // Runs as a Client Component

import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

const AllRequests = () => {
	console.log("AllRequests component loaded"); // Debugging line
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRequests = async () => {
			const { data, error } = await supabase
				.from("budget_requests")
				.select("*");

			if (error) {
				console.error("Error fetching requests:", error);
			} else {
				setRequests(data);
			}
			setLoading(false);
		};
		fetchRequests();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1 className="text-3xl font-bold text-center">All Budget Requests</h1>
			<ul>
				{requests.map((request) => (
					<li key={request.id}>{request.details}</li>
				))}
			</ul>
		</div>
	);
};

export default AllRequests;
