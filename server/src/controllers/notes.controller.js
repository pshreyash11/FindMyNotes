import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse }  from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Notes } from "../models/notes.model.js"
import { User } from "../models/user.model.js";


const uploadNotes = asyncHandler( async (req,res)=>{
    const { fileName , fileDescription , tags} = req.body
    const uploadedBy = req.user?._id
    
    if(!uploadedBy){
        throw new ApiError(400,"uploaded by field is required")
    }



    if(
        [fileName,fileDescription,tags].some((field)=> field?.trim() === "")
    ){
        throw new ApiError(400,"All file uploading fields are required")
    }


    const noteFileLocalPath = req.files?.files[0].path;


    if(!noteFileLocalPath){
        throw new ApiError(400,"Notes file is required")
    }

    const noteFile = await uploadOnCloudinary(noteFileLocalPath)

    if(!noteFile){
        throw new ApiError(400,"Notes file is required (cloudinary problem)")
    }


    const newFile = await Notes.create({
        fileName,
        fileDescription,
        tags,
        files : noteFile.url,
        uploadedBy
    })

    const createdNotes = await Notes.findById(newFile._id)
    if(!createdNotes){
        throw new ApiError(400,"Something went wrong while uploading the notes")
    }

    return res.status(201).json(
        new ApiResponse(200,createdNotes,"Notes uplaoded Successfully.")
    )

});

export {
    uploadNotes
}