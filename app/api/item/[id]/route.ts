import client from "../../appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

// Environment Variables
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_item_ID as string;
const COLLECTION_ID = "67ae0050001a3d324128"; // Updated collection ID

console.log("Item Collection ID:", COLLECTION_ID);

if (!DATABASE_ID || !COLLECTION_ID) {
  throw new Error("Missing Appwrite Database or Collection ID in environment variables.");
}

// Updated ItemType interface with optional fields
interface ItemType {
  name?: string;
  description?: string[];
  tags?: string[]; // enum array
  image?: string[]; // URL array
  rating?: number;
  distributor?: string[];
  inventory?: number[];
  price?: number[];
}

// Fetch a specific item
async function fetchItem(id: string) {
  try {
    const item = await database.getDocument(DATABASE_ID, COLLECTION_ID, id);
    return item;
  } catch (error) {
    console.error("Error fetching item:", error);
    throw new Error("Failed to fetch item");
  }
}

// Delete a specific item
async function deleteItem(id: string) {
  try {
    await database.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    return { success: true };
  } catch (error) {
    console.error("Error deleting item:", error);
    throw new Error("Failed to delete item");
  }
}

// Update a specific item
async function updateItem(id: string, data: Partial<ItemType>) {
  try {
    const response = await database.updateDocument(DATABASE_ID, COLLECTION_ID, id, data);
    return response;
  } catch (error) {
    console.error("Error updating item:", error);
    throw new Error("Failed to update item");
  }
}

// Extract ID from URL (Fix for Next.js API Routes)
function getIdFromUrl(req: Request): string {
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  return parts[parts.length - 1]; // Extract ID from URL
}

// GET API Route - Fetch a specific item
export async function GET(req: Request) {
  try {
    const id = getIdFromUrl(req);
    const item = await fetchItem(id);
    return NextResponse.json({ item });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch item" }, { status: 500 });
  }
}

// DELETE API Route - Delete a specific item
export async function DELETE(req: Request) {
  try {
    const id = getIdFromUrl(req);
    await deleteItem(id);
    return NextResponse.json({ message: "Item deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}

// Updated PUT API Route
export async function PUT(req: Request) {
  try {
    const id = getIdFromUrl(req);
    const { name, description, tags, price, image, rating, inventory, distributor } = await req.json();

    const updatedData: Partial<ItemType> = {
      ...(name !== undefined && { name }),
      ...(description !== undefined && { description }),
      ...(tags !== undefined && { tags }),
      ...(price !== undefined && { price }),
      ...(image !== undefined && { image }),
      ...(rating !== undefined && { rating }),
      ...(inventory !== undefined && { inventory }),
      ...(distributor !== undefined && { distributor }),
    };

    const updatedItem = await updateItem(id, updatedData);
    return NextResponse.json({ message: "Item updated", item: updatedItem });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}
