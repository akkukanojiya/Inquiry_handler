import React from 'react';
import { Link } from 'react-router-dom';

const Start: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-800 text-white fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/images/ih-logo.png" alt="Logo" className="w-12 rounded-full" />
            <span className="text-xl font-bold">Inquiry Handler</span>
          </Link>
        </div>
      </nav>

      <header className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
        <img src="/images/inquiry.webp" alt="Inquiry" className="w-40 mb-6" />
        <h1 className="text-4xl font-bold text-gray-700">Start Inquiries Now</h1>
        <div className="flex space-x-4 mt-6">
          <Link to="/faculty-login" className="btn-primary">Faculty Login</Link>
          <Link to="/counselor-login" className="btn-primary">Counselor Login</Link>
          <Link to="/login" className="btn-primary">College Login</Link>
        </div>
      </header>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>
          &copy; 2024 <a href="http://techcreaturesolution.com/" className="text-green-400">techcreaturesolution.com</a>
        </p>
        <p className="text-sm">Version 1.0.0</p>
      </footer>
    </div>
  );
};

export default Start;
