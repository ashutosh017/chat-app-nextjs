import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@/app/config/constants";
export async function POST(req:NextRequest){

    try {
        console.log("post req received")
        const body = await req.json();
        const {token} = body;
        const verified =  jwt.verify(token,JWT_SECRET);
        console.log("verified: ",verified);
        if(!verified){
            throw new Error('invalid user')
        }
        return NextResponse.json({
            verified
        })

        
    } catch (error) {
        
    }
}