import  Mongoose  from "mongoose";

export async function connection(){
try {
let connect=await Mongoose.connect("mongodb://0.0.0.0:27017/foodmart")
return connect   
} catch (error) {
    console.log(error)
}
}


