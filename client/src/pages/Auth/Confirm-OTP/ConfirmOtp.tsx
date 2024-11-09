import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import axios from 'axios';

interface LocationState {
  email: string;
  token: string;
  page : string;
}

const ConfirmOtp: React.FC = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const location = useLocation();
  const { email, token, page } = location.state as LocationState;

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/auth/confirm-otp', { email, otp });
      if (response.data.message === 'OTP verified' && page === 'forgot-password') {
        // Navigate to reset password page with email and token
        navigate('/reset-password', { state: { email, token } });
      }
      else if(response.data.message === 'OTP verified' && page === 'signup'){
        navigate('/login');
      }
       else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleOtpSubmit}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Confirm OTP</button>
      </form>
    </div>
  );
};

export default ConfirmOtp;
