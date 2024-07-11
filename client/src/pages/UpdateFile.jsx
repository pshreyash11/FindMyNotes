import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../context/UserContext";

const UpdateFile = () => {
  const { user } = useContext(UserContext);
  const { fileId } = useParams();
  const [fileDetails, setFileDetails] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFileDetails = async () => {
      const token = localStorage.getItem("accessToken");
      const result = await axios.get(
        `http://localhost:5000/api/v1/notes/file/${fileId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setFileDetails(result.data.data);
      setTitle(result.data.data.fileName);
      setDescription(result.data.data.fileDescription);
      setTags(result.data.data.tags);
    };

    fetchFileDetails();
  }, [fileId]);

  const submitFile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fileName", title);
    formData.append("fileDescription", description);
    formData.append("tags", tags);
    if (file) formData.append("files", file);

    const token = localStorage.getItem("accessToken");

    const updatePromise = axios.patch(
      `http://localhost:5000/api/v1/notes/update/${fileId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    toast.promise(
      updatePromise,
      {
        pending: "Updating file...",
        success: "File updated successfully!",
        error: "Failed to update file.",
      },
      { position: "top-center" },
    );

    try {
      const result = await updatePromise;
      console.log("Data:", result);
      navigate("/");
    } catch (error) {
      console.error("Failed to update file:", error.response);
      if (error.response) {
        console.error("Error data:", error.response.data);
      }
    }
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <form
        className="flex h-full w-full max-w-[770px] flex-col items-center justify-center p-5 md:border md:border-gray-300 lg:justify-center"
        onSubmit={submitFile}
      >
        <h1 className="mb-5 text-2xl font-black">Update Your Notes</h1>
        <div className="mb-5 w-full max-w-[550px]">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-5 w-full max-w-[550px]">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-5 w-full max-w-[550px]">
          <input
            type="text"
            placeholder="Tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex w-full max-w-[550px] items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2 "
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to Upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">PDF</p>
              <input
                type="file"
                accept="application/pdf"
                id="dropzone-file"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
            </div>
          </label>
        </div>
        <button
          className="my-5 w-full max-w-[550px] rounded-xl bg-blue-500 py-3 font-bold text-white hover:bg-blue-600"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateFile;
