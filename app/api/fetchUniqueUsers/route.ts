import db from "@/db";
import { NextRequest, NextResponse } from "next/server";



async function getUniqueSendersForUser(username: string) {
    const user = await db.user.findUnique({where:{
        username:username
    },
    select:{
        id:true,
        username:true
    }
})
    console.log("finding unique users for: ",user);
  const uniqueSenders = await db.message.findMany({
    where: {
      toId: user?.id,
    },
    select: {
    //   from: {
    //     select: {
    //       id: true,
    //       username: true,
    //     },
    //   },
    fromUsername:true,
    fromId:true,
    toUsername:true,
    toId:true
    },
    distinct: ['fromId'],  
  });
  console.log("list of unique users: ",uniqueSenders);
//   return NextResponse.json(uniqueSenders)
return uniqueSenders;
}


export async function POST(req:NextRequest){
    try {
        const body = await req.json();
        const {username} = body;
        const uniqueSenders = await getUniqueSendersForUser(username);
        return NextResponse.json(uniqueSenders)

    } catch (error) {
        console.log(error);
    }
}