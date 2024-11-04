import db from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const users = await db.user.findMany({
            select: {
                username: true // Select only the 'username' field
            }
        });
        
        return NextResponse.json(users); // Respond with the usernames

    } catch (error) {
        console.error("Error fetching usernames:", error);
        return NextResponse.json({ error: "Failed to fetch usernames" }, { status: 500 });
    }
}
