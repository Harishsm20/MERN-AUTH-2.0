import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './pages/Auth/Login/Login'
import Signup from './pages/Auth/Signup/Signup';
import ForgotPassword from './pages/Auth/PasswordManager/ForgotPassword';
import ResetPassword from './pages/Auth/PasswordManager/ResetPassword';
import Logout from './pages/Auth/Logout/Logout';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = { <Login/> } ></Route>
        <Route path='/login' element = { <Login/> } ></Route>
        <Route path='/signup' element = { <Signup /> } ></Route>
        <Route path='/forgotPassword' element = {<ForgotPassword/>}></Route>
        <Route path='/reset-password/:token' element = {<ResetPassword/>}></Route>
        <Route path='/logout' element = {<Logout/>}></Route>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
