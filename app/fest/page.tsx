"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FaDiscord, FaWhatsapp, FaTelegram, FaLinkedin } from "react-icons/fa";

interface FestType {
  $id: string;
  name?: string;
  description?: string;
  date?: string;
  image?: string[];
  packs?: string[];
}

const FestPage = () => {
  const [fests, setFests] = useState<FestType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFests = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/fest/");
        const today = new Date();

        const sortedFests = response.data.sort((a: FestType, b: FestType) => {
          const dateA = new Date(a.date || "");
          const dateB = new Date(b.date || "");

          // If both festivals are in the future, sort by closest date
          if (dateA >= today && dateB >= today) {
            return dateA.getTime() - dateB.getTime();
          }

          // If one is in the future and one is in the past, move past festivals to the end
          if (dateA < today && dateB >= today) {
            return 1;
          }
          if (dateA >= today && dateB < today) {
            return -1;
          }

          // If both are in the past, sort by the most recent past event
          return dateB.getTime() - dateA.getTime();
        });

        setFests(sortedFests);
      } catch (err: any) {
        setError("Failed to fetch fests");
      } finally {
        setLoading(false);
      }
    };

    fetchFests();
  }, []);

  const handleCardClick = (festId: string) => {
    router.push(`/fest/${festId}`);
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 relative">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Festivals</h1>

        {fests.length === 0 ? (
          <p className="text-center text-gray-600">No festivals available.</p>
        ) : (
          <>
            {fests.length > 0 && (
              <div
                key={fests[0].$id}
                className="relative w-full h-80 bg-cover bg-center rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 mb-6"
                style={{ backgroundImage: `url(${fests[0].image?.[0] || "/default.jpg"})` }}
                onClick={() => handleCardClick(fests[0].$id)}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
                  <h2 className="text-2xl font-semibold">{fests[0].name || "Unnamed Fest"}</h2>
                  <p className="text-sm mt-2">{fests[0].description || "No description available"}</p>
                  <p className="text-xs mt-1">📅 {fests[0].date ? new Date(fests[0].date).toDateString() : "Date not set"}</p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap -mx-2 mb-16">
              {fests.slice(1).map((fest) => (
                <div key={fest.$id} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
                  <div
                    className="relative w-full h-80 bg-cover bg-center rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                    style={{ backgroundImage: `url(${fest.image?.[0] || "/default.jpg"})` }}
                    onClick={() => handleCardClick(fest.$id)}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
                      <h2 className="text-2xl font-semibold">{fest.name || "Unnamed Fest"}</h2>
                      <p className="text-sm mt-2">{fest.description || "No description available"}</p>
                      <p className="text-xs mt-1">📅 {fest.date ? new Date(fest.date).toDateString() : "Date not set"}</p>
                    </div>
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