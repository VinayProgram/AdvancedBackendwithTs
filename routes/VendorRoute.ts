import express,{Request,Response,NextFunction} from 'express'
const router=express.Router()
import {vendorlogin,showprofile,updateprofile,CreateFood,getallfoods} from '../controllers/index'
import {Validate} from '../middleware/index'
import {imageuploading} from '../util/index'




router.post('/login',vendorlogin)
router.use(Validate)
router.post('/profile',showprofile)
router.post('/editdetails',imageuploading.single('coverpage'),updateprofile)

router.post('/addfood',imageuploading.array('images',10),CreateFood)
router.post('/getfoods',getallfoods)

router.get('/',(req:Request,res:Response,next:NextFunction)=>{
    res.json({message:'hello Vendor route'})
})

export {router as VendorRoute}