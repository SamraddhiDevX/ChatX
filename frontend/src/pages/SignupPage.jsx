import React, { useState } from "react";
import { Eye, EyeOff, Mail, User, Lock , Loader2 } from "lucide-react";
import { authStore } from "../store/authStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData]= useState({
    fullname:"",
    email:"",
    password:"",
  })
   const{signup, isSigningUp}= authStore();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
   
  const validateForm=()=>{
     if(!formData.fullname.trim() || !formData.email.trim() || !formData.password.trim() ) return toast.error("All fields are required");
     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))  return toast.error("Invalid Email Format");
     if(formData.password.length<6) return toast.error("Password must contain at least 6 characters");
     if(formData.fullname.length<4) return toast.error("Name must contain at least 4 characters");
     
     return true;
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    const success= validateForm();
    if(success===true) signup(formData);
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="card w-96 bg-gray-800 shadow-xl p-6 rounded-lg">
        <div className="flex justify-center mb-4">
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
       
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="form-control">
           
            <div className="relative">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullname}
                className="input input-bordered w-full bg-gray-700 text-white border-gray-600 focus:border-yellow-500 pl-10"
                onChange={(e)=> setFormData({...formData, fullname:e.target.value})}
                required
              />
              <User className="absolute top-3 left-3 text-gray-400" />
            </div>
          </div>

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

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
            {isSigningUp ?
            <>
            <Loader2 className="size-5 animate-spin" />
            Loading...
            </>
            :
            " Create Account"
            }
           </button>   </form>
        <p className="text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <Link to='/signin' className="text-yellow-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
