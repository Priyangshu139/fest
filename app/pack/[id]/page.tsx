"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Item {
  $id: string;
  name?: string;
}

export default function ItemPage() {
  const searchParams = useSearchParams();
  const itemIds = searchParams.get("items")?.split(",") || [];
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      if (itemIds.length === 0) return;

      try {
        const response = await fetch(`http://localhost:3000/api/item?ids=${itemIds.join(",")}`);
        if (!response.ok) throw new Error("Failed to fetch items");

        const data = await response.json();
        setItems(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [itemIds]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Pack Items</h1>

        {items.length === 0 ? (
          <p className="text-center text-gray-600">No items available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div key={item.$id} className="bg-white p-6 rounded-lg shadow-md text-center">
                <h2 className="text-xl font-semibold">{item.name || "Unnamed Item"}</h2>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
