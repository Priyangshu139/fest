'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface Distributor {
  $id: string;
  name: string;
  mobile: string;
  address: string;
}

export default function EditDistributor() {
  const params = useParams();
  const router = useRouter();
  const [distributorData, setDistributorData] = useState<Distributor>({
    $id: '',
    name: '',
    mobile: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDistributor = async () => {
      try {
        const response = await fetch(`/api/distributor/${params.id}`);
        const data = await response.json();
        if (data.distributor) {
          setDistributorData(data.distributor);
        }
      } catch (error) {
        console.error('Error fetching distributor:', error);
        setMessage('Failed to load distributor data');
      } finally {
        setLoading(false);
      }
    };

    fetchDistributor();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/distributor/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(distributorData),
      });
      const data = await response.json();
      setMessage(data.message || 'Update successful');
    } catch (error) {
      console.error('Error updating distributor:', error);
      setMessage('Failed to update distributor');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDistributorData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold">Edit Distributor</h1>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={distributorData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Mobile:</label>
          <input
            type="tel"
            name="mobile"
            value={distributorData.mobile}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit mobile number"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Address:</label>
          <textarea
            name="address"
            value={distributorData.address}
            onChange={handleInputChange}
            rows={3}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Update Distributor
        </button>
      </form>
    </div>
  );
}