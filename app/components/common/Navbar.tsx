'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import useCartStore from "../../store/cartStore";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const { cart } = useCartStore();

  useEffect(() => {
    const totalItems = cart.reduce((count, item) => count + item.quantity, 0);
    setCartCount(totalItems);
  }, [cart]);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-700 text-white">
      <Link href="/" className="text-lg font-bold">
        Brands For Less
      </Link>
      <Link href="/my-cart" className="flex items-center gap-2 relative">
        <span>Cart</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8M7 13h10m0 0l1.6 8M9 21h6"
          />
        </svg>
        {cartCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;