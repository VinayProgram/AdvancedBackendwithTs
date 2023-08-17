import mongoose,{Schema,Document,model}from 'mongoose'


interface VendorCreationdoc extends Document{
    name:string;
    ownername:string;
    foodtype:[string];
    pincode:string;
    address:string;
    phone:string;
    email:string;
    password:string;
    salt:string;
    serviceAvailable:string;
    coverImage:string;
    rating:number;
    foods:any
}

interface VendorAddfood extends Document{
 name:string
 category:string,
 description:string,
 foodtype:string,
 price:number
 vendorid:string
 rating:string
 images:[string]
}

const VandorScema=new Schema({
    name:{type:String,required:true},
    ownername:{type:String,required:true},
    foodtype:{type:[String]},
    pincode:{type:String},
    address:{type:String},
    phone:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    salt:{type:String,required:true},
    serviceAvailable:{type:String,required:true},
    coverImage:{type:[String]},
    rating:{type:Number},
    foods:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'vendorfoods'
    },{
        timestamps:true
    }]
},{
    toJSON:{
        transform(doc,ret){
            delete ret.password,
            delete ret.salt,
            delete ret._v,
            delete ret.createdAt,
            delete ret.updateAt  
        }
    }
})

const VendorFoodaddin=new Schema({
    name:{type:String,required:true},
    category:{type:String,required:true},
    description:{type:String,required:true},
    foodtype:{type:String,required:true},
    price:{type:Number,required:true},
    vendorid:{type:String,required:true},
    rating:{type:String,required:true},
    images:{type:[String]}
},{
    toJSON:{
        transform(doc,ret){
            delete ret._v
            delete ret.createdAt,
            delete ret.updateAt
        }
    },
    timestamps:true
})

export const VendorFood=mongoose.model<VendorAddfood>('vendorfoods',VendorFoodaddin)

export const Vendor = mongoose.model<VendorCreationdoc>('vendor',VandorScema)