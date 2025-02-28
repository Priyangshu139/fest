'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Star, Plus, Check, Search } from 'lucide-react';

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

interface Pack {
  $id: string;
  name: string;
  description: string;
  item: string[];
  quantity: number[];
  price: number;
}

export default function ItemPickPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packId = searchParams.get('pack');
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const [localSearch, setLocalSearch] = useState('');
  
  const [items, setItems] = useState<Item[]>([]);
  const [pack, setPack] = useState<Pack | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsResponse, packResponse] = await Promise.all([
          fetch('/api/item'),
          fetch(`/api/pack/${packId}`)
        ]);

        const itemsData = await itemsResponse.json();
        const packData = await packResponse.json();

        if (Array.isArray(itemsData)) {
          let filteredItems = itemsData;
          const searchTerm = localSearch || searchQuery;
          
          if (searchTerm) {
            filteredItems = itemsData.filter((item: Item) => {
              const nameMatch = item.name.toLowerCase().includes(searchTerm);
              const descMatch = item.description.some(desc => 
                desc.toLowerCase().includes(searchTerm)
              );
              const tagsMatch = item.tags.some(tag => 
                tag.toLowerCase().includes(searchTerm)
              );
              return nameMatch || descMatch || tagsMatch;
            });
          }
          setItems(filteredItems);
        }

        if (packData.pack) {
          setPack(packData.pack);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [packId, searchQuery, localSearch]);

  const handleAddToPack = async (itemId: string) => {
    if (!pack) return;

    try {
      const updatedPack = {
        ...pack,
        item: pack.item.includes(itemId) 
          ? pack.item
          : [...pack.item, itemId],
        quantity: pack.item.includes(itemId)
          ? pack.quantity
          : [...pack.quantity, 1]
      };

      const response = await fetch(`/api/pack/${packId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPack),
      });

      if (response.ok) {
        // Update local state without redirecting
        setPack(updatedPack);
        // Optional: Add success message
        setError('Item added successfully');
        setTimeout(() => setError(null), 2000); // Clear message after 2 seconds
      } else {
        setError('Failed to add item');
      }
    } catch (error) {
      console.error('Error updating pack:', error);
      setError('Failed to add item');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">
          Add Items to {pack?.name || 'Pack'}
        </h1>
        
        <div className="relative mb-6">
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search items..."
            className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.$id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
          >
            {pack?.item.includes(item.$id) && (
              <div className="absolute top-2 right-2 z-10 bg-green-500 text-white p-1 rounded-full">
                <Check size={16} />
              </div>
            )}

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
                  <p key={index} className="text-gray-600 text-sm">{desc}</p>
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

              <button
                onClick={() => handleAddToPack(item.$id)}
                className={`w-full mt-4 px-4 py-2 rounded flex items-center justify-center gap-2 ${
                  pack?.item.includes(item.$id)
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                {pack?.item.includes(item.$id) ? (
                  <>
                    <Check size={16} />
                    <span>Added to Pack</span>
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    <span>Add to Pack</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}