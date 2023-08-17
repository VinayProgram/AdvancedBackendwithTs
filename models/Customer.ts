import mongoose,{Schema,Document,model}from 'mongoose'

interface Customer extends Document{
    Firstname:string;
    Lastname:string;
    Phonenumber:string;
    pincode:string;
    address:string;
    email:string;
    password:string;
    salt:string,
    verified:boolean,
    otp:number,
    otpExpiry:Date,
    lat:number,
    long:number
}

const CreateCustomer=new Schema({
    Firstname:{type:String,Required:true}, 
    Lastname:{type:String,Required:true},
    Phonenumber:{type:String,Required:true},
    pincode:{type:String,Required:true},
    address:{type:String,Required:true},
    email:{type:String,Required:true},
    password:{type:String,Required:true},
    salt:{type:String,Required:true},
    verified:{type:Boolean,Required:true},
    otp:{type:Number,Required:true},
    otpExpiry:{type:Date,Required:true},
    lat:{type:Number},
    long:{type:Number}
})

export const CreateNewCustomer=mongoose.model<Customer>('Customers',CreateCustomer)