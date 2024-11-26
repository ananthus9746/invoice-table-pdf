// src/Login.js
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const correctPin = '1234';

  const handleLogin = () => {
    if (pin === correctPin) {
      onLogin();
    } else {
      alert('Incorrect PIN');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Login</h2>
      <input
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Enter PIN"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
