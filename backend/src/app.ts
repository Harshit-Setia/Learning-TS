import "dotenv/config"
import express, { type NextFunction,type Request,type Response } from 'express'
import NotesRouter from "./routes/notes.js"
import UsersRouter from "./routes/users.js"
import morgan from "morgan"
import createHttpError, {isHttpError} from "http-errors";
import session from "express-session"
import env from "./util/validENV.js"
import MongoStore from "connect-mongo"

const app = express();

//middlewares
app.use(express.json())
app.use(morgan("dev"))
app.use(session({
    secret: env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge: 60*60*1000
    },
    rolling:true,
    store: MongoStore.create({
        mongoUrl:env.MONGODB_URI
    })
}))

//routes
app.use("/api/notes",NotesRouter)
app.use("/api/users",UsersRouter)

//Error Handler
app.use((req:Request,res:Response,next:NextFunction)=>{
    next(createHttpError(404,"EndPoint Not Found"))
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error:unknown,req:Request,res:Response,next:NextFunction)=>{
    let errorMessage="Error in app";
    let statusCode=500
    if(isHttpError(error)){
        statusCode=error.status
        errorMessage=error.message
    }
    return res.status(statusCode).json({"error":errorMessage})
})

export default app