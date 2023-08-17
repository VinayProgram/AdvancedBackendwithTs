import { Request,Response,NextFunction } from "express";
import {validatesignature} from '../util/index'
import {Authpayload} from '../dto/index'


declare global{
    namespace Express{
        interface Request{
            user?:Authpayload
        }
    }
}


export const Validate=async(req:Request,res:Response,next:NextFunction)=>{
await validatesignature(req)
if(req.user){
next()
}
else{
    res.json("Not a valid user")
}
}