"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { FaBox, FaShoppingCart } from "react-icons/fa";
import Footer from "@/app/components/Footer";
import Loader from "@/app/components/Loader";

interface FestType {
  $id: string;
  name?: string;
  date?: string;
}

interface PackType {
  $id: string;
  name: string;
  description: string;
  price: number;
  fest: string;
  item: string[];
  quantity: number[];
}

interface ItemType {
  $id: string;
  name: string;
}

interface SelectedItems {
  [packId: string]: {
    isPackSelected: boolean;
    items: { [itemId: string]: boolean };
  };
}

interface CartPackItem {
  type: 'pack';
  packId: string;
  packName: string;
  items: {
    itemId: string;
    itemName: string;
    quantity: number;
  }[];
  price: number;
  description: string;
}

interface CartSingleItem {
  type: 'item';
  itemId: string;
  packId: string;
  itemName: string;
  packName: string;
  quantity: number;
  price: number;
}

type CartItem = CartPackItem | CartSingleItem;

const FestPage = () => {
  const [fest, setFest] = useState<FestType | null>(null);
  const [packs, setPacks] = useState<PackType[]>([]);
  const [items, setItems] = useState<{ [key: string]: ItemType }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
  const { id } = useParams();

  useEffect(() => {
    const fetchFestAndPacks = async () => {
      try {
        // Fetch Fest Details
        const festResponse = await axios.get(`/api/fest/${id}`);
        setFest(festResponse.data.fest || festResponse.data);

        // Fetch Packs by Fest ID
        const packsResponse = await axios.get(`/api/pack_by_fest/${id}`);
        const packsData = packsResponse.data.data;
        setPacks(packsData);

        // Get all unique item IDs
        const itemIds = [...new Set(packsData.flatMap((pack: PackType) => pack.item))];
        console.log("Item IDs to fetch:", itemIds);

        // Fetch all items concurrently
        const itemResponses = await Promise.all(
          itemIds.map(async (itemId) => {
            try {
              const response = await axios.get(`/api/item/${itemId}`);
              console.log(`Raw response for item ${itemId}:`, response.data);
              return { id: itemId as string, data: response.data };
            } catch (error) {
              console.error(`Error fetching item ${itemId}:`, error);
              return null;
            }
          })
        ).then(responses => responses.filter(response => response !== null));

        // Create items object with proper mapping
        const newItems = itemResponses.reduce((acc: { [key: string]: ItemType }, response) => {
          if (!response) return acc;
          const { id, data } = response;
          
          // Use the correct path to access the item name
          // Check if data.item exists first, then access name property
          acc[id] = { 
            $id: id, 
            name: data.item?.name || data.name || "Unknown Item" 
          };
          
          return acc;
        }, {});

        console.log("Final items mapping:", newItems);
        setItems(newItems);

        // Initialize selection state when packs are loaded
        const initialSelection = packsData.reduce((acc: SelectedItems, pack: PackType) => {
          acc[pack.$id] = {
            isPackSelected: false,
            items: pack.item.reduce((itemAcc: { [key: string]: boolean }, itemId: string) => {
              itemAcc[itemId] = false;
              return itemAcc;
            }, {})
          };
          return acc;
        }, {});
        setSelectedItems(initialSelection);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchFestAndPacks();
  }, [id]);

  const handlePackSelect = (packId: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [packId]: {
        ...prev[packId],
        isPackSelected: !prev[packId].isPackSelected,
        items: Object.keys(prev[packId].items).reduce((acc: { [key: string]: boolean }, itemId) => {
          acc[itemId] = !prev[packId].isPackSelected;
          return acc;
        }, {})
      }
    }));
  };

  const handleItemSelect = (packId: string, itemId: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [packId]: {
        ...prev[packId],
        items: {
          ...prev[packId].items,
          [itemId]: !prev[packId].items[itemId]
        }
      }
    }));
  };

  const getSelectedItemsCount = () => {
    return Object.values(selectedItems).reduce((total, pack) => {
      // If the entire pack is selected, count all its items
      if (pack.isPackSelected) {
        return total + Object.keys(pack.items).length;
      }
      // Otherwise, count only the individually selected items
      return total + Object.values(pack.items).filter(Boolean).length;
    }, 0);
  };

  const handleAddToCart = () => {
    const cartItems: CartItem[] = [];

    // Process each pack
    Object.entries(selectedItems).forEach(([packId, packData]) => {
      const pack = packs.find(p => p.$id === packId);
      if (!pack) return;

      // If the entire pack is selected, add it as one item
      if (packData.isPackSelected) {
        cartItems.push({
          type: 'pack',
          packId,
          packName: pack.name,
          items: pack.item.map((itemId, index) => ({
            itemId,
            itemName: items[itemId]?.name || "Unknown Item",
            quantity: pack.quantity[index] || 1
          })),
          price: pack.price,
          description: pack.description
        });
      } else {
        // Add individual selected items from this pack
        const selectedPackItems: CartSingleItem[] = Object.entries(packData.items)
          .filter(([_, isSelected]) => isSelected)
          .map(([itemId]) => ({
            type: 'item',
            itemId,
            packId,
            itemName: items[itemId]?.name || "Unknown Item",
            packName: pack.name,
            quantity: pack.quantity[pack.item.indexOf(itemId)] || 1,
            price: pack.price
          }));

        cartItems.push(...selectedPackItems);
      }
    });

    // Save to localStorage
    try {
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = [...existingCart, ...cartItems];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      // Reset selections after adding to cart
      const resetSelection = Object.keys(selectedItems).reduce((acc: SelectedItems, packId) => {
        acc[packId] = {
          isPackSelected: false,
          items: Object.keys(selectedItems[packId].items).reduce((itemAcc: { [key: string]: boolean }, itemId) => ({
            ...itemAcc,
            [itemId]: false
          }), {})
        };
        return acc;
      }, {});
      
      setSelectedItems(resetSelection);
      alert('Items added to cart successfully!');
    } catch (error) {
      console.error('Error adding items to cart:', error);
      alert('Failed to add items to cart. Please try again.');
    }
  };

  if (loading) return <Loader />;
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <p className="text-red-500 text-lg">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    </div>
  );

  // Loading skeleton for individual items
  const PackItemLoader = () => (
    <div className="animate-pulse flex items-center space-x-2">
      <div className="h-4 bg-gray-200 rounded w-24"></div>
      <FaBox className="text-gray-300" />
      <div className="h-4 bg-gray-200 rounded w-8"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 relative">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4">
        {fest && (
          <>
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
              {fest.name || "Unknown Fest"}
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Date: {fest.date ? new Date(fest.date).toLocaleDateString() : "No Date Available"}
            </p>

            <div className="flex flex-wrap -mx-2 mb-16">
              {packs.map((pack) => (
                <div key={pack.$id} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
                  <div className="relative w-full h-auto bg-white rounded-lg shadow-lg p-4">
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id={`pack-${pack.$id}`}
                        checked={selectedItems[pack.$id]?.isPackSelected || false}
                        onChange={() => handlePackSelect(pack.$id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor={`pack-${pack.$id}`} className="ml-2 text-xl font-semibold text-gray-900">
                        {pack.name}
                      </label>
                    </div>
                    <p className="text-sm mt-2 text-gray-800">{pack.description}</p>
                    <p className="text-lg font-bold mt-4 text-gray-900">₹{pack.price}</p>
                    <ul className="mt-4 space-y-2">
                      {pack.item.map((itemId, index) => (
                        <li key={itemId} className="text-sm flex items-center text-gray-800">
                          {items[itemId] ? (
                            <>
                              <input
                                type="checkbox"
                                id={`item-${pack.$id}-${itemId}`}
                                checked={selectedItems[pack.$id]?.items[itemId] || false}
                                onChange={() => handleItemSelect(pack.$id, itemId)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                              <label htmlFor={`item-${pack.$id}-${itemId}`} className="ml-2 flex items-center">
                                <span>{items[itemId].name}</span>
                                <FaBox className="ml-2 text-gray-500" />
                                <span className="ml-1">{pack.quantity[index]}</span>
                              </label>
                            </>
                          ) : (
                            <PackItemLoader />
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
      
      {/* Add to Cart Button */}
      {getSelectedItemsCount() > 0 ? (
        <button
          onClick={handleAddToCart}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 transition-all transform hover:scale-105"
          style={{ zIndex: 1000 }}
        >
          <FaShoppingCart className="text-xl" />
          <span className="font-semibold">
            Add to Cart ({getSelectedItemsCount()})
          </span>
        </button>
      ) : null}
    </div>
  );
};

export default FestPage;