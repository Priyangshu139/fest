"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { FaBox } from "react-icons/fa";
import Footer from "@/app/components/Footer";

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

const FestPage = () => {
  const [fest, setFest] = useState<FestType | null>(null);
  const [packs, setPacks] = useState<PackType[]>([]);
  const [items, setItems] = useState<{ [key: string]: ItemType }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
              return {
                id: itemId,
                // Access the actual item data from response
                data: response.data // we'll process this in the reducer
              };
            } catch (error) {
              console.error(`Error fetching item ${itemId}:`, error);
              return null;
            }
          })
        ).then(responses => responses.filter(response => response !== null));

        // Create items object with proper mapping
        const newItems = itemResponses.reduce((acc, response) => {
          if (!response) return acc;
          
          const { id, data } = response;
          // Log the entire data object to see its structure
          console.log(`Processing item ${id}:`, data);
          
          acc[id] = {
            $id: id,
            name: data.item.name || "Unknown Item"
          };
          
          // Log the processed item
          console.log(`Processed item ${id}:`, acc[id]);
          
          return acc;
        }, {} as { [key: string]: ItemType });

        console.log("Final items mapping:", newItems);
        setItems(newItems);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchFestAndPacks();
  }, [id]);

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-700">{error}</p>;

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
                    <h2 className="text-xl font-semibold text-gray-900">{pack.name}</h2>
                    <p className="text-sm mt-2 text-gray-800">{pack.description}</p>
                    <p className="text-lg font-bold mt-4 text-gray-900">₹{pack.price}</p>
                    <ul className="mt-4">
                      {pack.item.map((itemId, index) => (
                        <li key={itemId} className="text-sm flex items-center text-gray-800">
                          <span>{items[itemId]?.name || "Loading..."}</span>
                          <FaBox className="ml-2 text-gray-500" />
                          <span className="ml-1">{pack.quantity[index]}</span>
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
    </div>
  );
};

export default FestPage;
