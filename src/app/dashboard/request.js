"use client"; // Client-side only since it uses state

import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import './request.css'; // Custom CSS

const BudgetRequestForm = () => {
  const [department, setDepartment] = useState('');
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [deadline, setDeadline] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: user } = await supabase.auth.getUser();

    const { error } = await supabase.from('budget_requests').insert({
      department,
      amount,
      purpose,
      deadline,
      user_id: user?.id, // Associate request with the current user
      status: 'Pending',
    });

    if (error) {
      setMessage('Error submitting request: ' + error.message);
    } else {
      setMessage('Budget request submitted successfully!');
      setDepartment('');
      setAmount('');
      setPurpose('');
      setDeadline('');
    }
  };

  return (
    <div>
      <h2>Submit a Budget Request</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Department:
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <label>
          Purpose:
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
        </label>
        <label>
          Deadline:
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BudgetRequestForm;
