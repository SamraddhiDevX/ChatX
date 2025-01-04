import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock , Loader2 } from "lucide-react";
import { authStore } from '../store/authStore';
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData]= useState({
      email:"",
      password:"",
    });
   const {login, isLoggingIn} = authStore();

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
     
    const validateForm=()=>{
       if(!formData.email.trim() || !formData.password.trim() ) return toast.error("All fields are required");
       if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))  return toast.error("Invalid Email Format");
       if(formData.password.length<6) return toast.error("Password must contain at least 6 characters");
        
       return true;
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        const success= validateForm();
        if(success===true) login(formData);
        
      };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
    <div className="card w-96 bg-gray-800 shadow-xl p-6 rounded-lg">
      <div className="flex justify-center mb-4">
      </div>
      <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
     
      <form onSubmit={handleSubmit} className="space-y-6">
       

        {/* Email */}
        <div className="form-control">
        
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e)=> setFormData({...formData, email:e.target.value})}
              className="input input-bordered w-full bg-gray-700 text-white border-gray-600 focus:border-yellow-500 pl-10"
              required
            />
            <Mail className="absolute top-3 left-3 text-gray-400" />
          </div>
        </div>

        {/* Password */}
        <div className="form-control">
        
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e)=> setFormData({...formData, password:e.target.value})}
              className="input input-bordered w-full bg-gray-700 text-white border-gray-600 focus:border-yellow-500 pr-12 pl-10"
              required
            />
            <Lock className="absolute top-3 left-3 text-gray-400" />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-gray-400"
            >
              {passwordVisible ? <Eye /> : <EyeOff />}
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
            {isLoggingIn ?
            <>
            <Loader2 className="size-5 animate-spin" />
            Loading...
            </>
            :
            " Sign In"
            }
           </button> 
        </form>
        <p className="text-gray-400 mt-4 text-center">
          New User, Signup here{" "}
          <Link to='/signup' className="text-yellow-500 hover:underline">
           Create Account
          </Link>
        </p>
    </div>
  </div>
  )
}

export default LoginPage
