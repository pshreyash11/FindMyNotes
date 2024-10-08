import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler( async (req,res,next)=>{
    try {
            const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
            console.log("Extracted token:", token);

            if(!token){
                console.log("No token provided");
                throw new ApiError(401,"Unauthorized request")
            }
        
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            console.log("Decoded token:", decodedToken);
        
            const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
            console.log("User fetched from token:", user);
        
            if(!user){
                console.log("Invalid access token, user not found");
                throw new ApiError(401,"Invalid access token")
            }
        
            req.user = user
            next()
    } catch (error) {
        console.log("Token verification error:", error);
        throw new ApiError(401,error?.message || "Invalid access token")
    }

 })