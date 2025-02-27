import client from "../../appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_item_ID as string;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CART_COLLECTION_ID as string;

console.log("Cart Collection ID:", COLLECTION_ID);

if (!DATABASE_ID || !COLLECTION_ID) {
  throw new Error("Missing Appwrite Database or Collection ID in environment variables.");
}

// Define CartItemType
interface CartItemType {
  user_id: string;
  pack: string[];
  item: string[];
  total: number;
  quantity: string[];
}

// Fetch a specific cart item
async function fetchCartItem(id: string) {
  try {
    const cartItem = await database.getDocument(DATABASE_ID, COLLECTION_ID, id);
    return cartItem;
  } catch (error) {
    console.error("Error fetching cart item:", error);
    throw new Error("Failed to fetch cart item");
  }
}

// Delete a specific cart item
async function deleteCartItem(id: string) {
  try {
    await database.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    return { success: true };
  } catch (error) {
    console.error("Error deleting cart item:", error);
    throw new Error("Failed to delete cart item");
  }
}

// Update a specific cart item
async function updateCartItem(id: string, data: Partial<CartItemType>) {
  try {
    const response = await database.updateDocument(DATABASE_ID, COLLECTION_ID, id, data);
    return response;
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw new Error("Failed to update cart item");
  }
}

// Extract ID from URL (Fix for Next.js API Routes)
function getIdFromUrl(req: Request): string {
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  return parts[parts.length - 1]; // Extract ID from URL
}

// GET API Route - Fetch a specific cart item
export async function GET(req: Request) {
  try {
    const id = getIdFromUrl(req);
    const cartItem = await fetchCartItem(id);
    return NextResponse.json({ cartItem });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cart item" }, { status: 500 });
  }
}

// DELETE API Route - Delete a specific cart item
export async function DELETE(req: Request) {
  try {
    const id = getIdFromUrl(req);
    await deleteCartItem(id);
    return NextResponse.json({ message: "Cart item deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete cart item" }, { status: 500 });
  }
}

// PUT API Route - Update a specific cart item
export async function PUT(req: Request) {
  try {
    const id = getIdFromUrl(req);
    const { user_id, pack, item, total, quantity } = await req.json();

    const updatedData: Partial<CartItemType> = {
      user_id,
      pack: pack || [],
      item: item || [],
      total,
      quantity: quantity || [],
    };

    const updatedCartItem = await updateCartItem(id, updatedData);
    return NextResponse.json({ message: "Cart item updated", cartItem: updatedCartItem });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update cart item" }, { status: 500 });
  }
}