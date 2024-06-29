import mongoose , { Schema} from "mongoose";

const noteSchema = new Schema({
    fileName:{
        type: String,
        required: true,
    },
    fileDescription:{
        type: String,
        required:true
    },
    tags:{
        type: Array,// Here I have taken tags as array.
        required: true,
    },
    files:{
        type: String,
        required: true
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

export const Note = mongoose.model("Note", noteSchema)