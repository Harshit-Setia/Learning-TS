import { type RequestHandler } from "express"
import NoteModel from "../models/notes.js"
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
interface UpdateNoteParams{
    noteID: string
}
export const updateNote:RequestHandler<UpdateNoteParams,unknown,NoteBody,unknown>=async (req,res,next)=>{
    
    const noteID=req.params.noteID
    const newTitle=req.body.title
    const newText=req.body.text

    try {
        if(!mongoose.isValidObjectId(noteID))throw createHttpError(400,"ID not Valid")
        if(!newTitle||newTitle.trim().length===0)throw createHttpError(400,"Note Must have title")
        
        const note=await NoteModel.findById(noteID)

        if(!note)throw createHttpError(404,"note not found")

        //updating
        note.title=newTitle
        note.text=!newText?null:newText

        const updatedNote=await note.save()

        res.status(200).json({"message":"Note Updated",note:updatedNote})
    } catch (error) {
        next(error)
    }    
}