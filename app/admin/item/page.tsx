'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Plus, Pencil } from 'lucide-react';
import AdminNavbar from '@/app/components/AdminNavbar';
import AdminFooter from '@/app/components/AdminFooter';

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
  $createdAt: string;
  $updatedAt: string;
}

export default function AdminItemPage() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/item');
        const data = await response.json();
        if (Array.isArray(data)) {
          setItems(data);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
        setError('Failed to load items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleCreateItem = async () => {
    try {
      const response = await fetch('/api/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'New Item',
          description: ['Add description'],
          tags: [],
          image: [],
          rating: 0,
          distributor: [],
          inventory: [],
          price: []
        }),
      });
      
      const result = await response.json();
      if (result.item) {
        router.push(`/admin/item/${result.item.$id}`);
      }
    } catch (error) {
      console.error('Error creating item:', error);
      setError('Failed to create item');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <AdminNavbar />
        <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <AdminFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Item Management</h1>
          <button
            onClick={handleCreateItem}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} />
            <span>Add Item</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.$id}
              onClick={() => router.push(`/admin/item/${item.$id}`)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer relative group"
            >
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                  title="Edit item"
                >
                  <Pencil size={16} className="text-blue-600" />
                </button>
              </div>

              {item.image && item.image[0] ? (
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1">{item.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-2">
                  {item.description[0]}
                </p>

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

                <div className="text-xs text-gray-500">
                  <p>Distributors: {item.distributor.length}</p>
                  <p>Updated: {new Date(item.$updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <AdminFooter />
    </div>
  );
}