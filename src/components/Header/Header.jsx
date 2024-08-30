import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";

const Header = ({onLoad, onPlaceChanged}) => {
 
  return (
    <div className="bg-blue-600">
      <div className="flex items-center justify-between p-4 ">
        <h1 className="text-2xl font-bold text-white hidden sm:block">
          Travel Advisor
        </h1>
        <div className="flex items-center ">
          <h2 className="text-lg text-white mr-4 sm:block">Explore new places</h2>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div className="relative mr-2 ml-0 sm:ml-3 w-full sm:w-auto bg-white bg-opacity-15 hover:bg-opacity-25 rounded">
            <div className="absolute w-5 h-5 m-2">
              <i class="fi fi-rr-search"></i>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          </Autocomplete>
        </div>
      </div>
    </div>
  );
};

export default Header;
