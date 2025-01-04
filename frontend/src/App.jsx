import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes,Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { authStore} from './store/authStore'
import {Loader} from 'lucide-react';
import { Toaster } from 'react-hot-toast'

const App = () => {
  const {authUser, checkAuth,isCheckingAuth,onlineUsers } = authStore();

  console.log("onlineuser: " + onlineUsers);


  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
console.log(authUser);

  if(isCheckingAuth && !authUser) return (
     <div className='flex items-center justify-center h-screen'>
     <Loader className="size-10 animate-spin" />
     </div>
  )

  return (
    <div>
      <Navbar></Navbar>
      <Routes>
    <Route path="/" element={authUser? <HomePage/>: <Navigate to="/signin"/>}/>
    <Route path="/signup" element={!authUser? <SignupPage/>:<Navigate to="/"/>}/>
    <Route path="/signin" element={!authUser? <LoginPage/>:<Navigate to="/"/>}/>
  
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
