'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminNavbar from '@/app/components/AdminNavbar';
import AdminFooter from '@/app/components/AdminFooter';
import { Trash2 } from 'lucide-react';

interface Fest {
  $id: string;
  name: string;
  description: string;
  image: string[];
  date: string;
  $createdAt: string;
  $updatedAt: string;
}

export default function AdminFestPage() {
  const router = useRouter();
  const [fests, setFests] = useState<Fest[]>([]);

  const fetchFests = async () => {
    try {
      const response = await fetch('/api/fest');
      const data = await response.json();
      setFests(data);
    } catch (error) {
      console.error('Error fetching fests:', error);
    }
  };

  const createNewFest = async () => {
    try {
      const response = await fetch('/api/fest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Unnamed',
          description: '',
          image: [],
          date: new Date().toISOString().split('T')[0],
        }),
      });
      if (response.ok) {
        fetchFests(); // Refresh the list
      }
    } catch (error) {
      console.error('Error creating fest:', error);
    }
  };

  const handleEdit = (festId: string) => {
    router.push(`/admin/fest/${festId}`);
  };

  const handleDelete = async (festId: string) => {
    if (!confirm('Are you sure you want to delete this fest? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/fest/${festId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove fest from local state
        setFests(currentFests => currentFests.filter(fest => fest.$id !== festId));
      } else {
        alert('Failed to delete fest');
      }
    } catch (error) {
      console.error('Error deleting fest:', error);
      alert('Error deleting fest');
    }
  };

  useEffect(() => {
    fetchFests();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Fest Management</h1>
          <button
            onClick={createNewFest}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <span className="text-xl mr-1">+</span> Add Fest
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fests.map((fest) => (
            <div
              key={fest.$id}
              className="bg-white rounded-lg shadow-lg overflow-hidden relative group"
            >
              <button
                onClick={() => handleDelete(fest.$id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                title="Delete fest"
              >
                <Trash2 size={20} />
              </button>

              {fest.image && fest.image[0] ? (
                <img
                  src={fest.image[0]}
                  alt={fest.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
              
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{fest.name}</h2>
                <p className="text-gray-600 mb-2">
                  {fest.description.length > 100
                    ? `${fest.description.substring(0, 100)}...`
                    : fest.description}
                </p>
                <div className="text-xs text-gray-500 space-y-1 mb-2">
                  <p>Created: {new Date(fest.$createdAt).toLocaleString()}</p>
                  <p>Updated: {new Date(fest.$updatedAt).toLocaleString()}</p>
                  <p>Date: {new Date(fest.date).toLocaleDateString()}</p>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleEdit(fest.$id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
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