import app from "./app.js";
import mongoose from "mongoose";
import env from "./util/validENV.js"


const PORT=env.PORT



mongoose.connect(env.MONGODB_URI!)
.then(()=>{
    console.log("MongoDB Connected")
    app.listen(PORT,()=>{
        console.log("http://localhost:"+PORT)
    })
})
.catch(err=>{
    console.error(err)
})
