"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Fest {
  $id: string;
  name?: string;
  description?: string;
  date?: string;
  image?: string[];
  packs?: string[];
}

export default function FestPage() {
  const [fests, setFests] = useState<Fest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchFests = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/fest");
        if (!response.ok) throw new Error("Failed to fetch fests");
        
        const data = await response.json();
        setFests(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFests();
  }, []);

  const handleCardClick = (festId: string, packIds: string[]) => {
    if (packIds.length > 0) {
      router.push(`/fest/${festId}?packs=${packIds.join(",")}`);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Festivals</h1>

        {fests.length === 0 ? (
          <p className="text-center text-gray-600">No festivals available.</p>
        ) : (
          <div className="space-y-6">
            {fests.map((fest) => (
              <div
                key={fest.$id}
                className="relative w-full h-80 bg-cover bg-center rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                style={{ backgroundImage: `url(${fest.image?.[0] || "/default.jpg"})` }}
                onClick={() => handleCardClick(fest.$id, fest.packs || [])}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
                  <h2 className="text-2xl font-semibold">{fest.name || "Unnamed Fest"}</h2>
                  <p className="text-sm mt-2">{fest.description || "No description available"}</p>
                  <p className="text-xs mt-1">📅 {fest.date ? new Date(fest.date).toDateString() : "Date not set"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
