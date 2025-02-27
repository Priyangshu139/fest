import client from "../appwrite_client";
import { Databases, ID } from "appwrite";
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
  fest?: string;
  price?: number;
  quantity?: number[];
}

// Fetch all packs
async function fetchPacks() {
  try {
    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID);
    return response.documents;
  } catch (error) {
    console.error("Error fetching packs:", error);
    throw new Error("Failed to fetch packs");
  }
}

// Create a new pack (No required fields)
async function createPack(data: PackType) {
  try {
    const response = await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), data);
    return response;
  } catch (error) {
    console.error("Error creating pack:", error);
    throw new Error("Failed to create pack");
  }
}

// GET API Route - Fetch all packs
export async function GET() {
  try {
    const packs = await fetchPacks();
    return NextResponse.json(packs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch packs" }, { status: 500 });
  }
}

// POST API Route - Create a new pack
export async function POST(req: Request) {
  try {
    const { name, description, item, fest, price, quantity } = await req.json();

    const newPack: PackType = {
      name,
      description,
      item: item || [],
      fest,
      price,
      quantity: quantity || [],
    };

    const response = await createPack(newPack);
    return NextResponse.json({ message: "Pack created", pack: response });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create pack" }, { status: 500 });
  }
}
