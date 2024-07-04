import React from "react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="bg-unsplashBgImage relative flex h-full items-center justify-center bg-cover bg-center">
      <div className="absolute inset-0 bg-black opacity-70" />
      <div className="relative z-10 w-full max-w-[860px] text-center text-white">
        <h1 className="text-5xl font-bold md:text-5xl">FIND MY NOTES</h1>
        <p className="mt-5 text-sm font-light md:text-xl md:font-normal">
          Welcome to Find My Notes – where students unite for effortless
          organization, access, and sharing of PDF notes. Say goodbye to
          scattered notebooks; streamline your study routine and embark on a
          journey to academic excellence. Simplify your student life, make your
          notes work for you – discover a new era of innovation, start today
        </p>
        <div className="mt-5">
          {/* <Link to="/search">
            <button className="rounded-xl text-blue-500 bg-white px-7 py-4 font-bold ">Get Started</button>
          </Link> */}
          <div className="flex gap-5 justify-center items-center">
            <Link to="/login">
              <button className="rounded-xl bg-white px-7 py-4 font-bold text-blue-500">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="rounded-xl bg-white px-7 py-4 font-bold text-blue-500">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
