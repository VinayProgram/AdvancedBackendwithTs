import { Request, Response, NextFunction} from 'express'
import { Vendor } from '../models/index'

export const getfoodbyavailblity=async(req:Request,res:Response)=>{
 const pincode=req.params.pincode
 let result=await Vendor.find({pincode:pincode,serviceAvailable:true}).sort({'rating':'ascending'}).populate({ path: 'foods', options: { strictPopulate: false } })
    res.json(result)
}

export const GetTopHotels=async(req:Request,res:Response)=>{
    const pincode=req.params.pincode
 let result=await Vendor.find({pincode:pincode,serviceAvailable:true}).sort({'rating':'descending'})
 res.json(result)
}