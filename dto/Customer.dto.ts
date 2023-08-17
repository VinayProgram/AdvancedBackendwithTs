export interface CreateCustomer{
    Firstname:string;
    Lastname:string;
    Phonenumber:string;
    pincode:string;
    address:string;
    email:string;
    password:string;
}

export interface CustomerPayload{
    _id:string,
    email:string,
    Phonenumber:string,
    verified:Boolean;
}