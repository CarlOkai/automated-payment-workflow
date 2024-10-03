"use client"; //runs as a Client Component

import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient'; 
import './dashboard.css'; 

const Dashboard = () => {
  const [requests, setRequests] = useState([]);//state to store budget requests
  const [loading, setLoading] = useState(true);//state to show loading indicator while data is being fetched

  useEffect(() => {
    
    const fetchRequests = async () => {
      const { data: user } = await supabase.auth.getUser(); //Get the currently logged in user
      const { data, error } = await supabase
        .from('budget_requests')//Fetch data from the budhet_requests table
        .select('*') //select all columns
        .eq('user_id', user?.id); // Fetch only requests for the current user
      
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
