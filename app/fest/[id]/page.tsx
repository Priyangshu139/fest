"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { FaDiscord, FaWhatsapp, FaTelegram, FaLinkedin } from "react-icons/fa";
import { FaBox } from "react-icons/fa"; // Icon for quantity

interface FestType {
  $id: string;
  name?: string;
  description?: string;
  date?: string;
  image?: string[];
  packs?: string[];
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
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchFestAndPacks = async () => {
      try {
        const festResponse = await axios.get(`http://localhost:3000/api/fest/${id}`);
        const packsResponse = await axios.get("http://localhost:3000/api/pack/");
        
        const festData = festResponse.data;
        const packsData = packsResponse.data.filter((pack: PackType) => pack.fest === id);

        setFest(festData);
        setPacks(packsData);

        // Fetch item details
        const itemIds = packsData.flatMap(pack => pack.item);
        const uniqueItemIds = [...new Set(itemIds)];
        const itemPromises = uniqueItemIds.map(itemId => axios.get(`http://localhost:3000/api/item/${itemId}`));
        const itemResponses = await Promise.all(itemPromises);
        const itemsData = itemResponses.reduce((acc, response) => {
          acc[response.data.$id] = response.data;
          return acc;
        }, {} as { [key: string]: ItemType });

        setItems(itemsData);
      } catch (err: any) {
        setError("Failed to fetch fest or packs");
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
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">{fest.name}</h1>
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

      {/* Social Media Icons */}
      <div className="absolute bottom-4 left-4 flex space-x-4">
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
          <FaDiscord className="w-8 h-8 text-gray-700 hover:text-black" />
        </a>
        <a href="https://wa.me" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="w-8 h-8 text-gray-700 hover:text-black" />
        </a>
        <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
          <FaTelegram className="w-8 h-8 text-gray-700 hover:text-black" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="w-8 h-8 text-gray-700 hover:text-black" />
        </a>
      </div>

      {/* About Us Link */}
      <div className="absolute bottom-4 right-4 text-right">
        <a href="/about" className="text-yellow-900 hover:text-black block">
          About Us
        </a>
        <a href="/about" className="text-gray-700 hover:text-black block">
          lorem ipsum
        </a>
        <a href="/about" className="text-gray-700 hover:text-black block">
          end
        </a>
      </div>
    </div>
  );
};

export default FestPage;
