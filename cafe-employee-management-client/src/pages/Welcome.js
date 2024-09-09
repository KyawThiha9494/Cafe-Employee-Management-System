// src/pages/Welcome.js
import React from 'react';
import { Link } from '@tanstack/react-router';

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  borderRadius: '5px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  transition: 'background-color 0.3s',
};

function Welcome() {
  return (

    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Cafe Employee Management System</h1>
      <div style={{ marginTop: '20px' }}>
        <Link to="/employee">
          <button style={buttonStyle}>Go to Employee Management</button>
        </Link>
        <Link to="/cafe" style={{ marginLeft: '20px' }}>
          <button style={buttonStyle}>Go to Cafe Management</button>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
