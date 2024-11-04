import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // Install this via `npm install jsonwebtoken`
import { JWT_SECRET } from "@/app/config/constants";

export async function POST(req: NextRequest) {
  try {
    // Extract the token from the request body
    const { token } = await req.json();

    // Check if the token is provided
    if (!token) {
      return NextResponse.json({ message: "Token is missing" }, { status: 400 });
    }

    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, JWT_SECRET);
    
    console.log("from isUserLoggedIn route, Token successfully verified:", decoded);

    // Return a response indicating the user is logged in
    return NextResponse.json({ message: "User is logged in", user: decoded });
  } catch (err:any) {
    console.error("Error verifying token:", err);

    // Return an appropriate error response
    if (err.name === "TokenExpiredError") {
      return NextResponse.json({ message: "Token has expired" }, { status: 401 });
    } else if (err.name === "JsonWebTokenError") {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    } else {
      return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
  }
}
