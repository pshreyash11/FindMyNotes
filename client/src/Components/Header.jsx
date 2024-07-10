import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { MdMenu, MdClose } from "react-icons/md";
import UserContext from "../context/UserContext";
import {toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Header = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5000/api/v1/users/get-user",
        );
        console.log("User received , response:", result.data);

        if (result.data.status === "Error") {
          alert("Please login first !");
          setIsLoggedIn(false);
          setUser(null);
          navigate("/");
        } else {
          console.log("User data : ", result);
          setIsLoggedIn(true);
          setUser(result.data.data);
          console.log("User info that i want - ", user);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
        console.log(
          "Some error happened while getting user data, Error: ",
          error,
        );
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const result = await axios.post(
        "http://localhost:5000/api/v1/users/logout",
      );
      console.log("Server response:", result.data);

      if (result.data.statusCode >= 400) {
        alert("Can't Logout user!");
        navigate("/");
      } else {
        console.log("User Logged out Successfully: ", result);
        setIsLoggedIn(false);
        setUser(null);
        toast.success("User Logged out successfully!",{
          position: "top-center"
        });
        navigate("/");
      }
    } catch (error) {
      toast.error("Can't perform logout action !.",{
        position: "top-center"
      });
      console.error(
        "Some error happened while logging out user. Error: ",
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <header className="flex h-[80px] items-center justify-center border-b-2 border-black">
      <div className="flex w-full max-w-[1550px] items-center justify-between">
        {/* Image Section */}
        <div className="flex h-[60px] w-[120px] items-center justify-center overflow-hidden">
          <img src="/logo.png" alt="logo" />
        </div>
        {isLoggedIn ? (
          <div className="mx-0 flex items-start justify-start">
            <h1 className="text-xl font-bold">Hello {user.username} !</h1>
          </div>
        ) : null}


        <div onClick={handleNav} className="block md:hidden">
          {nav ? <MdClose size={30} /> : <MdMenu size={30} />}
        </div>

        <div className="hidden md:flex md:items-center md:justify-center md:gap-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          {isLoggedIn ? (
            <>
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
              <button
                className="rounded-xl bg-blue-500 px-5 py-2 font-bold hover:bg-blue-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="rounded-xl bg-blue-500 px-5 py-2 font-bold hover:bg-blue-700">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="rounded-xl bg-blue-500 px-5 py-2 font-bold hover:bg-blue-700">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>

        <div
          className={
            nav
              ? "fixed left-0 top-0 z-10 h-[100vh] w-[60%] border-r border-r-gray-900 bg-[#000300] p-4 text-white duration-500 ease-in-out "
              : "fixed left-[-100%]"
          }
        >
          <div className="border-b border-b-gray-400 h-[8%] flex justify-center items-center text-2xl mx-5 mt-10">
            <Link to="/">Home</Link>
          </div>
          <div className="border-b border-b-gray-400 h-[8%] flex justify-center items-center text-2xl mx-5">
            <Link to="/about">About</Link>
          </div>
          {isLoggedIn ? (
            <>
              <div className="border-b border-b-gray-400 h-[8%] flex justify-center items-center text-2xl mx-5">
                <Link to="/search" className="text-xl">
                  <FaSearch />
                </Link>
              </div>

              <div className="border-b border-b-gray-400 h-[8%] flex justify-center items-center text-2xl mx-5">
                <Link to="/upload" className="text-[24px]">
                  <MdOutlineFileUpload />
                </Link>
              </div>

              <div className="border-b border-b-gray-400 h-[8%] flex justify-center items-center text-2xl mx-5">
                <Link to="/profile">
                  <button className="my-4 text-blue-500 px-5 py-2 font-bold ">
                    Profile
                  </button>
                </Link>
              </div>

              <div className="border-b border-b-gray-400 h-[8%] flex justify-center items-center text-2xl mx-5">
                <button
                  className="my-4  px-5 py-2 font-bold text-blue-500"
                  onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="border-b border-b-gray-400 h-[8%] flex justify-center items-center text-2xl mx-5">
                <Link to="/login">
                  <div className="my-4  px-5 py-2 font-bold text-blue-500">
                    Login
                  </div>
                </Link>
              </div>

              <div className="border-b border-b-gray-400 h-[8%] flex justify-center items-center text-2xl mx-5">
                <Link to="/register">
                  <div className="my-4  px-5 py-2 font-bold text-blue-500">
                    Register
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
