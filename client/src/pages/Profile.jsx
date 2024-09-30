import React, { useEffect, useState, useContext } from "react";
import { FaExternalLinkAlt, FaRegStar, FaStar } from "react-icons/fa";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [userFiles, setUserFiles] = useState([]);
  const [savedFiles, setSavedFiles] = useState([]); // State for saved notes

  const userId = user._id;

  useEffect(() => {
    const getUserFiles = async () => {
      const result = await axios.get(
        `http://localhost:5000/api/v1/notes/getFiles/${userId}`
      );
      setUserFiles(result.data.data);
    };

    const getSavedFiles = async () => {
      if (user.savedNotes.length > 0) {
        try {
          // Make a POST request with the array of note IDs
          const result = await axios.post(
            `http://localhost:5000/api/v1/notes/getNoteWithID`,
            { notesID: user.savedNotes } // Pass the array of saved note IDs
          );
    
          // Assuming the API response contains an array of notes
          setSavedFiles(result.data.data); // Set the array of notes in state
        } catch (error) {
          console.error("Error fetching saved notes:", error);
        }
      }
    };

    getUserFiles();
    getSavedFiles(); // Fetch saved notes
  }, [userId, user.savedNotes]);

  const numberofUploads = userFiles.length;

  const navigate = useNavigate();

  const showPDF = (fileURL) => {
    navigate(`/showFile/${encodeURIComponent(fileURL)}`);
  };

  const isSavedFile = (fileID) => {
    return user.savedNotes.includes(fileID);
  };

  const saveTheFile = async (notesID) => {
    try {
      await axios.post("http://localhost:5000/api/v1/users/save-note", {
        notesID,
      });
      console.log("Note saved successfully!");

      // Re-fetch saved files after saving
      const result = await axios.post(
        `http://localhost:5000/api/v1/notes/getNoteWithID`,
        { notesID: user.savedNotes }
      );
      setSavedFiles(result.data.data);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const unSaveTheFile = async (notesID) => {
    try {
      await axios.post("http://localhost:5000/api/v1/users/unsave-note", {
        notesID,
      });
      console.log("Note unsaved successfully!");

      // Update the saved notes list after unsaving
      setSavedFiles((prevFiles) =>
        prevFiles.filter((file) => file._id !== notesID)
      );
    } catch (error) {
      console.error("Error unsaving note:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center lg:h-heightWithoutNavbar lg:flex-row">
      {/* User Information */}
      <div className="flex w-full flex-col items-center justify-center py-4 lg:h-full lg:w-[40%]">
        <div className="grid h-[200px] w-[200px] place-content-center overflow-hidden rounded-full bg-gray-400 text-2xl font-black">
          <img src={user.profileImage} alt="userprofile" />
        </div>
        <div className="my-2 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-black">{user.fullname}</h2>
          <p className="mt-1 text-center">{user.username}</p>
          <p className="mt-1 text-center">{user.bio}</p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="grid h-[80px] w-[100px] place-content-center">
            <p className="text-center text-[12px] font-bold">No. of Uploads:</p>
            <p className="text-center text-5xl font-black">{numberofUploads}</p>
          </div>
        </div>
      </div>

      {/* My Documents Section */}
      <div className="h-auto w-full p-5 lg:h-full lg:w-[60%]">
        <h1 className="mb-3 text-xl font-black">My Documents:</h1>
        <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3">
          {userFiles.map((file) => (
            <div
              key={file._id}
              className="mb-3 flex h-[40px] max-w-[300px] items-center justify-between gap-10 rounded-xl border border-black px-4"
            >
              <p className="font-semibold">{file.fileName}</p>
              <button
                onClick={() => navigate(`/update-file/${file._id}`)}
                className="text-blue-500"
              >
                Edit
              </button>
              <FaExternalLinkAlt
                className="hover:cursor-pointer"
                onClick={() => showPDF(file.files)}
              />
            </div>
          ))}
        </div>

        {/* Saved Notes Section */}
        <h1 className="mt-10 mb-3 text-xl font-black">Saved Notes:</h1>
        <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3">
          {savedFiles.map((note) => (
            <div
              key={note._id}
              className="mb-3 flex h-[40px] max-w-[300px] items-center justify-between gap-10 rounded-xl border border-black px-4"
            >
              <p className="font-semibold">{note.fileName}</p>
              <div className="flex items-center">
                {isSavedFile(note._id) ? (
                  <FaStar
                    className="text-yellow-500"
                    onClick={() => unSaveTheFile(note._id)}
                  />
                ) : (
                  <FaRegStar
                    className="text-gray-400"
                    onClick={() => saveTheFile(note._id)}
                  />
                )}
                <FaExternalLinkAlt
                  className="ml-4 hover:cursor-pointer"
                  onClick={() => showPDF(note.files)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
