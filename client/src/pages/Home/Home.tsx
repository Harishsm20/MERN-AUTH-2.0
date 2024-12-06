import  { useState, useEffect } from "react";
import Logout from "../Auth/Logout/Logout";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post('http://localhost:3000/api/auth/verify-token', { token })
        .then(response => {
          if (response.data.valid) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
            navigate('/login');
          }
        })
        .catch(err => {
          console.log(err);
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // useEffect(() => {
  //   const token = localStorage.getItem('authToken');
  //   if (token) {
  //     setIsLoggedIn(true);
  //   } else {
  //     navigate('/login');
  //   }
  // }, [navigate]);

  if (!isLoggedIn) {
    return null;
  }
  return (
    <>
      <div className='flex flex-col min-h-screen bg-gradient-to-r from-[#5aaf93] to-[#2f5c6c]'>
        <div className='flex-1 p-6'>
          <h1 className='text-4xl font-bold text-white mb-4'>Welcome to the MERN Stack Authentication Platform</h1>

          {/* Updated Description */}
          <p className='text-lg text-white mb-6'>
            This website is built on the powerful <span className="bg-teal-200 text-gray-800 font-bold px-2 py-1 rounded">MERN Stack</span>, providing secure and seamless authentication
            for modern web applications using <span className="bg-teal-200 text-gray-800 font-bold px-2 py-1 rounded">JSON Web Tokens (JWT)</span>.
            With JWT, your data is digitally signed and securely transmitted, ensuring trust and confidentiality.
          </p>

          <p className='text-lg text-white mb-6'>
            Our platform supports common authentication features like <span className="bg-teal-200 text-gray-800 font-bold px-2 py-1 rounded">Login</span>, <span className="bg-teal-200 text-gray-800 font-bold px-2 py-1 rounded">Signup</span>, 
            and secure user authentication with <span className="bg-teal-200 text-gray-800 font-bold px-2 py-1 rounded">JWT tokens</span>. You’ll also be able to reset your password with our 
            <span className="bg-teal-200 text-gray-800 font-bold px-2 py-1 rounded">Forget Password</span> and <span className="bg-teal-200 text-gray-800 font-bold px-2 py-1 rounded">Reset Password</span> functionality, enabling a smooth 
            user experience.
          </p>

          <p className='text-lg text-white mb-6'>
            We’re continuously working to enhance the security and user experience of this platform. Some advanced features,
            such as <span className="bg-teal-200 text-gray-800 font-bold px-2 py-1 rounded">multi-factor authentication</span>, are still <span className="bg-teal-200 text-gray-800 font-bold px-2 py-1 rounded">under development</span>
            and will be available soon! Stay tuned for updates as we continue to improve and expand the platform's capabilities.
          </p>
        </div>

        {/* Logout button at the bottom */}
        <div className="p-6">
          <Logout />
        </div>
      </div>
    </>
  );
}

export default Home;
