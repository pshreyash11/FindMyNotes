import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export const Hero = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div className="relative flex h-full items-center justify-center bg-unsplashBgImage bg-cover bg-center">
      <div className="absolute inset-0 bg-black opacity-70" />
      <div className="relative z-8 w-full max-w-[860px] text-center text-white">
        <h1 className="text-5xl font-bold md:text-5xl">FIND MY NOTES</h1>
        <p className="mt-5 text-sm font-light md:text-xl md:font-normal">
          Welcome to Find My Notes – where students unite for effortless
          organization, access, and sharing of PDF notes. Say goodbye to
          scattered notebooks; streamline your study routine and embark on a
          journey to academic excellence. Simplify your student life, make your
          notes work for you – discover a new era of innovation, start today
        </p>

        <div className="mt-5">
          {isLoggedIn ? (
            <>
              <Link to="/search">
                <button className="rounded-xl bg-white px-7 py-4 font-bold text-blue-500">
                  Get Started
                </button>
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-5">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};
