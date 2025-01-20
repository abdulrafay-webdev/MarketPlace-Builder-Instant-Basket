import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">InstantBasket</h3>
            <p className="text-sm">
              Your one-stop platform for shopping and logistics management. We ensure convenience and efficiency in every order!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-yellow-300 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/category" className="hover:text-yellow-300 transition">
                  Categories
                </a>
              </li>
              <li>
                <a href="/rider" className="hover:text-yellow-300 transition">
                  Rider Dashboard
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-yellow-300 transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.437 9.878v-6.987H7.898v-2.891h2.539V9.83c0-2.507 1.492-3.891 3.775-3.891 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.874h2.773l-.443 2.891h-2.33V21.878C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-500 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.55 10.55 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.184 4.916 4.916 0 00-8.389 4.482C7.691 6.091 4.066 4.13 1.64 1.149A4.822 4.822 0 003.177 7.72 4.903 4.903 0 01.96 7.1v.061a4.919 4.919 0 003.946 4.827 4.904 4.904 0 01-2.21.084 4.927 4.927 0 004.6 3.417A9.868 9.868 0 010 19.54a13.94 13.94 0 007.548 2.213c9.142 0 14.307-7.721 13.995-14.646A9.935 9.935 0 0024 4.557a9.86 9.86 0 01-2.84.781A4.932 4.932 0 0023 3z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-500 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm7.5 1.5h-7.5A4.25 4.25 0 003 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5A4.25 4.25 0 0020.5 16.25v-8.5A4.25 4.25 0 0016.25 3.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 1.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm5.25-2.75a1 1 0 100 2 1 1 0 000-2z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-sm">Email: support@instantbasket.com</p>
            <p className="text-sm">Phone: +123 456 7890</p>
            <p className="text-sm">Address: 123 Main Street, City, Country</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} InstantBasket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
