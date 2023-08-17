export const generateNotification=()=>{
    const otp=Math.floor(100000+Math.random()*900000)
    let expiry=new Date()
    expiry.setTime(new Date().getTime()+(30*60*1000))
    return {otp ,expiry}
}

export const sendotp=async(otp:number,phonenumber:String)=>{
const client =require('twilio')('AC22132d9138807ab6c57479b96702293e','24378dbbcecb5d729c3c596e53d54214')
const response=await client.messages.create({
    body: `Your otp is ${otp}`,
    from:'+18146489312',
    to:phonenumber
})

return response
}