import db from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function getUsers(from:string,to:string){
    try {
        const users = await db.user.findMany({
            where: {
              username: { in: [from, to] },
            },
          });
          const fromUser = users.find((user) => user.username === from);
          const toUser = users.find((user) => user.username === to);
          if (!fromUser || !toUser) {
            console.log("One or both users do not exist.");
            return null;
          }
          return {fromUser,toUser};
    } catch (error) {
        console.error("Error fetching users:", error);
        return null;
    }
}

export async function POST(req:NextRequest){
    const body = await req.json();
    const {from,to,message} = body;
       if (!from || !to) return;
    try {
        const users = await getUsers(from,to);

    if (!users) {
        return NextResponse.json(
          { msg: "One or both users do not exist." },
          { status: 404 }
        );
      }
        const {fromUser,toUser} = users;
      await db.message.create({
        data: {
          from: { connect: { id: fromUser.id } },
          to: { connect: { id: toUser.id } },
          fromUsername: fromUser.username,
          toUsername: toUser.username,
          content: message,
        },
      });
      return NextResponse.json({
        msg:"message sent successfully"
      },{
        status:200
      })
    } catch (error) {
      console.error("Error sending message:", error);
    }
}