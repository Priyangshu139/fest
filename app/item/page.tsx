'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Star, ShoppingCart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Item {
  $id: string;
  name: string;
  description: string[];
  tags: string[];
  image: string[];
  rating: number;
  distributor: string[];
  inventory: number[];
  price: number[];
}

interface SelectedItems {
  [key: string]: boolean;
}

export default function ItemPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/item');
        const data = await response.json();
        
        if (Array.isArray(data)) {
          if (searchQuery) {
            // Filter items based on search query
            const filteredItems = data.filter((item: Item) => {
              const nameMatch = item.name.toLowerCase().includes(searchQuery);
              const descriptionMatch = item.description.some(desc => 
                desc.toLowerCase().includes(searchQuery)
              );
              const tagsMatch = item.tags.some(tag => 
                tag.toLowerCase().includes(searchQuery)
              );
              
              return nameMatch || descriptionMatch || tagsMatch;
            });
            setItems(filteredItems);
          } else {
            setItems(data);
          }
        }
      } catch (error) {
        console.error('Error fetching items:', error);
        setError('Failed to load items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [searchQuery]);

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleAddToCart = () => {
    const selectedItemsList = items.filter(item => selectedItems[item.$id]);
    const cartItems = selectedItemsList.map(item => ({
      type: 'item',
      itemId: item.$id,
      packId: '',
      itemName: item.name,
      packName: '',
      quantity: 1,
      price: item.price[0] || 0
    }));

    try {
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = [...existingCart, ...cartItems];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      // Reset selections
      setSelectedItems({});
      alert('Items added to cart successfully!');
    } catch (error) {
      console.error('Error adding items to cart:', error);
      alert('Failed to add items to cart. Please try again.');
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="text-center p-6 text-red-500">
          {error}
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {searchQuery && (
          <h2 className="text-2xl font-bold mb-6">
            Search Results for: {searchQuery}
          </h2>
        )}

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No items found {searchQuery ? 'matching your search' : ''}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.$id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
              >
                <div className="absolute top-2 right-2 z-10">
                  <input
                    type="checkbox"
                    checked={selectedItems[item.$id] || false}
                    onChange={() => handleItemSelect(item.$id)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>

                {item.image && item.image[0] ? (
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}

                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  
                  <div className="flex items-center mb-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-600">{item.rating}</span>
                  </div>

                  <div className="mb-2">
                    {item.description.map((desc, index) => (
                      <p key={index} className="text-gray-600 text-sm">
                        {desc}
                      </p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4">
                    {item.price && item.price[0] ? (
                      <span className="text-lg font-bold text-green-600">
                        ₹{item.price[0]}
                      </span>
                    ) : (
                      <span className="text-gray-500">Price not available</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {Object.values(selectedItems).some(Boolean) && (
          <div className="fixed bottom-8 right-8 z-50">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 transition-all transform hover:scale-105"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>
                Add to Cart ({Object.values(selectedItems).filter(Boolean).length})
              </span>
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}