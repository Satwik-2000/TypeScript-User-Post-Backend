import { MiddlewareFn } from "type-graphql"
import {verify} from 'jsonwebtoken'
import { MyContext } from "./MyContext"

// User must send a header called authorization of the format:
// bearer [TOKEN] 
// bearer uwitfiuegdkjguiwfd

export const isAuth: MiddlewareFn<MyContext> = ({context}, next) => {
        const authorization = context.req.headers['authorization'];

        if(!authorization){
            throw new Error('Not Authenticated');
        }

        try{
            const token = authorization.split(' ')[1];
            const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
            context.payload = payload as any;
        } catch(err){
            console.log(err)
            throw new Error("Not Authenticated");
        }

        return next()
    }