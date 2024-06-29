import mongoose , { Schema} from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: [true,"Username is required."],
        trim:true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    fullname:{
        type: String,
        required: true,
        trim: true,
        index:true
    },
    profileImage:{
        type: String,
        required: true
    },
    mobile:{
        type: Number,
        required: true
    },
    bio:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required: [true,"Password is required."]
    },
    refreshToken:{
        type:String
    }
})

export const User = mongoose.model("User", userSchema)