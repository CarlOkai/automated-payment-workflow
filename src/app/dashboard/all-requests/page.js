"use client"; // Runs as a Client Component

import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient"; // Ensure this path is correct

const AllRequests = () => {
    console.log("AllRequests component loaded"); // Debugging line
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        fetchRequests(); // Call fetchRequests on component mount
    }, []);

    const handleApprove = async (id) => {
        const { error } = await supabase
            .from("budget_requests")
            .update({
                status: "approved",
                updated_at: new Date().toISOString() // Update timestamp
            })
            .eq("id", id);

        if (error) {
            console.error("Error approving request:", error);
            alert(`Error: ${error.message}`);
        } else {
            alert("Request approved successfully.");
            fetchRequests(); // Refresh the requests list
        }
    };

    const handleDeny = async (id) => {
        const { error } = await supabase
            .from("budget_requests")
            .update({
                status: "denied",
                updated_at: new Date().toISOString() // Update timestamp
            })
            .eq("id", id);

        if (error) {
            console.error("Error denying request:", error);
            alert(`Error: ${error.message}`);
        } else {
            alert("Request denied successfully.");
            fetchRequests(); // Refresh the requests list
        }
    };

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
                        <th className="border px-4 py-2">Actions</th> {/* Added actions column */}
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => (
                        <tr key={request.id}>
                            {columnKeys.map((key) => (
                                <td key={key} className="border px-4 py-2">{request[key]}</td>
                            ))}
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleApprove(request.id)}
                                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleDeny(request.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Deny
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllRequests;
