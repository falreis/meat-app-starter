import {Request, Response} from 'express'
import { User, users } from './users';
import * as jwt from 'jsonwebtoken'
import { apiConfig } from './api.config';

export const handleAuthentication = (req: Request, resp: Response)=>{
    const user: User = req.body
    if(isValid(user)){
        const dbuser: User = users[user.email]
        const token = jwt.sign({
                sub: dbuser.email,
                iss: 'meat-api',
            }, apiConfig.secret
        )
        resp.json({name: dbuser.name, email: dbuser.email, accessToken: token})
    }
    else{
        resp.status(401).json({message: 'Dados inválidos.'})
    }
}

function isValid(user: User): boolean{
    if(!user)
        return false
    else{
        const dbuser = users[user.email]
        return (dbuser !== undefined && dbuser.matches(user))
    }
}