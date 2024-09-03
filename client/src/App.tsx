import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './pages/Auth/Login/Login'
import Signup from './pages/Auth/Signup/Signup';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = { <Login/> } ></Route>
        <Route path='/login' element = { <Login/> } ></Route>
        <Route path='/signup' element = { <Signup /> } ></Route>
      </Routes>
    </BrowserRouter>
      {/* <Login /> */}
    </>
  )
}

export default App
