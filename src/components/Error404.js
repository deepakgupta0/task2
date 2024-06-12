import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
        <p className="text-2xl font-semibold text-gray-600 mb-8">
          Oops! Page not found.
        </p>
        <img
          src="https://via.placeholder.com/400x300?text=Lost+in+Space"
          alt="404 illustration"
          className="w-80 h-60 mx-auto mb-8"
        />
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Error404;
