import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ConfirmOtp = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, password } = location.state;

  async function handleOtpSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', { name, email, password, otp });
      if (response.data.message === 'Signup successful') {
        navigate('/login');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="flex justify-center min-h-screen items-center p-4 bg-gradient-to-r from-[#2f5c6c] to-[#5aaf93]">
      <div className='max-w-lg w-full bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold text-center mb-4'>Enter OTP</h2>
        <form onSubmit={handleOtpSubmit} className='flex flex-col'>
          <label htmlFor="otp" className='mb-2'>OTP</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className='border border-gray-300 p-2 rounded mb-4'
            required
          />
          <button
            type='submit'
            className='bg-green-500 text-white p-2 rounded hover:bg-green-700 transition'>
            Confirm OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default ConfirmOtp;
