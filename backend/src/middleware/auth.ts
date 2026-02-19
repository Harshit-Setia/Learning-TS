import type { RequestHandler } from "express";
import createHttpError from "http-errors";

export const auth:RequestHandler=(req,res,next)=>{
    const authenticatedUser=req.session.userID
    if(authenticatedUser){
        next()
    }
    else{
        next(createHttpError(401,"User not authenticated"))
    }
}