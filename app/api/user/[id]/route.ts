import client from "../../appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_item_ID as string;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID as string;

console.log("User Collection ID:", COLLECTION_ID);

if (!DATABASE_ID || !COLLECTION_ID) {
  throw new Error("Missing Appwrite Database or Collection ID in environment variables.");
}

// Define UserType
interface UserType {
  name: string;
  mobile: string;
  password: string;
}

// Fetch a specific user
async function fetchUser(id: string) {
  try {
    const user = await database.getDocument(DATABASE_ID, COLLECTION_ID, id);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
}

// Delete a specific user
async function deleteUser(id: string) {
  try {
    await database.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
}

// Update a specific user
async function updateUser(id: string, data: Partial<UserType>) {
  try {
    const response = await database.updateDocument(DATABASE_ID, COLLECTION_ID, id, data);
    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}

// Extract ID from URL (Fix for Next.js API Routes)
function getIdFromUrl(req: Request): string {
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  return parts[parts.length - 1]; // Extract ID from URL
}

// GET API Route - Fetch a specific user
export async function GET(req: Request) {
  try {
    const id = getIdFromUrl(req);
    const user = await fetchUser(id);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

// DELETE API Route - Delete a specific user
export async function DELETE(req: Request) {
  try {
    const id = getIdFromUrl(req);
    await deleteUser(id);
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}

// PUT API Route - Update a specific user
export async function PUT(req: Request) {
  try {
    const id = getIdFromUrl(req);
    const { name, mobile, password } = await req.json();

    const updatedData: Partial<UserType> = {
      name,
      mobile,
      password,
    };

    const updatedUser = await updateUser(id, updatedData);
    return NextResponse.json({ message: "User updated", user: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}