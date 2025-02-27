import client from "../appwrite_client";
import { Databases, ID } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_item_ID as string;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ITEM_COLLECTION_ID as string;

console.log("Item Collection ID:", COLLECTION_ID);

if (!DATABASE_ID || !COLLECTION_ID) {
  throw new Error("Missing Appwrite Database or Collection ID in environment variables.");
}

// Define ItemType
interface ItemType {
  name: string;
  description: string[];
  tags: string[];
  price: number;
  image: string[];
  rating: number;
  inventory: number;
  distributor: string[];
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

// POST API Route - Create a new item
export async function POST(req: Request) {
  try {
    const { name, description, tags, price, image, rating, inventory, distributor } = await req.json();

    const newItem: ItemType = {
      name: name || "UnNammed",
      description: description || [],
      tags: tags || [],
      price: price || 0,
      image: image || [],
      rating: rating || 0,
      inventory: inventory || 1,
      distributor: distributor || [],
    };

    const response = await createItem(newItem);
    return NextResponse.json({ message: "Item created", item: response });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
  }
}