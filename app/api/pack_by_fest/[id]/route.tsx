import client from "../../appwrite_client";
import { Databases, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_item_ID as string;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PACK_COLLECTION_ID as string;

if (!DATABASE_ID || !COLLECTION_ID) {
  throw new Error("Missing Appwrite Database or Collection ID in environment variables.");
}

// Define PackType interface
interface PackType {
  $id: string;
  name?: string;
  description?: string;
  item?: string[];
  fest?: string;
  price?: number;
  quantity?: number[];
  $createdAt: string;
  $updatedAt: string;
}

// Fetch packs by festival string
async function fetchPacksByFestival(festId: string) {
  try {
    const response = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.equal('fest', festId)
      ]
    );
    return response.documents as PackType[];
  } catch (error) {
    console.error("Error fetching packs by festival:", error);
    throw new Error("Failed to fetch packs by festival");
  }
}

// GET route handler
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: festId } = await Promise.resolve(params);
    
    if (!festId) {
      return NextResponse.json(
        { error: "Festival ID is required" },
        { status: 400 }
      );
    }

    const packs = await fetchPacksByFestival(festId);

    return NextResponse.json({
      success: true,
      message: packs.length ? "Packs fetched successfully" : "No packs found for this festival",
      data: packs
    });

  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json(
      { 
        success: false,
        message: "Failed to fetch packs by festival",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}