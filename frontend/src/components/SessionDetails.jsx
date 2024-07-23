import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const SessionDetails = () => {
  const [sessions, setSessions] = useState([]);

  const fetchSessions = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No token found. Please login or register first.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/sessions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSessions(response.data.sessions);
      toast.success('Sessions fetched successfully!'); // Success toast message
    } catch (error) {
      console.error('Error fetching sessions:', error);
      toast.error('Error fetching session details.');
    }
  };

  return (
    <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md mt-2 mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Session Details</h2>
      <button
        onClick={fetchSessions}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
      >
        Fetch Session Details
      </button>
      <ul>
        {sessions.length > 0 ? (
          sessions.map((session, index) => (
            <li key={index} className="mb-2">{session}</li>
          ))
        ) : (
          <p>No sessions available</p>
        )}
      </ul>
    </div>
  );
};

export default SessionDetails;
