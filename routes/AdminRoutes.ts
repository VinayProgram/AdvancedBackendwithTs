import express,{Request,Response,NextFunction} from 'express'
const router=express.Router()
import {vendorcreate,getselectedvendors,getallvendors} from '../controllers/index'

router.post('/create',vendorcreate)
router.post('/vendor/:id',getselectedvendors)
router.post('/allvendors',getallvendors)
router.get('/',(req:Request,res:Response,next:NextFunction)=>{
    res.json({message:'hello Vendor'})
})

export {router as admin}