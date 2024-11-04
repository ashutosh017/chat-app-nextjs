import db from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        const body = await req.json();
        const {username} = body;
        const user = await db.user.findFirst({
          where: {
            username,
          },
        });
        return NextResponse.json({
            user
        },{status:200})

      } catch (error) {
        console.log(error);
      } 
}