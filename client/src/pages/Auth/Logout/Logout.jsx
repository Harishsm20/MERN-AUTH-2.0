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
            className="px-4 py-2 bg-blue-500 text-white rounded" 
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
  
    );
}

export default Logout