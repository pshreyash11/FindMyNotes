import React, { useEffect, useState, useContext } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(UserContext);

  const [userFiles, setUserFiles] = useState([]);

  const userId = user._id;

  useEffect(() => {
    const getUserFiles = async () => {
      const result = await axios.get(
        `http://localhost:5000/api/v1/notes/getFiles/${userId}`,
      );
      console.log(result.data);
      setUserFiles(result.data.data);
    };

    getUserFiles();
  }, [userId]);

  const numberofUploads = userFiles.length;

  const navigate = useNavigate();

  const showPDF = (fileURL) => {
    navigate(`/showFile/${encodeURIComponent(fileURL)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center border border-red-500 lg:h-heightWithoutNavbar lg:flex-row">
      <div className="flex w-full flex-col items-center justify-center border-[3px] border-green-500 py-4 lg:h-full lg:w-[40%]">
        <div className="grid h-[200px] w-[200px] place-content-center overflow-hidden rounded-full bg-gray-400 text-2xl font-black">
          {/* 200 x 200 */}
          <img src={user.profileImage} alt="userprofile" className="" />
        </div>
        <div className="">
          <div className="my-2 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-black">
              <span>{user.fullname}</span>
            </h2>
            <p className="mt-1 text-center">{user.username}</p>
            <p className="mt-1 text-center">{user.bio}</p>
          </div>
        </div>
        {/* counts */}
        <div className="flex items-center justify-center gap-4">
          <div className="grid h-[80px] w-[100px] place-content-center">
            <p className="text-center text-[12px] font-bold">
              No. of Uploads :
            </p>
            <p className="text-center text-5xl font-black">{numberofUploads}</p>
          </div>
          <span className="h-[60px] w-[1px] bg-gray-400" />
        </div>
      </div>
      <div className="h-auto w-full border-[3px] border-amber-500 p-5 lg:h-full lg:w-[60%]">
        <h1 className="mb-3 text-xl font-black">My Documents :</h1>
        <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3">
          {/* {userFiles.map((file) => (
            <button
              onClick={() => showPDF(file.files)}
              key={file._id}
              className="mb-3 flex h-[40px] max-w-[300px] items-center justify-between gap-10 rounded-xl border border-black px-4"
              target="_blank"
            >
              <p className="font-semibold"> {file.fileName}</p>
            
              <FaExternalLinkAlt/>
            </button>
          ))} */}
          {userFiles.map((file) => (
            <div
              key={file._id}
              className="mb-3 flex h-[40px] max-w-[300px] items-center justify-between gap-10 rounded-xl border border-black px-4"
            >
              <p className="font-semibold"> {file.fileName}</p>
              <button
                onClick={() => navigate(`/update-file/${file._id}`)}
                className="text-blue-500"
              >
                Edit
              </button>
              <FaExternalLinkAlt className="hover:cursor-pointer" onClick={() => showPDF(file.files)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
