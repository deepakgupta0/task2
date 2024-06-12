import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-gray-800 text-white">
      <div className="text-md md:text-2xl font-bold">Invoice Tool</div>
      <nav className="flex gap-6">
        <Link to="/" className="hover:text-blue-400">
          List
        </Link>
        <Link to="/import" className="hover:text-blue-400">
          Import
        </Link>
        <Link to="/create" className="hover:text-blue-400">
          Create
        </Link>
      </nav>
    </header>
  );
};

export default Header;
