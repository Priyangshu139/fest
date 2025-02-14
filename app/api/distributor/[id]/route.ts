import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_item_ID as string;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_DISTRIBUTOR_COLLECTION_ID as string;

console.log("Distributor Collection ID:", COLLECTION_ID);

if (!DATABASE_ID || !COLLECTION_ID) {
  throw new Error("Missing Appwrite Database or Collection ID in environment variables.");
}

// Define DistributorType
interface DistributorType {
  name: string;
  mobile: string; // Mobile stored as string
  items: string[];
  orders: string[];
}

// Fetch a specific distributor
async function fetchDistributor(id: string) {
  try {
    const distributor = await database.getDocument(DATABASE_ID, COLLECTION_ID, id);
    return distributor;
  } catch (error) {
    console.error("Error fetching distributor:", error);
    throw new Error("Failed to fetch distributor");
  }
}

// Delete a specific distributor
async function deleteDistributor(id: string) {
  try {
    await database.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    return { success: true };
  } catch (error) {
    console.error("Error deleting distributor:", error);
    throw new Error("Failed to delete distributor");
  }
}

// Update a specific distributor
async function updateDistributor(id: string, data: Partial<DistributorType>) {
  try {
    const response = await database.updateDocument(DATABASE_ID, COLLECTION_ID, id, data);
    return response;
  } catch (error) {
    console.error("Error updating distributor:", error);
    throw new Error("Failed to update distributor");
  }
}

// Extract ID from URL (Fix for Next.js API Routes)
function getIdFromUrl(req: Request): string {
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  return parts[parts.length - 1]; // Extract ID from URL
}

// GET API Route - Fetch a specific distributor
export async function GET(req: Request) {
  try {
    const id = getIdFromUrl(req);
    const distributor = await fetchDistributor(id);
    return NextResponse.json({ distributor });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch distributor" }, { status: 500 });
  }
}

// DELETE API Route - Delete a specific distributor
export async function DELETE(req: Request) {
  try {
    const id = getIdFromUrl(req);
    await deleteDistributor(id);
    return NextResponse.json({ message: "Distributor deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete distributor" }, { status: 500 });
  }
}

// PUT API Route - Update a specific distributor
export async function PUT(req: Request) {
  try {
    const id = getIdFromUrl(req);
    const { name, mobile, items, orders } = await req.json();

    const updatedData: Partial<DistributorType> = {
      name,
      mobile: String(mobile), // Ensure mobile is stored as a string
      items: items || [],
      orders: orders || [],
    };

    const updatedDistributor = await updateDistributor(id, updatedData);
    return NextResponse.json({ message: "Distributor updated", distributor: updatedDistributor });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update distributor" }, { status: 500 });
  }
}
