import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();

    interface ForgotPasswordResponse {
        message: string;
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post<ForgotPasswordResponse>('http://localhost:3000/api/auth/forgot-password', { email });
            alert(response.data.message);
            if(response.data.message === 'OTP sent to your email'){
                const page = 'forgot-password'
                navigate('/confirm-otp', { state: { email, page } });
            }
        } catch (error) {
            console.error(error);
            alert('Error sending password reset email');
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-[#5aaf93] to-[#2f5c6c]'>
            <div className="flex flex-col justify-center bg-[#237e5a] max-h-screen max-w-full min-h-56 min-w-56 rounded-2xl text-white font-serif p-5">
                <p className="text-center font-bold text-2xl">Forgot Password</p>
                <form onSubmit={handleSubmit} className="p-2">
                    <div className="mb-4">
                        <label htmlFor="email" className="pr-2">
                            Enter Your Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='border-2 border-[#45a258] border-opacity-65 rounded-lg text-gray-700 p-1'
                            required
                        />
                    </div>
                    <button type='submit' className='bg-[#ffffff] text-[#237e5a] hover:bg-[#237e5a] hover:text-white rounded-lg w-fit p-1 text-sm transition-colors duration-1000 ml-28'>
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
