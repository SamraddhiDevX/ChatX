import React from 'react';
import { LogOut } from 'lucide-react'; // Importing icons from Lucide
import { authStore } from '../store/authStore';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const { logout, authUser } = authStore();

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">ChatX</Link>
      </div>
      <div className="flex-none gap-2">
        {/* Logout Button with Tooltip */}
        <button className="btn btn-ghost btn-circle relative group" onClick={logout}>
          <LogOut className="w-6 h-6" /> 
          {/* Tooltip below the icon */}
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 hidden group-hover:flex items-center bg-white text-gray-700 text-sm rounded-lg py-1 px-3 z-10 shadow-md border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Logout
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;

