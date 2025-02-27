import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const database = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_item_ID as string;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_FEST_COLLECTION_ID as string;

if (!DATABASE_ID || !COLLECTION_ID) {
  throw new Error("Missing Appwrite Database or Collection ID in environment variables.");
}

interface FestType {
  name?: string;
  description?: string;
  image?: string[];
  date?: string;
}

export async function GET(req: NextRequest) {
  try {
   // const url = new URL(req.url);
   // const id = url.pathname.split("/").pop(); // Extract ID from the URL
    const id = req.nextUrl.pathname.split("/").pop();
    
    if (!id) return NextResponse.json({ error: "Invalid fest ID" }, { status: 400 });

    const fest = await database.getDocument(DATABASE_ID, COLLECTION_ID, id);
    return NextResponse.json({ fest });
  } catch (error) {
    console.error("Error fetching fest:", error);
    return NextResponse.json({ error: "Failed to fetch fest" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) return NextResponse.json({ error: "Invalid fest ID" }, { status: 400 });

    await database.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    return NextResponse.json({ message: "Fest deleted" });
  } catch (error) {
    console.error("Error deleting fest:", error);
    return NextResponse.json({ error: "Failed to delete fest" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) return NextResponse.json({ error: "Invalid fest ID" }, { status: 400 });

    const data: Partial<FestType> = await req.json();
    const updatedFest = await database.updateDocument(DATABASE_ID, COLLECTION_ID, id, data);
    return NextResponse.json({ message: "Fest updated", fest: updatedFest });
  } catch (error) {
    console.error("Error updating fest:", error);
    return NextResponse.json({ error: "Failed to update fest" }, { status: 500 });
  }
}
