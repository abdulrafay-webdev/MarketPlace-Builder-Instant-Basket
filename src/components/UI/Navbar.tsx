'use client'
import React, { useState } from "react";
import { useUser, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs"; // Clerk imports

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser(); // Get the logged-in user

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="sm:text-2xl text-lg font-bold">InstantBasket</h1>
          </div>

          {/* Menu Items for Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/" className="hover:text-yellow-300 transition">
              Home
            </a>
            <a href="/category" className="hover:text-yellow-300 transition">
              Categories
            </a>
            <a href="/cart" className="hover:text-yellow-300 transition">
              Cart
            </a>
            <a href="/rider" className="hover:text-yellow-300 transition">
              Rider Dashboard
            </a>
            {/* Clerk User Display */}
            {user ? (
              <div className="flex items-center space-x-4">
                <p className="text-sm">Hello, {user.fullName || "User"}</p>
                <UserButton/>
                <SignOutButton>
                  <button className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition">
                    Logout
                  </button>
                </SignOutButton>
              </div>
            ) : (
              <SignInButton>
                <button className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition">
                  Login
                </button>
              </SignInButton>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex">

            {/* Clerk User Display */}
            {user ? (
              <div className="flex mx-1">
                <UserButton/>
                <p className="px-3 py-2 text-white">Hello, {user.firstName || "User"}</p>
                <SignOutButton>
                  <button className="block px-3 py-2 w-fit bg-red-600 hover:bg-red-700 text-white rounded-md transition  text-left">
                    Logout
                  </button>
                </SignOutButton>
              </div>
            ) : (
              <SignInButton>
                <button className="block px-3 py-2 mx-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition w-full text-left">
                  Login
                </button>
              </SignInButton>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-500 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              {!isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-cyan-600">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700">
              Home
            </a>
            <a href="/category" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700">
              Categories
            </a>
            <a href="/cart" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700">
              Cart
            </a>
            <a href="/rider" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700">
              Rider Dashboard
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
