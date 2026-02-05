import "dotenv/config"
import express, { type NextFunction,type Request,type Response } from 'express'
import NotesRouter from "./routes/notes.js"
import morgan from "morgan"
import createHttpError, {isHttpError} from "http-errors";

const app = express();

//middlewares
app.use(express.json())
app.use(morgan("dev"))
//routes
app.use("/api/notes",NotesRouter)

app.use((req:Request,res:Response,next:NextFunction)=>{
    next(createHttpError(404,"EndPoint Not Found"))
})
//Error Handler
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