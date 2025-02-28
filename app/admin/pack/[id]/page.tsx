'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PlusCircle, X, Trash2, ArrowLeft } from 'lucide-react';

interface Pack {
  $id: string;
  name: string;
  description: string;
  price: number;
  fest: string;
  item: string[];
  quantity: number[];
}

interface Item {
  $id: string;
  name: string;
  price: number;
}

export default function EditPack() {
  const params = useParams();
  const router = useRouter();
  const [packData, setPackData] = useState<Pack>({
    $id: '',
    name: '',
    description: '',
    price: 0,
    fest: '',
    item: [],
    quantity: []
  });
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pack and items data in parallel
        const [packResponse, itemsResponse] = await Promise.all([
          fetch(`/api/pack/${params.id}`),
          fetch('/api/item')
        ]);

        const packResult = await packResponse.json();
        const itemsResult = await itemsResponse.json();

        if (packResult.pack) {
          setPackData(packResult.pack);
        }
        if (itemsResult) {
          setItems(itemsResult);
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
      const response = await fetch(`/api/pack/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(packData),
      });
      const data = await response.json();
      setMessage(data.message || 'Update successful');
    } catch (error) {
      console.error('Error updating pack:', error);
      setMessage('Failed to update pack');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPackData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleItemSelect = (itemId: string) => {
    setPackData(prev => {
      const itemIndex = prev.item.indexOf(itemId);
      if (itemIndex === -1) {
        // Add item
        return {
          ...prev,
          item: [...prev.item, itemId],
          quantity: [...prev.quantity, 1]
        };
      } else {
        // Remove item
        const newItems = prev.item.filter((_, index) => index !== itemIndex);
        const newQuantities = prev.quantity.filter((_, index) => index !== itemIndex);
        return {
          ...prev,
          item: newItems,
          quantity: newQuantities
        };
      }
    });
  };

  const handleQuantityChange = (index: number, value: number) => {
    setPackData(prev => {
      const newQuantities = [...prev.quantity];
      newQuantities[index] = value;
      return {
        ...prev,
        quantity: newQuantities
      };
    });
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      const itemIndex = packData.item.indexOf(itemId);
      if (itemIndex === -1) return;
      
      const newItems = [...packData.item];
      const newQuantities = [...packData.quantity];
      newItems.splice(itemIndex, 1);
      newQuantities.splice(itemIndex, 1);
      
      const updatedPackData = {
        ...packData,
        item: newItems,
        quantity: newQuantities
      };

      // Update backend
      const response = await fetch(`/api/pack/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPackData),
      });

      if (response.ok) {
        // Update local state only after successful backend update
        setPackData(updatedPackData);
        setMessage('Item removed successfully');
      } else {
        setMessage('Failed to remove item');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      setMessage('Failed to remove item');
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/admin/itempick?pack=${params.id}&search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold">Edit Pack</h1>
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
            value={packData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Description:</label>
          <textarea
            name="description"
            value={packData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Price:</label>
          <input
            type="number"
            name="price"
            value={packData.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              Items ({packData.item.length})
            </label>
          </div>
          <div className="space-y-2">
            {items
              .filter(item => packData.item.includes(item.$id))
              .map((item) => (
                <div
                  key={item.$id}
                  className="flex items-center gap-4 p-3 border rounded bg-white"
                >
                  <span className="flex-grow font-medium">{item.name}</span>
                  <input
                    type="number"
                    min="1"
                    value={packData.quantity[packData.item.indexOf(item.$id)]}
                    onChange={(e) => handleQuantityChange(
                      packData.item.indexOf(item.$id),
                      parseInt(e.target.value)
                    )}
                    className="w-20 p-1 border rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.$id)}
                    className="p-1 text-red-500 hover:text-red-700 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            className="w-full p-2 border rounded-lg pr-12"
            placeholder="Search more items to add..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <button
            type="button"
            onClick={() => {
              if (searchQuery.trim()) {
                router.push(`/admin/itempick?pack=${params.id}&search=${encodeURIComponent(searchQuery.trim())}`);
                setSearchQuery("");
              }
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-1.5 rounded-md hover:bg-blue-600 flex items-center gap-1"
          >
            <PlusCircle size={16} />
            <span>Add</span>
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Update Pack
        </button>
      </form>
    </div>
  );
}