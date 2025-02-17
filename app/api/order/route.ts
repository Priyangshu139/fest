import client from "@/lib/appwrite_client";
import { Databases, ID } from "appwrite";
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

// Fetch all orders
async function fetchOrders() {
  try {
    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID);
    return response.documents;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}

// Create a new order
async function createOrder(data: OrderType) {
  try {
    const response = await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), data);
    return response;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
}

// GET API Route - Fetch all orders
export async function GET() {
  try {
    const orders = await fetchOrders();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// POST API Route - Create a new order
export async function POST(req: Request) {
  try {
    const { user, delivery, payment, address, distributor, quantity } = await req.json();

    if (!user || !address || !distributor || !quantity) {
      return NextResponse.json({ error: "User, Address, Distributor, and Quantity are required" }, { status: 400 });
    }

    const newOrder: OrderType = {
      user,
      delivery: delivery || "pending",
      payment: payment || "paid",
      address,
      distributor,
      quantity: quantity || [],
    };

    const response = await createOrder(newOrder);
    return NextResponse.json({ message: "Order created", order: response });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}