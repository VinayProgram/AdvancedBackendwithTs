export interface CreateVendor{
    name:string;
    ownername:string;
    foodtype:[string];
    pincode:string;
    address:string;
    phone:string;
    email:string;
    password:string;
    image:string
}

export interface Vendorlogin{
    email:string,
    password:string
}

export interface VendorPayload{
    _id:string,
    email:string,
    name:string;
    foodtypes:[string]
}


export interface EditVendor{
    name:string;
    ownername:string;
    foodtype:[string];
    pincode:string;
    address:string;
    phone:string;
    image:string
}