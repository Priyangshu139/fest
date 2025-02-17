import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_item_ID as string;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string;

// Debugging: Ensure environment variables are loaded
console.log("Database ID:", DATABASE_ID);
console.log("Collection ID:", COLLECTION_ID);

if (!DATABASE_ID || !COLLECTION_ID) {
  throw new Error("Missing Appwrite Database or Collection ID in environment variables.");
}

// Create Item
async function createItem(data: {
  name: string;
  description: string[];
  tags: string[];
  price: number | null;
  image: string[];
  rating: number | null;
  inventory: number;
  distributor: string[];
}) {
  try {
    const response = await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), data);
    return response;
  } catch (error) {
    console.error("Error creating item:", error);
    throw new Error("Failed to create item");
  }
}

// Fetch Items
async function fetchItems() {
  try {
    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("$createdAt"),
    ]);

    return response.documents;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw new Error("Failed to fetch items");
  }
}

// POST API → Create an Item
export async function POST(req: Request) {
  try {
    const { name, description, tags, price, image, rating, inventory, distributor } = await req.json();

    // Default values if fields are missing
    const newItem = await createItem({
      name: name || "UnNammed",
      description: description || [],
      tags: tags || [],
      price: price ?? null,
      image: image || [],
      rating: rating ?? null,
      inventory: inventory ?? 1,
      distributor: distributor || [],
    });

    return NextResponse.json({ message: "Item created", item: newItem });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
  }
}

// GET API → Fetch all Items
export async function GET() {
  try {
    const items = await fetchItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}
