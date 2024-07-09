import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");

  const loginUser = async (e) => {
 
    try {
      e.preventDefault();
      const user = {
        email,
        password,
      };
  
      const result = await axios.post("http://localhost:5000/api/v1/users/login", user);
      console.log("Server response:", result.data);
  
      if (result.data.status === "Error") {
        alert("Wrong credentials!");
        navigate("/login");
      } else {
        console.log("User Logged in Successfully: ", result.data);
        // alert("User logged in successfully");
        navigate("/");
      }
  
    } catch (error) {
      alert("Wrong credentials.");
      console.log("Cannot Login the User: ", error.response ? error.response.data : error.message);
    }
  };
  


return (
  <div className="flex h-heightWithoutNavbar w-full items-center justify-center p-5">
    <form className="flex w-full max-w-[420px] flex-col gap-4 rounded-xl bg-white p-5 shadow-xl" onSubmit={loginUser}>
      <h1 className="text-2xl font-bold">Login</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-lg border border-gray-400 p-2 focus:ring focus:ring-blue-500"
            placeholder="your.email@example.com"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full rounded-lg border border-gray-400 p-2 focus:ring focus:ring-blue-500"
            placeholder="*********"
            onChange={(e) => setUserPassword(e.target.value)}
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
