"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Pack {
  $id: string;
  name?: string;
  item?: string[];
}

export default function PackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const packIds = searchParams.get("packs")?.split(",") || [];
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPacks = async () => {
      if (packIds.length === 0) return;

      try {
        const response = await fetch(`http://localhost:3000/api/pack?ids=${packIds.join(",")}`);
        if (!response.ok) throw new Error("Failed to fetch packs");

        const data = await response.json();
        setPacks(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPacks();
  }, [packIds]);

  const handlePackClick = (packId: string, itemIds: string[]) => {
    if (itemIds.length > 0) {
      router.push(`/pack/${packId}?items=${itemIds.join(",")}`);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Festival Packs</h1>

        {packs.length === 0 ? (
          <p className="text-center text-gray-600">No packs available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packs.map((pack) => (
              <div
                key={pack.$id}
                className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:bg-gray-200 transition"
                onClick={() => handlePackClick(pack.$id, pack.item || [])}
              >
                <h2 className="text-xl font-semibold">{pack.name || "Unnamed Pack"}</h2>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
