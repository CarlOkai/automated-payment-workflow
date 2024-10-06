"use client"; // Runs as a Client Component

import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient"; // Ensure this path is correct

const AllRequests = () => {
    console.log("AllRequests component loaded"); // Debugging line
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const { data, error } = await supabase
                    .from("budget_requests")
                    .select("*"); // Fetch all columns from budget_requests table

                if (error) {
                    console.error("Error fetching requests:", error);
                    alert(`Error: ${error.message}`); // Display error in an alert
                } else {
                    console.log("Fetched requests:", data); // Log full data for debugging
                    setRequests(data);
                }
            } catch (err) {
                console.error("Unexpected error:", err); // Catch any unexpected errors
                alert(`Unexpected error: ${err.message}`); // Display unexpected errors
            }
            setLoading(false);
        };

        fetchRequests();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (requests.length === 0) {
        return <div>No budget requests found.</div>;
    }

    // Get all column keys from the first request item (assuming all rows have the same structure)
    const columnKeys = Object.keys(requests[0]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-center">All Budget Requests</h1>
            <table className="table-auto w-full mt-4">
                <thead>
                    <tr>
                        {columnKeys.map((key) => (
                            <th key={key} className="border px-4 py-2">{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => (
                        <tr key={request.id}>
                            {columnKeys.map((key) => (
                                <td key={key} className="border px-4 py-2">{request[key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllRequests;
