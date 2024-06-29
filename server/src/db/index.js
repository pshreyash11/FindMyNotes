import mongoose from "mongoose"
import { DB_NAME } from "../constant.js"

const connectDB = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    } catch (error) {
        console.error("MONGO_DB connection failed ",error)
        process.exit(1)
    }
}

export default connectDB