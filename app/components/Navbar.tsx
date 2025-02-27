"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, User, Package, Search } from "lucide-react";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/fest">
          <span className="text-xl font-bold text-gray-900 cursor-pointer">Festiva</span>
        </Link>

        {/* Right-side Navigation */}
        <div className="flex items-center space-x-6">
          {/* Search Icon and Search Bar */}
          {searchOpen ? (
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2"
              placeholder="Search..."
              autoFocus
              onBlur={() => setSearchOpen(false)}
            />
          ) : (
            <Search className="w-6 h-6 text-gray-700 cursor-pointer" onClick={handleSearchClick} />
          )}
          <Link href="/cart" className="text-gray-700 hover:text-black flex items-center">
            <ShoppingCart className="w-6 h-6" />
          </Link>
          <Link href="/orders" className="text-gray-700 hover:text-black flex items-center">
            <Package className="w-6 h-6" />
            <span className="ml-1 hidden sm:inline">Orders</span>
          </Link>
          <Link href="/account" className="text-gray-700 hover:text-black flex items-center">
            <User className="w-6 h-6" />
            <span className="ml-1 hidden sm:inline">Account</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
