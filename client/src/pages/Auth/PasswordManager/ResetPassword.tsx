import { FormEvent, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/auth/reset-password', {
                token,
                newPassword,
            });

            if (response.data.message === 'Password has been reset successfully') {
                alert('Password reset successful');
                navigate('/login');
            }

        } catch (error) {
            console.error(error);
            alert('Error resetting password');
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-[#5aaf93] to-[#2f5c6c]'>
            <div className="flex flex-col justify-center bg-[#237e5a] max-h-screen max-w-full min-h-56 min-w-56 rounded-2xl text-white font-serif p-5">
                <p className="text-center font-bold text-2xl">Forgot Password</p>
                <form onSubmit={handleSubmit} className="p-2">
                    <div className="mb-4">
                        <label htmlFor="new" className="pr-2">
                            New Password:
                        </label>
                        <input
                            type="password"
                            name="new"
                            id="new"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className='border-2 border-[#45a258] border-opacity-65 rounded-lg text-gray-700 p-1'
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirm" className="pr-2">
                            New Password:
                        </label>
                        <input
                            type="password"
                            name="confirm"
                            id="confirm"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
};

export default ResetPassword;
