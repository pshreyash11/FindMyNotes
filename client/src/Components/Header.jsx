import React from "react";
import axios from "axios";
import { Link , useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

export const Header = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = async () => {
    try {

      const result = await axios.post("http://localhost:5000/api/v1/users/logout")
      console.log("Server response:", result.data);

      if(result.data.status ==="Error")
      {
        alert("Can't Logout user !")
        navigate("/");
      }
      else{
        console.log("User Logged out Successfully: ", result);
        alert("User Logged out Successfully");
      navigate("/");
      }


    } catch (error) {
      alert("Can't Logout user .")
      console.error("Some error happened while logging out user. Error: ",error.response ? error.response.data : error.message);
    }
  }


  return (
    <header className="flex h-[80px] items-center justify-center border-b-2 border-black">
      <div className="flex w-full max-w-[1550px] items-center justify-between ">
        {/* Image Section */}
        <div className="flex h-[60px] w-[120px] items-center justify-center overflow-hidden ">
          <img src="/logo.png" alt="logo" />
        </div>

        <GiHamburgerMenu className="text-xl md:hidden"/>
        <div className="hidden md:flex md:justify-center md:items-center md:gap-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          {/* <Link to="/login">
            <button className="rounded-xl bg-blue-500 px-5 py-2 font-bold  hover:bg-blue-700">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="rounded-xl bg-blue-500 px-5 py-2 font-bold  hover:bg-blue-700">
              Register
            </button>
          </Link> */}
          <Link to="/search" className="text-xl">
            <FaSearch />
          </Link>
          <Link to="/upload" className="text-[24px]">
            <MdOutlineFileUpload />
          </Link>
          <Link to="/profile">
            <button className="rounded-xl bg-blue-500 px-5 py-2 font-bold hover:bg-blue-700">
              Profile
            </button>
          </Link>
          <button className="rounded-xl bg-blue-500 px-5 py-2 font-bold hover:bg-blue-700" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
