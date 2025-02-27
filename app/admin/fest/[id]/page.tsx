'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PlusCircle, X, Trash2 } from 'lucide-react';

interface FestData {
  name: string;
  description: string;
  image: string[];
  date: string;
  $id: string;
}

interface Pack {
  $id: string;
  name: string;
  description: string;
  price: number;
}

export default function EditFest() {
  const params = useParams();
  const router = useRouter();
  const [festData, setFestData] = useState<FestData>({
    name: '',
    description: '',
    image: [''],
    date: '',
    $id: ''
  });
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [festResponse, packsResponse] = await Promise.all([
          fetch(`/api/fest/${params.id}`),
          fetch(`/api/pack_by_fest/${params.id}`)
        ]);

        const festResult = await festResponse.json();
        const packsResult = await packsResponse.json();

        if (festResult.fest) {
          setFestData(festResult.fest);
        }
        if (packsResult.data) {
          setPacks(packsResult.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/fest/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(festData),
      });
      const data = await response.json();
      setMessage(data.message || 'Update successful');
    } catch (error) {
      console.error('Error updating fest:', error);
      setMessage('Failed to update fest');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('image-')) {
      const index = parseInt(name.split('-')[1]);
      const newImages = [...festData.image];
      newImages[index] = value;
      setFestData(prev => ({ ...prev, image: newImages }));
    } else {
      setFestData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addImageField = () => {
    setFestData(prev => ({
      ...prev,
      image: [...prev.image, '']
    }));
  };

  const removeImageField = (index: number) => {
    if (festData.image.length > 1) {
      setFestData(prev => ({
        ...prev,
        image: prev.image.filter((_, i) => i !== index)
      }));
    }
  };

  const handleCreatePack = async () => {
    try {
      const newPack = {
        name: `${festData.name} Pack`,
        description: `Pack for ${festData.name}`,
        item: [],
        fest: params.id,
        price: 0,
        quantity: []
      };

      const response = await fetch('/api/pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPack)
      });

      const result = await response.json();
      if (result.pack) {
        router.push(`/admin/pack/${result.pack.$id}`);
      }
    } catch (error) {
      console.error('Error creating pack:', error);
      setMessage('Failed to create pack');
    }
  };

  const handleDeletePack = async (packId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation to pack edit page
    
    if (!confirm('Are you sure you want to delete this pack?')) {
      return;
    }
  
    try {
      const response = await fetch(`/api/pack/${packId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Remove pack from local state
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

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Fest</h1>
      
      {message && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={festData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Description:</label>
          <textarea
            name="description"
            value={festData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Image URLs:</label>
          {festData.image.map((url, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                name={`image-${index}`}
                value={url}
                onChange={handleInputChange}
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
          >
            <PlusCircle size={20} />
            <span>Add Image URL</span>
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Date:</label>
          <input
            type="date"
            name="date"
            value={festData.date}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Update Fest Details
        </button>
      </form>

      <div className="border-t pt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Fest Packs</h2>
          <button
            onClick={handleCreatePack}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <PlusCircle size={20} />
            <span>Create Pack</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {packs.map((pack) => (
            <div
              key={pack.$id}
              onClick={() => router.push(`/admin/pack/${pack.$id}`)}
              className="cursor-pointer bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow relative group"
            >
              <button
                onClick={(e) => handleDeletePack(pack.$id, e)}
                className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete pack"
              >
                <Trash2 size={18} />
              </button>
              <h3 className="text-lg font-semibold mb-2">{pack.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{pack.description}</p>
              <p className="text-blue-600 font-medium">₹{pack.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}