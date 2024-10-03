"use client"; // Client-side only since it uses state

import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

const BudgetRequestForm = () => {
	const [department, setDepartment] = useState("");
	const [amount, setAmount] = useState("");
	const [purpose, setPurpose] = useState("");
	const [deadline, setDeadline] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { data: user } = await supabase.auth.getUser();

		const { error } = await supabase.from("budget_requests").insert({
			department,
			amount,
			purpose,
			deadline,
			user_id: user?.id, // Associate request with the current user
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
