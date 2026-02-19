import { Schema, type InferSchemaType, model } from "mongoose"

const noteSchema=new Schema({
    userID:{type:Schema.Types.ObjectId,required:true},
    title:{type:String,required: true},
    text: {type:String}
},{timestamps: true})

type Note=InferSchemaType<typeof noteSchema>

export default model<Note>("Note",noteSchema)