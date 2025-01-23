'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Next.js 13+ ke liye
import React, { useState } from 'react';

interface Rider {
  riderId: string;
  riderBlock: string;
}

interface RiderLoginProps {
  rider: Rider[];
}

const RiderLogin: React.FC<RiderLoginProps> = ({ rider }) => {
  const [formData, setFormData] = useState({ riderid: '', block: '' });
  const router = useRouter(); // Router initialization

  // Input change handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate rider credentials
    const isValidRider = rider.some(
      (r) => r.riderId === formData.riderid && r.riderBlock === formData.block
    );

    if (isValidRider) {
    //   alert(`Welcome back, Rider ID: ${formData.riderid}, Block: ${formData.block}`);
      router.push(`/rider/${formData.block}`); // Redirect to /cart
    } else {
      alert(`Rider not found. Rider ID: ${formData.riderid}, Block: ${formData.block}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] ">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Rider Login
        </h2>
        <div className="mb-4">
          <label htmlFor="riderid" className="block text-sm font-medium text-gray-600 mb-1">
            Rider ID
          </label>
          <input
            type="text"
            id="riderid"
            name="riderid"
            value={formData.riderid}
            onChange={handleInputChange}
            placeholder="Enter your Rider ID"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="block" className="block text-sm font-medium text-gray-600 mb-1">
            Select Block
          </label>
          <select
            id="block"
            name="block"
            value={formData.block}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>
              Choose your block
            </option>
            <option value="j">Block J</option>
            <option value="s">Block S</option>
            <option value="c">Block C</option>
            <option value="d">Block D</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-600 transition duration-300"
        >
          Login
        </button>
        <p className="text-sm text-center text-gray-600 mt-4">
          Join as a rider?{' '}
          <Link target='_blank' href="https://wa.me/923132354942" className="text-indigo-500 hover:underline">
            Contact Us
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RiderLogin;