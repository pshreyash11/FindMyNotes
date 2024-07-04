import React from "react";
import { FaSearch } from "react-icons/fa";

 
export const SearchBar = () => {
  return (
    <div className="flex h-heightWithoutNavbar flex-col items-center justify-start p-4">
      <div className="flex w-full items-center justify-center">
        <form
          className="w-full max-w-[700px] rounded-xl border border-black bg-[#374151] p-4"
        >
          <div className="flex items-center justify-between">
            {/* serach logo  */}
            <FaSearch className="text-2xl text-white" />
            {/* input  */}
            <input
              type="search"
              placeholder="Seach for Notes"
              className="ml-3 w-full bg-[#374151] text-white"
            />
            <button
              type="submit"
              className="bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Search
            </button>
          </div>
        </form>
      </div>

      

    </div>
  );
};
