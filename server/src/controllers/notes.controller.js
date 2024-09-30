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
    console.log("Note file path is ",noteFileLocalPath)


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

const getNotes = asyncHandler( async (req,res)=>{
    const { searchQuery } = req.query;

  if (!searchQuery) {
    throw new ApiError(400, "Please provide a search query.");
  }

  const query = {
    $or: [
      { fileName: { $regex: searchQuery, $options: "i" } },
      { tags: { $regex: searchQuery, $options: "i" } },
    ],
  };

    const foundNotes = await Notes.find(query)

    if(foundNotes.length == 0){
        throw new ApiError(400,"No data available for particular query")
    }

    return res.status(201)
    .json(
        new ApiResponse(200,foundNotes,"Notes File found Successfully")
    )

})

const getNotesByID = asyncHandler( async (req,res)=>{
    const userId = req.params.id

    const foundNotes = await Notes.find({
        uploadedBy: userId
    })


    if(foundNotes.length == 0){
        throw new ApiError(400,"No data available for particular query")
    }

    return res.status(201)
    .json(
        new ApiResponse(200,foundNotes,"Notes File found Successfully")
    )

})

const getNotesByNotesId = asyncHandler(async (req, res) => {
    const { notesID } = req.body; // This should be an array
  
    if (!notesID || notesID.length === 0) {
      throw new ApiError(400, "No note IDs provided");
    }
  
    // Fetch multiple notes with the provided IDs
    const notes = await Notes.find({ _id: { $in: notesID } });
  
    if (!notes || notes.length === 0) {
      throw new ApiError(404, "No notes found");
    }
  
    return res.status(200).json(new ApiResponse(200, notes, "Notes found successfully!"));
  });
  

const updateNotes = asyncHandler(async (req, res) => {
    const noteId = req.params.id;
    const { fileName, fileDescription, tags } = req.body;
  
    const note = await Notes.findById(noteId);
  
    if (!note) {
      throw new ApiError(404, "Note not found");
    }
  
    if (fileName?.trim()) note.fileName = fileName;
    if (fileDescription?.trim()) note.fileDescription = fileDescription;
    if (tags?.trim()) note.tags = tags;
  
    if (req.files?.files) {
      const noteFileLocalPath = req.files.files[0].path;
      const noteFile = await uploadOnCloudinary(noteFileLocalPath);
  
      if (!noteFile) {
        throw new ApiError(400, "Notes file upload to Cloudinary failed");
      }
  
      note.files = noteFile.url;
    }
  
    const updatedNote = await note.save();
  
    return res.status(200).json(new ApiResponse(200, updatedNote, "Notes updated successfully"));
  });
  

export {
    uploadNotes,
    getNotes,
    getNotesByID,
    updateNotes,
    getNotesByNotesId
}