import jwt, { sign } from 'jsonwebtoken'
import {Authpayload} from '../dto/index'
import { Request } from 'express';

export const gettoken =async (payload:Authpayload) => {
const token=jwt.sign(payload,'This@$ecret12',{expiresIn:'1d'});
return token
}

export const validatesignature=async(req:Request)=>{
    let auth=req.header('auth');
    console.log(auth)
    if(auth)
    {
    try{
        const checkinginf=await jwt.verify(auth,'This@$ecret12') as Authpayload
        if(checkinginf){
        req.user=checkinginf
        return true
        }
        else{
            return false
        }
    }
    catch(error){
        return false
    }
}
}