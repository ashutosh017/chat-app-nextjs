import bcrypt from 'bcrypt';
import db from '@/db';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@/app/config/constants';

export async function POST(req: NextRequest ) {
    const { username, password } = await req.json();
    if (!username || !password) {
      return Response.json({msg:"either username or password is empty"});
    }
    try {
        const user = await db.user.findUnique({
            where:{
                username
            }
        })
        if(!user){
            return Response.json({msg:"user does not exist"})
        }

        const decode = await bcrypt.compare(password,user.password);
        if(!decode){
            return Response.json({msg:"Invalid creds"},{status:404})
        }
        const token = jwt.sign(user.username,JWT_SECRET)

      return Response.json({msg:"user signed in successfully",token},{status:200})
    } catch (error) {
      console.log(error)
      return Response.json({"error: ":"username must be unique"})
    }

}