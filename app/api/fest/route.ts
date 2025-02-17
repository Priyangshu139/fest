import client from "@/lib/appwrite_client";
import { Databases, ID } from "appwrite";
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

// Fetch all fests
async function fetchFests() {
  try {
    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID);
    return response.documents;
  } catch (error) {
    console.error("Error fetching fests:", error);
    throw new Error("Failed to fetch fests");
  }
}

// Create a new fest (No required fields)
async function createFest(data: FestType) {
  try {
    const response = await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), data);
    return response;
  } catch (error) {
    console.error("Error creating fest:", error);
    throw new Error("Failed to create fest");
  }
}

// GET API Route - Fetch all fests
export async function GET() {
  try {
    const fests = await fetchFests();
    return NextResponse.json(fests);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch fests" }, { status: 500 });
  }
}

// POST API Route - Create a new fest
export async function POST(req: Request) {
  try {
    const { name, description, image, date } = await req.json();

    const newFest: FestType = {
      name,
      description,
      image: image || [],
      date,
    };

    const response = await createFest(newFest);
    return NextResponse.json({ message: "Fest created", fest: response });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create fest" }, { status: 500 });
  }
}
