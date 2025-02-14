import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_item_ID as string;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PACK_COLLECTION_ID as string;

console.log("Pack Collection ID:", COLLECTION_ID);

if (!DATABASE_ID || !COLLECTION_ID) {
  throw new Error("Missing Appwrite Database or Collection ID in environment variables.");
}

// Define PackType (All fields optional)
interface PackType {
  name?: string;
  description?: string;
  item?: string[];
}

// Fetch a specific pack
async function fetchPack(id: string) {
  try {
    const pack = await database.getDocument(DATABASE_ID, COLLECTION_ID, id);
    return pack;
  } catch (error) {
    console.error("Error fetching pack:", error);
    throw new Error("Failed to fetch pack");
  }
}

// Delete a specific pack
async function deletePack(id: string) {
  try {
    await database.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    return { success: true };
  } catch (error) {
    console.error("Error deleting pack:", error);
    throw new Error("Failed to delete pack");
  }
}

// Update a specific pack (No required fields)
async function updatePack(id: string, data: Partial<PackType>) {
  try {
    const response = await database.updateDocument(DATABASE_ID, COLLECTION_ID, id, data);
    return response;
  } catch (error) {
    console.error("Error updating pack:", error);
    throw new Error("Failed to update pack");
  }
}

// Extract ID from URL (Fix for Next.js API Routes)
function getIdFromUrl(req: Request): string {
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  return parts[parts.length - 1]; // Extract ID from URL
}

// GET API Route - Fetch a specific pack
export async function GET(req: Request) {
  try {
    const id = getIdFromUrl(req);
    const pack = await fetchPack(id);
    return NextResponse.json({ pack });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch pack" }, { status: 500 });
  }
}

// DELETE API Route - Delete a specific pack
export async function DELETE(req: Request) {
  try {
    const id = getIdFromUrl(req);
    await deletePack(id);
    return NextResponse.json({ message: "Pack deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete pack" }, { status: 500 });
  }
}

// PUT API Route - Update a specific pack (No required fields)
export async function PUT(req: Request) {
  try {
    const id = getIdFromUrl(req);
    const { name, description, item } = await req.json();

    const updatedData: Partial<PackType> = {
      name,
      description,
      item: item || [],
    };

    const updatedPack = await updatePack(id, updatedData);
    return NextResponse.json({ message: "Pack updated", pack: updatedPack });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update pack" }, { status: 500 });
  }
}
