import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

export const Header = () => {
  return (
    <header className="flex h-[80px] items-center justify-center ">
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
          <button className="rounded-xl bg-blue-500 px-5 py-2 font-bold hover:bg-blue-700">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
