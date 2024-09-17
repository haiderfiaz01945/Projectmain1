import React, { useState } from 'react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#F9F5F6] py-4 px-6 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Brand Name */}
    <Link 
      onClick={() => setIsSidebarOpen(false)} 
      to={'/'} 
      className="text-2xl font-bold text-[#F2BED1]"
      style={{ fontFamily: "'Dancing Script', cursive" }} // Apply the Dancing Script font here
    >
      EnchantByReem
    </Link>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-[#F2BED1] focus:outline-none"
          >
            <Bars3Icon className="w-8 h-8" />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden sm:flex sm:items-center sm:space-x-6">
          <Link onClick={() => setIsSidebarOpen(false)} to={"/"} className="text-[#F2BED1] hover:text-[#F8E8EE] font-medium transition-colors duration-300">
            Dashboard
          </Link>

          <Link onClick={() => setIsSidebarOpen(false)} to={"/Productpage"} className="text-[#F2BED1] hover:text-[#F8E8EE] font-medium transition-colors duration-300">
            Product-info
          </Link>
          <Link onClick={() => setIsSidebarOpen(false)} to={"/order"} className="text-[#F2BED1] hover:text-[#F8E8EE] font-medium transition-colors duration-300">
            Order-recived
          </Link>
          <Link onClick={() => setIsSidebarOpen(false)} to={"/"} className="text-[#F2BED1] hover:text-[#F8E8EE] font-medium transition-colors duration-300">
            ---
          </Link>
        </div>

        {/* Call to Action Button */}
        <div className="hidden sm:flex items-center space-x-3">         
          <button className="inline-flex font-semibold items-center px-6 py-2 bg-[#F2BED1] text-white font-medium rounded-full shadow-sm hover:bg-[#FDCEDF] transition-colors duration-200">
            POST
          </button>
        </div>
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out sm:hidden z-50`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <div className="text-2xl font-bold text-[#F2BED1]">Admin</div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-[#F2BED1] focus:outline-none"
          >
            <XMarkIcon className="w-8 h-8" />
          </button>
        </div>
        <div className="flex flex-col px-6 py-4 space-y-4">
          <Link onClick={() => setIsSidebarOpen(false)} to={"/"} className="text-[#F2BED1] hover:text-[#F8E8EE] font-medium transition-colors duration-300">
            Dashboard
          </Link>
          
          <Link onClick={() => setIsSidebarOpen(false)} to={"/Productpage"} className="text-[#F2BED1] hover:text-[#F8E8EE] font-medium transition-colors duration-300">
            Product-info
          </Link>
          <Link onClick={() => setIsSidebarOpen(false)} to={"/order"} className="text-[#F2BED1] hover:text-[#F8E8EE] font-medium transition-colors duration-300">
            Order-recived
          </Link>
          <Link onClick={() => setIsSidebarOpen(false)} to={"/checked"} className="text-[#F2BED1] hover:text-[#F8E8EE] font-medium transition-colors duration-300">
            Order-Completed
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
