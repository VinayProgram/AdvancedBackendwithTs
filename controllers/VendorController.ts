import { Request, Response, NextFunction } from 'express'
import { Vendorlogin, EditVendor, Addfood } from '../dto/index'
import { findvendor } from './index'
import { compare, gettoken } from '../util/index'
import { VendorFood } from '../models/index'

export const vendorlogin = async (req: Request, res: Response) => {
    let { email, password } = <Vendorlogin>req.body;
    const data = await findvendor('', email.toLowerCase())
    if (!data) { return res.json('no such user') }
    let p = await compare(data.password, password, data.salt)
    if (p) {
        let signature = await gettoken({
            _id: data._id,
            email: data.email,
            name: data.name,
            foodtypes: data.foodtype
        })

        return res.json(signature)
    }
    else {
        return res.json('Failed')
    }
}

export const showprofile = async (req: Request, res: Response) => {
    let user = req.user
    let inf = await findvendor(user?._id)
    if (inf) {
        return res.json(inf)
    }
    else {
        return res.json('not valid user')
    }
}


export const updateprofile = async (req: Request, res: Response) => {
    let user = req.user
    let inf = await findvendor(user?._id)
    let { name, address, foodtype, ownername, phone, pincode} = <EditVendor>req.body
    let images=req.file
    let image=images?.filename
    if (inf != null) {
        inf.name = name
        inf.address = address
        inf.foodtype = foodtype
        inf.ownername = ownername
        inf.phone = phone
        inf.pincode = pincode
        inf.coverImage = image !== undefined ? image : ""
        let saveddetails = await inf.save()
        res.json(saveddetails)
    }
    else {
        return res.json('not valid user')
    }
}


export const CreateFood = async (req: Request, res: Response) => {
    console.log('start')
    let user = req.user
    console.log(user)
    if (user) {
        const inf = await findvendor(user?._id)
        let venderid = inf?.email
        let { name, category, description, foodtype, price, rating } = <Addfood>req.body
        
        let getimage=req.files as [Express.Multer.File]
        let image=getimage.map((e)=>e.filename)
        
        if (inf !== null) {
            let food = await VendorFood.create({
                name: name,
                category: category,
                description: description,
                foodtype: foodtype,
                images: image,
                price: price,
                vendorid: venderid,
                rating: rating,
            });
            inf?.foods.push(food)
            let result = await inf?.save()
            res.json(result)
        }
    }
}

export const getallfoods = async (req: Request, res: Response) => {
    let user = req.user
    if (user) {
        let foodget = await VendorFood.find({ vendorid: user.email })
        res.json(foodget)
    }
}