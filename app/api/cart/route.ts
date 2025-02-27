import client from "../appwrite_client";
import { Databases, ID } from "appwrite";
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

// Fetch all cart items
async function fetchCartItems() {
    try {
        const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID);
        return response.documents;
    } catch (error) {
        console.error("Error fetching cart items:", error);
        throw new Error("Failed to fetch cart items");
    }
}

// Create a new cart item
async function createCartItem(data: CartItemType) {
    try {
        const response = await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), data);
        return response;
    } catch (error) {
        console.error("Error creating cart item:", error);
        throw new Error("Failed to create cart item");
    }
}

// GET API Route - Fetch all cart items
export async function GET() {
    try {
        const cartItems = await fetchCartItems();
        return NextResponse.json(cartItems);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch cart items" }, { status: 500 });
    }
}

// POST API Route - Create a new cart item
export async function POST(req: Request) {
    try {
        const { user_id, pack, item, total, quantity } = await req.json();

        if (!user_id || !pack || !item || total === undefined || !quantity) {
            return NextResponse.json({ error: "User ID, Pack, Item, Total, and Quantity are required" }, { status: 400 });
        }

        const newCartItem: CartItemType = {
            user_id,
            pack,
            item,
            total,
            quantity,
        };

        const response = await createCartItem(newCartItem);
        return NextResponse.json({ message: "Cart item created", cartItem: response });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create cart item" }, { status: 500 });
    }
}