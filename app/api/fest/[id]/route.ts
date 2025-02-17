import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_item_ID as string;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_FEST_COLLECTION_ID as string;

console.log("Fest Collection ID:", COLLECTION_ID);

if (!DATABASE_ID || !COLLECTION_ID) {
  throw new Error("Missing Appwrite Database or Collection ID in environment variables.");
}

// Define FestType (All fields optional)
interface FestType {
  name?: string;
  description?: string;
  image?: string[]; // Assuming URL is represented as a string
  date?: string;
}

// Fetch a specific fest
async function fetchFest(id: string) {
  try {
    const fest = await database.getDocument(DATABASE_ID, COLLECTION_ID, id);
    return fest;
  } catch (error) {
    console.error("Error fetching fest:", error);
    throw new Error("Failed to fetch fest");
  }
}

// Delete a specific fest
async function deleteFest(id: string) {
  try {
    await database.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    return { success: true };
  } catch (error) {
    console.error("Error deleting fest:", error);
    throw new Error("Failed to delete fest");
  }
}

// Update a specific fest (No required fields)
async function updateFest(id: string, data: Partial<FestType>) {
  try {
    const response = await database.updateDocument(DATABASE_ID, COLLECTION_ID, id, data);
    return response;
  } catch (error) {
    console.error("Error updating fest:", error);
    throw new Error("Failed to update fest");
  }
}

// Extract ID from URL (Fix for Next.js API Routes)
function getIdFromUrl(req: Request): string {
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  return parts[parts.length - 1]; // Extract ID from URL
}

// GET API Route - Fetch a specific fest
export async function GET(req: Request) {
  try {
    const id = getIdFromUrl(req);
    const fest = await fetchFest(id);
    return NextResponse.json({ fest });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch fest" }, { status: 500 });
  }
}

// DELETE API Route - Delete a specific fest
export async function DELETE(req: Request) {
  try {
    const id = getIdFromUrl(req);
    await deleteFest(id);
    return NextResponse.json({ message: "Fest deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete fest" }, { status: 500 });
  }
}

// PUT API Route - Update a specific fest (No required fields)
export async function PUT(req: Request) {
  try {
    const id = getIdFromUrl(req);
    const { name, description, image, date } = await req.json();

    const updatedData: Partial<FestType> = {
      name,
      description,
      image: image || [],
      date,
    };

    const updatedFest = await updateFest(id, updatedData);
    return NextResponse.json({ message: "Fest updated", fest: updatedFest });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update fest" }, { status: 500 });
  }
}
