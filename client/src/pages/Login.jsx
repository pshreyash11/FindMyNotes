import React, { useState } from "react";
import { Link} from "react-router-dom";

const Login = () => {
return (
  <div className="flex h-heightWithoutNavbar w-full items-center justify-center p-5">
    <form className="flex w-full max-w-[420px] flex-col gap-4 rounded-xl bg-white p-5 shadow-xl">
      <h1 className="text-2xl font-bold">Login</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold" htmlFor="userEmail">
            Email
          </label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            className="w-full rounded-lg border border-gray-400 p-2 focus:ring focus:ring-blue-500"
            placeholder="your.email@example.com"
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold" htmlFor="userPassword">
            Password
          </label>
          <input
            type="password"
            id="userPassword"
            name="userPassword"
            className="w-full rounded-lg border border-gray-400 p-2 focus:ring focus:ring-blue-500"
            placeholder="*********"
          />
        </div>
      </div>
      <button
        className="rounded-lg bg-blue-500 px-5 py-2 font-bold text-white hover:bg-blue-600"
        type="submit"
      >
        Log In
      </button>
      <div className="flex items-center justify-between text-sm">
        <p className="">New to FindMyNotes?</p>
        <Link to="/register">
          <p className="font-bold">Create an account</p>
        </Link>
      </div>
    </form>
  </div>
);
}

export default Login;
