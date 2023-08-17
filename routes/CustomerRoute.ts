import express,{Request,Response,NextFunction} from 'express'
const router=express.Router()
import {CreatePerson,VerifyCustomer,customerLogin} from '../controllers/index'
import {Validate} from '../middleware/AuthorizationCheck'
router.post('/createcustomer',CreatePerson)
router.post('/verifycustomer',Validate,VerifyCustomer)
router.post('/login',customerLogin)
export {router as CustomerRoute}