import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { FaSearch, FaExternalLinkAlt, FaRegStar, FaStar } from 'react-icons/fa';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState('');
  const [hoveredFileId, setHoveredFileId] = useState(null);
  const [savedFiles, setSavedFiles] = useState([]);

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // Initialize savedFiles with user.savedNotes when the component mounts or when the user changes
  useEffect(() => {
    if (user?.savedNotes) {
      setSavedFiles(user.savedNotes);
    }
  }, [user]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const notes = await axios.get('http://localhost:5000/api/v1/notes/getFiles', {
        params: {
          searchQuery: searchQuery,
        },
      });

      if (notes.data.data.length > 0) {
        setSearchResults(notes.data.data);
        setSearchStatus('Found');
        console.log('Notes fetched successfully: ', notes.data.data);
      } else {
        setSearchResults([]);
        setSearchStatus('Not-Found');
      }
    } catch (error) {
      console.log('Error Fetching Notes: ', error);
    }
  };

  const showPDF = (fileURL) => {
    navigate(`/showFile/${encodeURIComponent(fileURL)}`);
  };

  const isSavedFile = (fileID) => {
    return savedFiles.includes(fileID);
  };

  const saveTheFile = async (notesID) => {
    // Optimistically update the UI
    setSavedFiles((prevFiles) => [...prevFiles, notesID]);

    try {
      const response = await axios.post("http://localhost:5000/api/v1/users/save-note", {
        notesID,
      });

      console.log("Note saved successfully!");
    } catch (error) {
      console.error("Error saving note:", error);
      // Revert the UI update if there is an error
      setSavedFiles((prevFiles) => prevFiles.filter((id) => id !== notesID));
    }
  };

  const unSaveNote = async (notesID) => {
    // Optimistically update the UI
    setSavedFiles((prevFiles) => prevFiles.filter((id) => id !== notesID));

    try {
      const response = await axios.post("http://localhost:5000/api/v1/users/unsave-note", {
        notesID,
      });

      console.log("Note unsaved successfully!");
    } catch (error) {
      console.error("Error unsaving note:", error);
      // Revert the UI update if there is an error
      setSavedFiles((prevFiles) => [...prevFiles, notesID]);
    }
  };

  return (
    <div className="h-heightWithoutNavbar flex flex-col items-center justify-start p-4">
      <div className="flex w-full items-center justify-center">
        <form className="w-full max-w-[700px] rounded-xl border border-black bg-[#374151] p-4" onSubmit={handleSearch}>
          <div className="flex items-center justify-between">
            <FaSearch className="text-2xl text-white" />
            <input
              type="search"
              placeholder="Search for Notes"
              className="ml-3 w-full bg-[#374151] text-white pl-3 pt-1 text-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="mt-5 grid w-full grid-cols-1 gap-5 border sm:grid-cols-2 lg:grid-cols-4">
        {searchStatus === 'Found' && searchResults.length > 0 && searchResults.map((note) => (
          <div
            key={note._id}
            className="relative flex w-full max-w-[400px] flex-wrap-reverse items-center justify-between rounded-xl bg-[#374151] px-3 py-4 text-white shadow-lg"
            onMouseEnter={() => setHoveredFileId(note._id)}
            onMouseLeave={() => setHoveredFileId(null)}
          >
            <p className="mt-2 text-md ">
              <span className="font-bold">File name: </span>
              <span>{note.fileName} </span>
              <span className='ml-8 bg-orange-500 px-2 py-1 rounded-lg text-blue-900 font-bold'>{note.tags}</span>
            </p>
            <div className="flex items-center">
              {isSavedFile(note._id) ? (
                <button className="mr-4" onClick={() => unSaveNote(note._id)}>
                  <FaStar className="text-yellow-500" />
                </button>
              ) : (
                <button className="mr-4" onClick={() => saveTheFile(note._id)}>
                  <FaRegStar className="text-gray-400" />
                </button>
              )}
              <button onClick={() => showPDF(note.files)}> <FaExternalLinkAlt /> </button>
            </div>

            {hoveredFileId === note._id && (
              <div className="absolute top-full left-0 mt-2 w-full rounded-lg bg-gray-800 p-4 text-white shadow-lg">
                <p>{note.fileDescription}</p>
              </div>
            )}
          </div>
        ))}

        {searchStatus === 'Not-Found' && (
          <div className="mt-4 text-center text-gray-600 dark:text-gray-400">No Notes Found</div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
