import { Request, Response, NextFunction } from 'express'
import { CreateVendor } from '../dto/index'
import { Vendor } from '../models/index'
import {generatesalt,generatepassword} from '../util/index'

export const vendorcreate =async (req: Request, res: Response) => {
    const { name, address, email, foodtype, ownername, password, phone, pincode } = <CreateVendor>req.body
    
        let inf=await findvendor('',email.toLowerCase())
        if(inf!=null){
           return res.json('Vendor Exists')
        }

        let salt=await generatesalt()
        let passwordhash=await generatepassword(password,salt)
        let data = new Vendor({
        name: name,
        address: address,
        email: email.toLowerCase(),
        foodtype: foodtype,
        ownername: ownername,
        password: passwordhash,
        phone: phone,
        pincode: pincode,
        salt: salt,
        serviceAvailable: false,
        rating: 0,
        coverImage: [],
    })
    data=await data.save()
    res.json({data})
}

export const getallvendors=async(req: Request, res: Response)=>{
    const vendorcheck=await Vendor.find()
    res.json(vendorcheck)
}


export const getselectedvendors=async(req: Request, res: Response)=>{
    const vendorcheck=await findvendor('',req.params.id.toLowerCase())
    res.json(vendorcheck)
}


export const findvendor=async(id:String|undefined,email?:string)=>{
    if(email){
         const vendorcheck=await Vendor.findOne({email:email.toLowerCase()})
         return vendorcheck
    }
    else if(id!=undefined){
        const vendorcheck=await Vendor.findOne({_id:id})
        return vendorcheck
    }
}