// import { useState } from 'react'

import './App.css'
import Register from './components/Register';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import { Routes, Route } from 'react-router-dom';

function App() {
  // const [count, setCount] = useState(0)
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App
