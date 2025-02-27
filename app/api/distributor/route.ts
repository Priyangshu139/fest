import client from "../appwrite_client";
import { Databases, ID } from "appwrite";
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
  name?: string;
  mobile?: string; // Ensure mobile is a string
  address?: string;
}

// Fetch all distributors
async function fetchDistributors() {
  try {
    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID);
    return response.documents;
  } catch (error) {
    console.error("Error fetching distributors:", error);
    throw new Error("Failed to fetch distributors");
  }
}

// Create a new distributor
async function createDistributor(data: DistributorType) {
  try {
    const response = await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      ...data,
      mobile: String(data.mobile), // Ensure mobile is stored as a string
    });
    return response;
  } catch (error) {
    console.error("Error creating distributor:", error);
    throw new Error("Failed to create distributor");
  }
}

// GET API Route - Fetch all distributors
export async function GET() {
  try {
    const distributors = await fetchDistributors();
    return NextResponse.json(distributors);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch distributors" }, { status: 500 });
  }
}

// POST API Route - Create a new distributor
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const newDistributor: DistributorType = {
      name: data.name || '',
      mobile: data.mobile ? String(data.mobile) : '',
      address: data.address || ''
    };

    const response = await createDistributor(newDistributor);
    return NextResponse.json({ message: "Distributor created", distributor: response });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create distributor" }, { status: 500 });
  }
}
