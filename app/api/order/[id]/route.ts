import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_item_ID as string;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ORDER_COLLECTION_ID as string;

console.log("Order Collection ID:", COLLECTION_ID);

if (!DATABASE_ID || !COLLECTION_ID) {
  throw new Error("Missing Appwrite Database or Collection ID in environment variables.");
}

// Define OrderType
interface OrderType {
  user: string;
  delivery: string;
  payment: string;
  address: string;
  distributor: string;
  quantity: string[];
}

// Fetch a specific order
async function fetchOrder(id: string) {
  try {
    const order = await database.getDocument(DATABASE_ID, COLLECTION_ID, id);
    return order;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw new Error("Failed to fetch order");
  }
}

// Delete a specific order
async function deleteOrder(id: string) {
  try {
    await database.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    return { success: true };
  } catch (error) {
    console.error("Error deleting order:", error);
    throw new Error("Failed to delete order");
  }
}

// Update a specific order
async function updateOrder(id: string, data: Partial<OrderType>) {
  try {
    const response = await database.updateDocument(DATABASE_ID, COLLECTION_ID, id, data);
    return response;
  } catch (error) {
    console.error("Error updating order:", error);
    throw new Error("Failed to update order");
  }
}

// Extract ID from URL (Fix for Next.js API Routes)
function getIdFromUrl(req: Request): string {
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  return parts[parts.length - 1]; // Extract ID from URL
}

// GET API Route - Fetch a specific order
export async function GET(req: Request) {
  try {
    const id = getIdFromUrl(req);
    const order = await fetchOrder(id);
    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}

// DELETE API Route - Delete a specific order
export async function DELETE(req: Request) {
  try {
    const id = getIdFromUrl(req);
    await deleteOrder(id);
    return NextResponse.json({ message: "Order deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}

// PUT API Route - Update a specific order
export async function PUT(req: Request) {
  try {
    const id = getIdFromUrl(req);
    const { user, delivery, payment, address, distributor, quantity } = await req.json();

    const updatedData: Partial<OrderType> = {
      user,
      delivery: delivery || "pending",
      payment: payment || "paid",
      address,
      distributor,
      quantity: quantity || [],
    };

    const updatedOrder = await updateOrder(id, updatedData);
    return NextResponse.json({ message: "Order updated", order: updatedOrder });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}