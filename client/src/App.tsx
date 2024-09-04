import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './pages/Auth/Login/Login'
import Signup from './pages/Auth/Signup/Signup';
import ForgotPassword from './pages/Auth/PasswordManager/ForgotPassword';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = { <Login/> } ></Route>
        <Route path='/login' element = { <Login/> } ></Route>
        <Route path='/signup' element = { <Signup /> } ></Route>
        <Route path='/forgotPassword' element = {<ForgotPassword/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
