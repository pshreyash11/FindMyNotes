import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

export const Header = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

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
          setUserInfo(null);
          navigate("/");
        } else {
          console.log("User data : ", result);
          setIsLoggedIn(true);
          setUserInfo(result.data.data);
          console.log("User info - ", userInfo);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUserInfo(null);
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
        setUserInfo(null);
        alert("User Logged out Successfully");
        navigate("/");
      }
    } catch (error) {
      alert("Can't Logout user.");
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
          <div className="flex justify-start items-start mx-0">
            <h1 className="text-2xl font-bold">Hello {userInfo.username} !</h1>
          </div>
        ) : null}
        <GiHamburgerMenu className="text-xl md:hidden" />
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
      </div>
    </header>
  );
};
