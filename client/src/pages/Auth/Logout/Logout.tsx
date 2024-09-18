import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Logout = () => {
    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = () => {
        setLoggingOut(true);

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        navigate('/login');
    }

  
    return (
    <div className="flex items-center justify-center h-screen">
        {loggingOut ? (
          <h1 className="text-3xl font-bold">Logging out...</h1>
        ) : (
          <button 
            className="bg-[#ffffff] text-[#237e5a] hover:bg-[#237e5a] hover:text-white rounded-lg w-fit p-1 text-sm transition-colors duration-1000" 
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
  
    );
}

export default Logout