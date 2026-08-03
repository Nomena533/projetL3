import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/eleve/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='' Component={Home}/>
          <Route path='/login' Component={Login}/>
          <Route path='/register' Component={Register}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
