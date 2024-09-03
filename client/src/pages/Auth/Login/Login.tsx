import './login.css'
import login1 from '../../../assets/Images/LoginImg/login1.png'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    async function handleSubmit (event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        let response = null;
        try{
            response = await axios.post('http://localhost:3000/api/auth/login', {email, password})
        }
        catch(error){
            console.log(error)
        }
        console.log(response)
        console.log(`Email : ${email}, Password: ${password}`)
    }
    
  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-[#5aaf93] to-[#2f5c6c]'>
    <div className="grid grid-cols-1 md:grid-cols-2 size-7/12 gap-4 font-serif max-w-4xl w-3/4 ">
        <div className='flex flex-col justify-center   border-double rounded-2xl p-4 m-2 bg-[#237e5a] text-white'>
            <h1 className="text-3xl font-semibold text-center  mb-3">Login</h1>
            <form 
            onSubmit={handleSubmit}
            className='flex flex-col mb-3 text-lg'>
                <label htmlFor="email"
                className='pl-2'>Email</label>
                <input 
                type="email" 
                name="email" 
                id="email"
                value = {email}
                onChange={(e) => setEmail(e.target.value) }
                required
                className='ml-2 border-2 border-[#8fa245] border-opacity-65 rounded-lg mb-1 text-gray-700'
                />

                <label htmlFor="password"
                className='pl-2'>Password</label>
                <input 
                type="password" 
                name="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='ml-2 border-2 border-[#8fa245] border-opacity-65 rounded-lg text-gray-700'
                />

                <div className='grid grid-rows-1 justify-items-center mt-3'>
                <button
                type='submit'                                
                className='bg-[#ffffff] text-[#237e5a] hover:bg-[#237e5a] hover:text-white rounded-lg w-fit p-1 text-sm transition-colors duration-1000'>
                    Login
                </button>


            </div>
            </form>

            <Link to='/forgotPassword'>
            <div className='mb-3 pl-2 text-sm'>
                Forgot Password?
            </div>
            </Link>
            
            <div className='flex justify-between'>
            
                <div className='pl-2 text-base'>Don't Have an Account ?</div>

                <Link to='/signup'>
                <div 
                className='font-semibold underline'
                > Sign Up ? </div>
                </Link>


            </div>
        </div>
        <div className=' m-2 hidden md:block'>
            <img src={login1} 
            className='rounded-2xl'
            alt="" />
        </div>

    </div>
    </div>
  )
}

export default Login
