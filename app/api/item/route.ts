import client from "../appwrite_client";
import { Databases, ID } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_item_ID as string;
const COLLECTION_ID = "67ae0050001a3d324128"; // Updated collection ID

console.log("Item Collection ID:", COLLECTION_ID);

if (!DATABASE_ID || !COLLECTION_ID) {
  throw new Error("Missing Appwrite Database or Collection ID in environment variables.");
}

// Updated ItemType interface
interface ItemType {
  name: string;
  description: string[];
  tags: string[]; // enum array
  image: string[]; // URL array
  rating: number;
  distributor: string[];
  inventory: number[];
  price: number[];
}

// Fetch all items
async function fetchItems() {
  try {
    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID);
    return response.documents;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw new Error("Failed to fetch items");
  }
}

// Create a new item
async function createItem(data: ItemType) {
  try {
    const response = await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), data);
    return response;
  } catch (error) {
    console.error("Error creating item:", error);
    throw new Error("Failed to create item");
  }
}

// GET API Route - Fetch all items
export async function GET() {
  try {
    const items = await fetchItems();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

// POST API Route - Create a new item with updated default values
export async function POST(req: Request) {
  try {
    const { name, description, tags, price, image, rating, inventory, distributor } = await req.json();

    const newItem: ItemType = {
      name: name || "UnNammed",
      description: description || [],
      tags: tags || [],
      image: image || [],
      rating: rating || 0,
      distributor: distributor || [],
      inventory: inventory || [0],
      price: price || [0],
    };

    const response = await createItem(newItem);
    return NextResponse.json({ message: "Item created", item: response });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
  }
}