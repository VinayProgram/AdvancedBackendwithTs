import bcrypt from 'bcrypt'

export const generatesalt=async()=>{
    return await bcrypt.genSalt()
}

export async function generatepassword(password:string,salt:string) {
    return await bcrypt.hash(password,salt)
}

export async function compare(settedpassword:string,password:string,salt:string) {
   let p= await generatepassword(password,salt)
   if(p==settedpassword){
    return true 
   }
   else{
    return false
   }
}