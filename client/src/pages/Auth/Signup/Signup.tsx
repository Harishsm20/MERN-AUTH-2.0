import { useState } from 'react';
import img1 from '../../../assets/Images/LoginImg/login1.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let response = null;
    
    if (password === confirmPassword) {
      try {
        response = await axios.post('http://localhost:3000/api/auth/signup', { name, email, password });
        console.log(response);
      } catch (error) {
        alert(error);
      } finally {
        if (response?.data.message === 'OTP sent to your email') {
          const page ='signup';
          navigate(`/confirm-otp`, { state: { name, email, password, page} });
        } else if (response?.data.message === 'User already exists') {
          alert('User already exists');
          setTimeout(() => {
            navigate('/login');
          }, 2000); 
        }
      }
    } else {
      setConfirmPassword('');
      alert('Confirm Password is incorrect');
    }
  }
  

  return (
    <div className="flex justify-center min-h-screen items-center p-4 bg-gradient-to-r from-[#2f5c6c] to-[#5aaf93]">
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-3/4'>

        {/* Img - hidden on mobile */}
        <div className='hidden md:block'>
          <img className='rounded-2xl w-full h-full object-cover' src={img1} alt='Sign-up img'/>
        </div>

        {/* Signup Form */}
        <div className='flex flex-col justify-center border-double rounded-2xl p-4 bg-[#237e5a] text-white'>

          <div className='text-3xl font-semibold text-center mb-3'>
            Signup
          </div>

          {/* Form */}
          <form 
            onSubmit={handleSubmit}
            className='flex flex-col mb-3 text-lg'
          >
            <label htmlFor="name" className='pl-2'>Name</label>
            <input 
              type="text" 
              required
              name="name" 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='ml-2 border-2 border-[#8fa245] border-opacity-65 rounded-lg mb-2 text-gray-700 placeholder:pl-1'
            />

            <label htmlFor="email" className='pl-2'>Email</label>
            <input 
              type="email" 
              required
              name="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='ml-2 border-2 border-[#8fa245] border-opacity-65 rounded-lg mb-2 text-gray-700 placeholder:pl-1'
            />

            <label htmlFor="password" className='pl-2'>Password</label>
            <input 
              type="password" 
              required
              name="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='ml-2 border-2 border-[#8fa245] border-opacity-65 rounded-lg placeholder:pl-1 mb-2 text-gray-700'
            />

            <label htmlFor="confirm-password" className='pl-2'>Confirm Password</label>
            <input 
              type="password" 
              required
              name="confirm-password" 
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='ml-2 border-2 border-[#8fa245] border-opacity-65 rounded-lg placeholder:pl-1 text-gray-700'
            />

            <div className='text-center mt-5 mb-2'>
              <button
                type='submit'                                
                className='bg-[#ffffff] text-[#237e5a] hover:bg-[#237e5a] hover:text-white rounded-lg w-fit p-1 text-sm transition-colors duration-1000'>
                  Sign Up
              </button>
            </div>
          </form>

          {/* Navigate to login */}
          <div>
            <Link to='/login'>
              <div className='font-semibold underline'>
                Already have an account?
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signup;
