import express,{Request,Response,NextFunction} from 'express'
const router=express.Router()
import {getfoodbyavailblity,GetTopHotels} from '../controllers/index'

router.get('/:pincode',getfoodbyavailblity)
router.get('/TopHotels/:pincode',GetTopHotels)


export {router as ShopingRoute}