import express from 'express'
import {admin,VendorRoute,ShopingRoute,CustomerRoute} from './routes/index' 
import bodyParser, { BodyParser } from 'body-parser'
import {connection} from './config/index'
import path from 'path'
const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('images',express.static(path.join(__dirname,'photos')))


app.use('/vendor',VendorRoute)
app.use('/admin',admin)
app.use('/Appliction',CustomerRoute)
app.use(ShopingRoute)


app.listen(3660,async()=>{
    await connection()
    console.log(' Port has started at  3660 ')
})
