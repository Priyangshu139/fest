'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import AdminNavbar from '@/app/components/AdminNavbar';
import AdminFooter from '@/app/components/AdminFooter';

interface Pack {
  $id: string;
  name: string;
  description: string;
  price: number;
  fest: string;
  item: string[];
  quantity: number[];
  $createdAt: string;
  $updatedAt: string;
}

export default function AdminPackPage() {
  const router = useRouter();
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchPacks = async () => {
    try {
      const response = await fetch('/api/pack');
      const data = await response.json();
      setPacks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching packs:', error);
      setMessage('Failed to load packs');
      setLoading(false);
    }
  };

  const handleDelete = async (packId: string) => {
    if (!confirm('Are you sure you want to delete this pack?')) {
      return;
    }

    try {
      const response = await fetch(`/api/pack/${packId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPacks(currentPacks => currentPacks.filter(pack => pack.$id !== packId));
        setMessage('Pack deleted successfully');
      } else {
        setMessage('Failed to delete pack');
      }
    } catch (error) {
      console.error('Error deleting pack:', error);
      setMessage('Failed to delete pack');
    }
  };

  useEffect(() => {
    fetchPacks();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Pack Management</h1>

        {message && (
          <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packs.map((pack) => (
            <div
              key={pack.$id}
              onClick={() => router.push(`/admin/pack/${pack.$id}`)}
              className="bg-white rounded-lg shadow-lg overflow-hidden relative group cursor-pointer hover:shadow-xl transition-shadow"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(pack.$id);
                }}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                title="Delete pack"
              >
                <Trash2 size={20} />
              </button>
              
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{pack.name}</h2>
                <p className="text-gray-600 mb-2">
                  {pack.description.length > 100
                    ? `${pack.description.substring(0, 100)}...`
                    : pack.description}
                </p>
                <div className="text-xs text-gray-500 space-y-1 mb-2">
                  <p>Price: ₹{pack.price}</p>
                  <p>Items: {pack.item.length}</p>
                  <p>Created: {new Date(pack.$createdAt).toLocaleString()}</p>
                  <p>Updated: {new Date(pack.$updatedAt).toLocaleString()}</p>
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
