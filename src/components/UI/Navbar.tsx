'use client'
import React, { useState } from "react";
import { useUser, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs"; // Clerk imports
import Link from "next/link";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import logo from '../../../public/images/instant logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser(); // Get the logged-in user

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image className=" h-auto w-32 sm:w-36 " src={logo} alt="Instant Basket" width={200} height={200} />
            </Link>
          </div>

          {/* Search Bar for Desktop */}
          <form action={'/search'} className="hidden md:flex items-center flex-grow mx-4">
            <input
              type="text"
              name="query"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <button className="ml-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md">
            <SearchIcon/>
            </button>
          </form>

          {/* Menu Items for Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/product" className="hover:text-yellow-300 transition">
              All Products
            </Link>
            <Link href="/cart" className="hover:text-yellow-300 transition">
              Cart
            </Link>
            <Link href="/rider" className="hover:text-yellow-300 transition">
              Rider Dashboard
            </Link>
            {/* Clerk User Display */}
            {user ? (
              <div className="hidden lg:flex items-center space-x-4">
                <p className="text-sm">Hello, {user.fullName || "User"}</p>
                <UserButton />
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

          {/* Clerk User Display */}
          {user ? (
              <div className="flex lg:hidden items-center space-x-4">
                <p className="text-sm">Hello, {user.firstName || "User"}</p>
                <UserButton />
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

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-500 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
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
        <form action={'/search'} className="pb-2 md:hidden flex items-center justify-center px-2">
              <input
                type="text"
                name="query"
                placeholder="Search products..."
                className="w-4/6 px-4 py-2 h-fit rounded-md border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
              <button className="w-1/6 -ml-[2%] h-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md">
              <SearchIcon/>
              </button>
            </form>
      </div>
      

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-cyan-600">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700">
              Home
            </Link>
            <Link href="/product" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700">
              All Products
            </Link>
            <Link href="/cart" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700">
              Cart
            </Link>
            <Link href="/rider" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700">
              Rider Dashboard
            </Link>
            {/* Mobile Search Bar */}
            
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
