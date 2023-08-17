import  Multer  from "multer";

let timestamp=Date.now().toString()
const imageupload=Multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'image')
    },
    filename:(req, file, callback)=>{
        callback(null,timestamp+'-filename-'+file.originalname)
    },
})

export const imageuploading=Multer({storage:imageupload})