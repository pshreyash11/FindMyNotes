import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse }  from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";


const generateAccessAndRefreshTokens = async (userId) => {
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken,refreshToken }
    }
    catch(error){
        throw new ApiError(500,"Something went wrong while generating refresh and accesss token");
    }
}


const registerUser = asyncHandler( async (req,res)=>{
    const { fullname , email, username, password, mobile ,bio} = req.body

    if(
        [fullname,email,username,password , bio].some((field)=> String(field)?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required")
    }

    //user already exist or not
    const existedUser = await User.findOne({
        $or:[ {username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }

    const profileImageLocalPath = req.files?.profileImage[0].path;


    if(!profileImageLocalPath){
        throw new ApiError(400,"Profile Image file is required")
    }

    const profileImage = await uploadOnCloudinary(profileImageLocalPath)

    if(!profileImage){
        throw new ApiError(400,"ProfileImage file is required")
    }

    const user = await User.create({
        fullname,
        profileImage: profileImage.url,
        email,
        password,
        bio,
        mobile,
        username:username.toLowerCase()
    })

    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)

    //remove password and refreshtoken
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    //check for user creation
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user.")
    }

    const options = {
        httpOnly:true,
        secure:true
        // by setting httpOnly and secure true , cookies will only will be modified by server only (not by frontend)
    }

    //return response
    return res
    .status(201)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,
            {
                user:createdUser,accessToken,refreshToken
            },
            "User registered Successfully.")
    )


});


const loginUser = asyncHandler(async (req, res) => {
    
    const {email , username , password} = req.body

    if(!username && !email){
        throw new ApiError(400,"username or email is required! ")
    }

    const user = await User.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        throw new ApiError(404,"User does not exixts")
    }

    const isPasswordValid = await user.isPasswordCorrct(password)
    // remember one thing that all methods that you call is inside the "user" not inside the "User" which is mongodb object

    if(!isPasswordValid ){ 
        throw new ApiError(404,"Invalid user credentials")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    // Now we are going to send cookies
    const options = {
        httpOnly:true,
        secure:true
        // by setting httpOnly and secure true , cookies will only will be modified by server only (not by frontend)
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,accessToken,refreshToken
            },
            "User logged in Successfully"
        )

    )

})

const logoutUser = asyncHandler(async (req, res) => {
    // we can use req.user because we have written our new middleware "auth.middleware.js" which gives access of user only by by accessToken
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken:undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure:true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out"))

})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized request, No incoming refresh token")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(401,"Invalid refresh token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401,"Refresh token is expired or used.")
        }
        // I think this should be decodedToken instead of incomingRefreshToken.

        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken,newRefreshToken} =  await generateAccessAndRefreshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",newRefreshToken,options)
        .json(
            new ApiResponse(200,
                {accessToken,refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid refresh token")
    }

})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    // you can also add field confPassword where we just need to conform newPassword === confPassword , if not ,throw apierror.

    const user = await User.findById(req.user?._id)
    const isPasswordCorrct = await user.isPasswordCorrct(oldPassword)

    if(!isPasswordCorrct){
        throw new ApiError(400,"Invalid old Password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})
    return res
    .status(200)
    .json( new ApiResponse(200,{},"Password changed successfully"))
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(200,req.user,"Current user fetched successfully") )// I think this should be wrapped inside Api response
})

const updateAccountDetails = asyncHandler(async (req, res)=>{
    const {fullname,email} = req.body
    
    if(!fullname || !email){
        throw new ApiError(400,"All fields are required.")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                fullname:fullname,
                email:email
            }
            // The $set operator replaces the value of a field with the specified value.
        },
        {new: true}// by setting new to true updated information will be returned
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200,user,"Account details updated successfully!"))
})

const updateUserProfileImage = asyncHandler(async(req,res)=>{
    const profileImageLocalPath = req.file?.path

    if(!profileImageLocalPath){
        throw new ApiError(400,"Profile Image file is missing")
    }

    const profileImage = await uploadOnCloudinary(profileImageLocalPath)
    
    if(!profileImage.url){
        throw new ApiError(400,"Error while uploading on Profile Image")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                profileImage: profileImage.url
            }
        },
        { new: true} 
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200,user,"Profile Image updated Successfully.")
    )
})


const saveNoteToUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user?._id);
    if(!user){
        throw new ApiError(400,"User not found while accessing saved notes.")
    }

    const notesID = req.body.notesID;
    if(!notesID){
        throw new ApiError(400,"Notes ID is required to save the notes")
    }

    if (user.savedNotes.includes(notesID)) {
        return res.status(400).json({ message: "Note is already saved." });
    }

    user.savedNotes.push(notesID)
    await user.save()
    
    return res
    .status(200)
    .json(
        new ApiResponse(200,user,"Note saved Successfully.")
    )

})

const unSaveNote = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user?._id);
    if(!user){
        throw new ApiError(400,"User not found while unSaving notes.")
    }

    const notesID = req.body.notesID;
    if(!notesID){
        throw new ApiError(400,"Notes ID is required to Unsave the notes")
    }

    if (user.savedNotes.includes(notesID) == false) {
        return res.status(400).json({ message: "Note is not present in the saved notes." });
    }
    
    user.savedNotes.remove(notesID)
    await user.save();

    return res
    .status(200)
    .json(
        new ApiResponse(200,user,"Note Unsaved Successfully!")
    )
}) 


export {
     registerUser,
     loginUser,
     logoutUser,
     refreshAccessToken,
     changeCurrentPassword,
     getCurrentUser,
     updateAccountDetails,
     updateUserProfileImage,
     saveNoteToUser,
     unSaveNote
};