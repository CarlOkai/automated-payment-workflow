"use client"; //runs as a Client Component

import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient'; 
import './dashboard.css'; 

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      const { data: user } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('budget_requests')
        .select('*')
        .eq('user_id', user?.id); // Fetch requests for the current user
      
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Department Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Purpose</th>
            <th>Deadline</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.amount}</td>
              <td>{request.purpose}</td>
              <td>{request.deadline}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
