import { Request, Response, NextFunction } from 'express'
import { CreateCustomer } from '../dto/index'
import { CreateNewCustomer} from '../models/index'
import {generatesalt,generatepassword,generateNotification,sendotp,gettoken,compare} from '../util/index'

export const CreatePerson=async(req:Request,res:Response)=>{

    let {Firstname,Lastname,Phonenumber,address,email,password,pincode}=<CreateCustomer>req.body
    let crypsalt=await generatesalt()
    let crpassword=await generatepassword(password,crypsalt)
    let checking=await CreateNewCustomer.find({Phonenumber:Phonenumber})    
console.log(checking)
    if(!checking){return res.json('Already a user please login')}

    const {otp,expiry}=generateNotification()
    let Create=await CreateNewCustomer.create({
        Firstname:Firstname,
        Lastname:Lastname,
        Phonenumber:Phonenumber,
        address:address,
        email:email,
        password:crpassword,
        salt:crypsalt,
        pincode:pincode,
        verified:false,
        otp:otp,
        otpExpiry:expiry,
        lat:0,
        long:0
    })

    if(Create){
       let verify=await sendotp(otp,Phonenumber)
        let token= await gettoken({
                _id:Create._id,
                email:Create.email,
                Phonenumber:Create.Phonenumber,
                verified:Create.verified
            })
            if(token){res.json(token)}
            else{res.json('Failed')}
            
        }

 }

export const VerifyCustomer=async(req:Request,res:Response)=>{
 const {otp}=req.body
 const user=req.user
 console.log(otp)
 if(user){
    const profile=await CreateNewCustomer.findById(user._id)
    if(profile){
    if(profile?.otp==otp){
        profile.verified=true
        var updatedResponse=await profile.save()
        if(updatedResponse){
        const signature=await gettoken({
            _id:profile._id,
            email:profile.email,
            Phonenumber:profile.Phonenumber,
            verified:profile.verified
        })
        res.json(signature)
        }
    }
    else{
        res.json('invalid otp')
    }
}
 }
 else{
    res.json('Not authorized')
 }
}


export const customerLogin=async(req:Request,res:Response)=>{
const {phonenumber,password}=req.body
let profile=await CreateNewCustomer.findOne({Phonenumber:phonenumber})
if(profile){
let check=await compare(profile.password,password,profile.salt)
    if(check&&profile.verified){
        const signature=await gettoken({
            _id:profile._id,
            email:profile.email,
            Phonenumber:profile.Phonenumber,
            verified:profile.verified
        })
        res.json(signature)
    }
    else{
        res.json('profile not verified or profile not found')
    }
}
else{
    res.json('profile not found')
}
}