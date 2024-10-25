import bcrypt from 'bcrypt';
import db from '@/db';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest ) {
    const { username, password } = await req.json();
    if (!username || !password) {
      return Response.json({msg:"either username or password is empty"});
    }
    try {
      const hashedPass = await bcrypt.hash(password, 10);

      const user = await db.user.create({
        data: {
          username,
          password: hashedPass,
        },
      });
      return Response.json({msg:"user created successfully"},{status:200})
    } catch (error) {
      console.log(error)
      return Response.json({"error: ":"username must be unique"})
    }

}

