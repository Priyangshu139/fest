'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Trash2 } from 'lucide-react';
import AdminNavbar from '@/app/components/AdminNavbar';
import AdminFooter from '@/app/components/AdminFooter';

interface Distributor {
  $id: string;
  name: string;
  mobile: string;
  address: string;
  $createdAt: string;
  $updatedAt: string;
}

export default function AdminDistributorPage() {
  const router = useRouter();
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchDistributors = async () => {
    try {
      const response = await fetch('/api/distributor');
      const data = await response.json();
      setDistributors(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching distributors:', error);
      setMessage('Failed to load distributors');
      setLoading(false);
    }
  };

  const handleCreateDistributor = async () => {
    try {
      const response = await fetch('/api/distributor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'New Distributor',
          mobile: '',
          address: '',
        }),
      });
      
      const result = await response.json();
      if (result.distributor) {
        router.push(`/admin/distributor/${result.distributor.$id}`);
      }
    } catch (error) {
      console.error('Error creating distributor:', error);
      setMessage('Failed to create distributor');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this distributor?')) {
      return;
    }

    try {
      const response = await fetch(`/api/distributor/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDistributors(current => current.filter(d => d.$id !== id));
        setMessage('Distributor deleted successfully');
      } else {
        setMessage('Failed to delete distributor');
      }
    } catch (error) {
      console.error('Error deleting distributor:', error);
      setMessage('Failed to delete distributor');
    }
  };

  useEffect(() => {
    fetchDistributors();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Distributor Management</h1>
          <button
            onClick={handleCreateDistributor}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <PlusCircle size={20} />
            <span>Add Distributor</span>
          </button>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {distributors.map((distributor) => (
            <div
              key={distributor.$id}
              onClick={() => router.push(`/admin/distributor/${distributor.$id}`)}
              className="bg-white rounded-lg shadow-lg overflow-hidden relative group cursor-pointer hover:shadow-xl transition-shadow"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(distributor.$id);
                }}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                title="Delete distributor"
              >
                <Trash2 size={20} />
              </button>
              
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{distributor.name}</h2>
                <div className="text-gray-600 mb-2">
                  <p>📱 {distributor.mobile}</p>
                  <p>📍 {distributor.address}</p>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Created: {new Date(distributor.$createdAt).toLocaleString()}</p>
                  <p>Updated: {new Date(distributor.$updatedAt).toLocaleString()}</p>
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