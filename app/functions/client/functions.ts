import { JWT_SECRET } from '@/app/config/constants'
import db from '@/db';
import axios from 'axios';
import jwt from 'jsonwebtoken'

export async function signIn(username:string,password:string){
    try {
        const response = await axios.post('/api/signin', { username, password });
        console.log(response)
        const token = response.data.token;
        localStorage.setItem('token',token);
      } catch (err: any) {
        console.log(err)
        return err;
      }
}


export async function getAllMessages(username:string){
    try{
        const messages = await db.message.findMany({
            where:{
                to:username
            }
    
        })
        return messages;
    }catch(err){
        throw new Error('error in fetching messages')
    }

}

export async function sendMessage(from:string, to:string, message:string){
    try {
        const send = await db.message.create({
            data:{
                from,to,message
            }
        })
        return send;
    } catch (error) {
        throw new Error('error in sending message')
    }
}

