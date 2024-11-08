import db from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "../message/route";

export async function POST(req:NextRequest){
    try{
        console.log("post req rec")
        const body = await req.json();
        const {from,to} = body;
        const users = await getUsers(from,to);
        if(!users){
            return NextResponse.json({
                msg:"users not provided"
            },{status:404})
        }
        const {fromUser,toUser} = users;
        const msgs = await db.message.findMany({
            where:{
                OR:[
                    {
                        from:fromUser,to:toUser
                    },
                    {
                        from:toUser, to:fromUser
                    }
                ]
            },
            orderBy:{
                timestamp:"asc"
            }
        })
        console.log("messages: ",msgs);
        return NextResponse.json({
            msgs
        },{status:200})
    }catch(e){
        
    }
}