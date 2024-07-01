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
        type: String,// Here I have taken tags as array.
        required: true,
    },
    files:{//This is main file(coudinary url)
        type: String,
        required: true
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
})

export const Notes = mongoose.model("Notes", noteSchema)