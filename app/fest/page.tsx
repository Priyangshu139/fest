"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

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

          if (dateA >= today && dateB >= today) {
            return dateA.getTime() - dateB.getTime();
          }
          if (dateA < today && dateB >= today) {
            return 1;
          }
          if (dateA >= today && dateB < today) {
            return -1;
          }
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

  if (loading) return <Loader />;
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-center text-red-500 text-lg">{error}</p>
    </div>
  );

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
      <Footer />
    </div>
  );
};

export default FestPage;