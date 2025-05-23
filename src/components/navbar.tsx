"use client";


import React, { useState } from "react";
import { useAuth } from "@app/context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const toggleUserMenu = () => setUserMenuOpen(!isUserMenuOpen);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleRedirect = (path: string) => {
    setRedirecting(true);
    router.push(path);
  };

  return (
    <nav className="bg-white fixed w-full z-10 top-0 shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="text-black text-base xl:text-xl font-bold no-underline hover:no-underline flex items-center">
            <img src="/img/hero.jpg" alt="" className="w-10 h-10 mr-2" />
          </a>
        </div>

        <div className="hidden md:flex space-x-6">
          <a href="/" className="text-black hover:text-gray-600 relative transition duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:scale-x-0 after:transition-transform after:duration-300 after:hover:scale-x-100 after:bg-blue-400">
            Home
          </a>
          {isLoggedIn && (
            <>
              <a href="/users" className="text-black hover:text-gray-600 relative transition duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:scale-x-0 after:transition-transform after:duration-300 after:hover:scale-x-100 after:bg-green-400">
                Users
              </a>
              <a href="/rooms" className="text-black hover:text-gray-600 relative transition duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:scale-x-0 after:transition-transform after:duration-300 after:hover:scale-x-100 after:bg-red-400">
                Room Management
              </a>
              <a href="/bookings" className="text-black hover:text-gray-600 relative transition duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:scale-x-0 after:transition-transform after:duration-300 after:hover:scale-x-100 after:bg-yellow-400">
                Bookings
              </a>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search"
                  className="w-48 bg-white text-sm text-gray-400 transition border border-gray-700 focus:outline-none focus:border-gray-600 rounded py-1 px-2 pl-10 appearance-none leading-normal"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="fill-current text-gray-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                  </svg>
                </div>
              </div>

              <div className="relative text-sm text-black">
                <button onClick={toggleUserMenu} className="flex items-center focus:outline-none">
                  <img className="w-8 h-8 rounded-full mr-2" src="http://i.pravatar.cc/300" alt="Avatar of User" />
                  <span className="hidden md:inline-block">Hi, User</span>
                </button>
                {isUserMenuOpen && (
                  <div className="bg-gray-900 rounded shadow-md mt-2 absolute right-0 min-w-full overflow-auto z-30">
                    <ul className="list-reset">
                      <li>
                        <a href="#" className="px-4 py-2 block text-gray-100 hover:bg-gray-800">
                          My account
                        </a>
                      </li>
                      <li>
                        <a href="#" className="px-4 py-2 block text-gray-100 hover:bg-gray-800">
                          Notifications
                        </a>
                      </li>
                      <li>
                        <hr className="border-t mx-2 border-gray-400" />
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 block text-gray-100 hover:bg-gray-800"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : !redirecting && (
            <>
              <button
                onClick={() => handleRedirect("/login")}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-600 transition"
              >
                Login
              </button>
              <button
                onClick={() => handleRedirect("/register")}
                className="bg-green-500 text-white px-4 py-2 rounded-xl shadow hover:bg-green-600 transition"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
