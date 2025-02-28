'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Plus, Minus, Star } from 'lucide-react';

interface Distributor {
  $id: string;
  name: string;
  mobile: string;
}

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

export default function DistributorItemsPage() {
  const params = useParams();
  const router = useRouter();
  const [distributor, setDistributor] = useState<Distributor | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [pendingChanges, setPendingChanges] = useState<{
    [key: string]: { inventory?: number; price?: number }
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [distributorResponse, itemsResponse] = await Promise.all([
          fetch(`/api/distributor/${params.id}`),
          fetch('/api/item')
        ]);

        const distributorData = await distributorResponse.json();
        const itemsData = await itemsResponse.json();

        if (distributorData.distributor) {
          setDistributor(distributorData.distributor);
        }

        if (Array.isArray(itemsData)) {
          setAllItems(itemsData);
          // Filter items that have this distributor
          const relevantItems = itemsData.filter(item => 
            item.distributor.includes(params.id)
          );
          setItems(relevantItems);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleInventoryChange = (itemId: string, change: number) => {
    const item = items.find(i => i.$id === itemId);
    if (!item) return;

    const distributorIndex = item.distributor.indexOf(params.id);
    if (distributorIndex === -1) return;

    const currentInventory = item.inventory[distributorIndex] || 0;
    const newInventory = Math.max(0, currentInventory + change);

    setPendingChanges(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        inventory: newInventory
      }
    }));
  };

  const handlePriceChange = (itemId: string, newPrice: number) => {
    setPendingChanges(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        price: newPrice
      }
    }));
  };

  const handleUpdateChanges = async () => {
    try {
      const updates = Object.entries(pendingChanges).map(async ([itemId, changes]) => {
        const item = items.find(i => i.$id === itemId);
        if (!item) return;

        const distributorIndex = item.distributor.indexOf(params.id);
        if (distributorIndex === -1) return;

        const newInventory = changes.inventory !== undefined
          ? [...item.inventory]
          : item.inventory;
        const newPrices = changes.price !== undefined
          ? [...item.price]
          : item.price;

        if (changes.inventory !== undefined) {
          newInventory[distributorIndex] = changes.inventory;
        }
        if (changes.price !== undefined) {
          newPrices[distributorIndex] = changes.price;
        }

        const response = await fetch(`/api/item/${itemId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            inventory: newInventory,
            price: newPrices
          }),
        });

        if (response.ok) {
          return { itemId, newInventory, newPrices };
        }
      });

      const results = await Promise.all(updates);
      
      // Update local state
      setItems(prev => prev.map(item => {
        const update = results.find(r => r?.itemId === item.$id);
        if (update) {
          return {
            ...item,
            inventory: update.newInventory,
            price: update.newPrices
          };
        }
        return item;
      }));

      setPendingChanges({});
      setError('Changes updated successfully');
      setTimeout(() => setError(null), 2000);
    } catch (error) {
      console.error('Error updating items:', error);
      setError('Failed to update changes');
    }
  };

  // First, add a helper function to check if an item is associated with the distributor
  const isItemAssociated = (item: Item) => item.distributor.includes(params.id);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">{distributor?.name}</h1>
              <span className="ml-4 text-gray-600">📱 {distributor?.mobile}</span>
            </div>
            <button
              onClick={() => router.push(`/distributor/${params.id}/orders`)}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Orders
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* My Items Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">My Items</h2>
            {Object.keys(pendingChanges).length > 0 && (
              <button
                onClick={handleUpdateChanges}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Update Changes
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => {
              const distributorIndex = item.distributor.indexOf(params.id);
              const inventory = pendingChanges[item.$id]?.inventory ?? item.inventory[distributorIndex] ?? 0;
              const price = pendingChanges[item.$id]?.price ?? item.price[distributorIndex] ?? 0;

              return (
                <div key={item.$id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1">{item.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    {item.description[0]}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleInventoryChange(item.$id, -1)}
                        className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-medium">{inventory}</span>
                      <button
                        onClick={() => handleInventoryChange(item.$id, 1)}
                        className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">₹</span>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => handlePriceChange(item.$id, Number(e.target.value))}
                        className="w-20 p-1 border rounded"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* All Available Items Section */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">All Available Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allItems.filter(item => !isItemAssociated(item)).map((item) => (
              <div key={item.$id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1">{item.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  {item.description[0]}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Initial Inventory:</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          defaultValue={0}
                          min="0"
                          className="w-20 p-1 border rounded"
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            setPendingChanges(prev => ({
                              ...prev,
                              [item.$id]: {
                                ...prev[item.$id],
                                inventory: value
                              }
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Set Price:</span>
                      <div className="flex items-center gap-2">
                        <span>₹</span>
                        <input
                          type="number"
                          defaultValue={0}
                          min="0"
                          className="w-20 p-1 border rounded"
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            setPendingChanges(prev => ({
                              ...prev,
                              [item.$id]: {
                                ...prev[item.$id],
                                price: value
                              }
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <button
                      onClick={async () => {
                        try {
                          const newItem = {
                            ...item,
                            distributor: [...item.distributor, params.id],
                            inventory: [...item.inventory, pendingChanges[item.$id]?.inventory || 0],
                            price: [...item.price, pendingChanges[item.$id]?.price || 0]
                          };

                          const response = await fetch(`/api/item/${item.$id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(newItem),
                          });

                          if (response.ok) {
                            setItems(prev => [...prev, newItem]);
                            setAllItems(prev => 
                              prev.map(i => i.$id === item.$id ? newItem : i)
                            );
                            setPendingChanges(prev => {
                              const { [item.$id]: _, ...rest } = prev;
                              return rest;
                            });
                            setError('Item added successfully');
                            setTimeout(() => setError(null), 2000);
                          }
                        } catch (error) {
                          console.error('Error adding item:', error);
                          setError('Failed to add item');
                        }
                      }}
                      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                      Add to My Items
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}