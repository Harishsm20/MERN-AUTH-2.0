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
        <div className='min-h-screen flex items-center justify-center bg-gray-200'>
            <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md'>
                <h2 className='text-xl mb-4'>Reset Password</h2>
                <input
                    type='password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder='New Password'
                    required
                    className='mb-4 p-2 border rounded w-full'
                />
                <input
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Confirm Password'
                    required
                    className='mb-4 p-2 border rounded w-full'
                />
                <button type='submit' className='bg-blue-500 text-white p-2 rounded'>Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
