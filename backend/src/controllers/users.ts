import type { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/users.js"
import bcrypt from "bcrypt"

export const getAuthenticatedUser: RequestHandler=async (req,res,next)=>{
    const authenticatedUser=req.session.userID

    try {
        if(!authenticatedUser){
            throw createHttpError(401,"User not authenticated")
        }
        const user=await UserModel.findById(authenticatedUser).select("+email")
        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

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

interface LoginBody{
    username?: string,
    password?: string
}

export const login:RequestHandler<unknown,unknown,LoginBody,unknown>=async(req,res,next)=>{
    console.log("enter")
    const {username,password}=req.body
    try {
        if(!username||!password){
            throw createHttpError(400,"Username and Password Required")
        }
        const user=await UserModel.findOne({username}).select("+password +email")

        if(!user)throw createHttpError(401,"Invalid Username")

        const isValidPass=await bcrypt.compare(password,user.password)
        if(!isValidPass)throw createHttpError(400,"Invalid Password")

        req.session.userID=user._id
        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}

export const logout:RequestHandler=async (req,res,next)=>{
    req.session.destroy(error=>{
        if(error){
            next(error)
        }
        else{
            res.sendStatus(200)
        }
    })
}