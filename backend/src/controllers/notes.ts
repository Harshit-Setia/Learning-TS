import { type RequestHandler } from "express"
import NoteModel from "../models/note.js"
import createHttpError from "http-errors"
import mongoose from "mongoose"

export const getNotes: RequestHandler = async (req,res,next)=>{
    try {
        const notes= await NoteModel.find()
        return res.status(200).json(notes)
    } catch (error) {
        return next(error)
    }
}

export const getNote: RequestHandler = async (req,res,next)=>{
    const noteID=req.params.noteID
    try {
        if(!mongoose.isValidObjectId(noteID))throw createHttpError(400,"Invalid NoteId")
        const note= await NoteModel.findById(noteID)
        if(!note)throw createHttpError(404,"Note not Found")
        return res.status(200).json(note)
    } catch (error) {
        return next(error)
    }
}

interface NoteBody{
    title?:string,
    text?:string
}

export const createNote: RequestHandler<unknown,unknown,NoteBody,unknown>= async (req,res,next)=>{
    const {title,text}=req.body
    try {
        if(!title||title.trim().length===0)throw createHttpError(400,"Title is Required")
        const newNote=await NoteModel.create({
            title,
            text:!text?null:text
        })

        return res.status(201).json({"message":"New Note created","Note":newNote})
    } catch (error) {
        next(error)
    }
}

export const updateNote:RequestHandler=async (req,res,next)=>{
    const noteID=req.params.noteID
    try {
        if(!mongoose.isValidObjectId(noteID))throw createHttpError(400,"ID not Valid")
        const note=await NoteModel.findByIdAndUpdate(noteID,req.body)
        if(!note)throw createHttpError(404,"note not found")
        console.log("Note Updated")
    } catch (error) {
        next(error)
    }    
}