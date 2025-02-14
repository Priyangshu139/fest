import client from "@/lib/appwrite_client";
import { Databases, ID } from "appwrite";
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
  order_IDs: string[];
  mobile: string; // Changed from number to string
}

// Fetch all users
async function fetchUsers() {
  try {
    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID);
    return response.documents;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}

// Create a new user
async function createUser(data: UserType) {
  try {
    const response = await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      ...data,
      mobile: String(data.mobile), // Ensure mobile is stored as a string
    });
    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}

// GET API Route - Fetch all users
export async function GET() {
  try {
    const users = await fetchUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST API Route - Create a new user
export async function POST(req: Request) {
  try {
    const { name, order_IDs, mobile } = await req.json();

    if (!name || !mobile) {
      return NextResponse.json({ error: "Name and Mobile are required" }, { status: 400 });
    }

    const newUser: UserType = {
      name,
      order_IDs: order_IDs || [],
      mobile: String(mobile), // Ensure mobile is stored as a string
    };

    const response = await createUser(newUser);
    return NextResponse.json({ message: "User created", user: response });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
