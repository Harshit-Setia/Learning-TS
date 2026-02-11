import type { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/users.js"
import bcrypt from "bcrypt"

interface SignUpBody{
    username?:string,
    email?:string,
    password?:string
}

export const signUp:RequestHandler<unknown,unknown,SignUpBody,unknown>=async(req,res,next)=>{
    const {username,email,password:passwordRaw}=req.body
    try {
        if(!username||!email||!passwordRaw){
            throw createHttpError(400,"Parameters missing")
        }

        const existingUser= await UserModel.findOne({
            $or: [
                { email },
                { username }
            ]
        }).select("email username")
        if(existingUser){
            if(existingUser.email===email){
                throw  createHttpError(409,"A user with email address already exists.")
            }
            if(existingUser.username===username){
                throw  createHttpError(409,"Username already taken.")
            }
        }

        const passwordHashed=await bcrypt.hash(passwordRaw,10)

        const newUser=await UserModel.create({
            username,
            email,
            password:passwordHashed
        })
        req.session.userID = newUser._id
        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}