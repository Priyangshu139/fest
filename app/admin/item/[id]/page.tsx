'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PlusCircle, X, Star } from 'lucide-react';
import AdminNavbar from '@/app/components/AdminNavbar';
import AdminFooter from '@/app/components/AdminFooter';

interface ItemData {
  $id: string;
  name: string;
  description: string[];
  tags: string[];
  image: string[];
  rating: number;
}

export default function EditItem() {
  const params = useParams();
  const router = useRouter();
  const [itemData, setItemData] = useState<ItemData>({
    $id: '',
    name: '',
    description: [],
    tags: [],
    image: [],
    rating: 0
  });
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/item/${params.id}`);
        const data = await response.json();
        if (data.item) {
          setItemData(data.item);
        }
      } catch (error) {
        console.error('Error fetching item:', error);
        setMessage('Failed to load item');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/item/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      });
      const data = await response.json();
      setMessage(data.message || 'Update successful');
    } catch (error) {
      console.error('Error updating item:', error);
      setMessage('Failed to update item');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemData(prev => ({ ...prev, name: e.target.value }));
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newDescription = [...itemData.description];
    newDescription[index] = value;
    setItemData(prev => ({ ...prev, description: newDescription }));
  };

  const addDescription = () => {
    setItemData(prev => ({
      ...prev,
      description: [...prev.description, '']
    }));
  };

  const removeDescription = (index: number) => {
    setItemData(prev => ({
      ...prev,
      description: prev.description.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...itemData.image];
    newImages[index] = value;
    setItemData(prev => ({ ...prev, image: newImages }));
  };

  const addImage = () => {
    setItemData(prev => ({
      ...prev,
      image: [...prev.image, '']
    }));
  };

  const removeImage = (index: number) => {
    setItemData(prev => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (newTag.trim()) {
      setItemData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setItemData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <AdminFooter />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Edit Item</h1>
          
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
                value={itemData.name}
                onChange={handleNameChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Description Lines:</label>
              {itemData.description.map((desc, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={desc}
                    onChange={(e) => handleDescriptionChange(index, e.target.value)}
                    className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeDescription(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addDescription}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
              >
                <PlusCircle size={20} />
                <span>Add Description Line</span>
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tags:</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {itemData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Tag
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Rating:</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={itemData.rating}
                  onChange={(e) => setItemData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                  className="w-24 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  step="0.1"
                  min="0"
                  max="5"
                />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Image URLs:</label>
              {itemData.image.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    placeholder="Image URL"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addImage}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
              >
                <PlusCircle size={20} />
                <span>Add Image URL</span>
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Update Item
            </button>
          </form>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
}