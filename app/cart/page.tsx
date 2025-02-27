"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaTrash, FaBox } from "react-icons/fa";

interface CartItem {
  itemId: string;
  packId: string;
  itemName: string;
  packName: string;
  quantity: number;
  price: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(items);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItem = (index: number) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem('cart', '[]');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const groupedByPack = cartItems.reduce((acc, item) => {
    if (!acc[item.packName]) {
      acc[item.packName] = [];
    }
    acc[item.packName].push(item);
    return acc;
  }, {} as { [key: string]: CartItem[] });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedByPack).map(([packName, items]) => (
              <div key={packName} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">{packName}</h2>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <span className="text-gray-800">{item.itemName}</span>
                          <div className="flex items-center ml-4 text-gray-600">
                            <FaBox className="mr-1" />
                            <span>{item.quantity}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-800 font-medium">₹{item.price}</span>
                        <button
                          onClick={() => removeItem(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-800">Total:</span>
                <span className="text-2xl font-bold text-gray-900">₹{getTotalPrice()}</span>
              </div>
              <button
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => alert('Checkout functionality to be implemented')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}