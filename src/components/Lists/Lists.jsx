import React, { useState, useEffect, createRef } from "react";
import PlaceDetails from "../PlaceDetails/PlaceDetails.jsx";
import { CircularProgress } from "@mui/material";

const Lists = ({ places, childClicked, isLoading ,type, setType, rating, setRating}) => {
  

  const [elRefs, setElRefs] = useState([]);
  console.log(childClicked);

  useEffect(() => {
    setElRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  return (
    <div>
      <h4 className="text-lg">Food and Attractions around you</h4>
      {isLoading ? (
        <div className="flex justify-center items-center h-[600px]">
          <CircularProgress size="5rem"></CircularProgress>
        </div>
      ) : (
        <>
          <div className="flex">
            <form action="" className="mt-2 mx-0 w-1/2">
              <label htmlFor="type" className="block text-gray-700">
                Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="restaurants">Restaurants</option>
                <option value="hotels">Hotels</option>
                <option value="attractions">Attractions</option>
              </select>
            </form>

            <form action="" className="mt-2 w-1/2 ml-3">
              <label htmlFor="type" className="block text-gray-700">
                Type
              </label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={0}>All</option>
                <option value={3}>Above 3.0</option>
                <option value={4}>Above 4.0</option>
                <option value={4.5}>Above 4.5</option>
              </select>
            </form>
          </div>

          <div className="flex flex-wrap -mx-3 mt-6 h-[75vh] overflow-scroll">
            {places?.map((place, i) => (
              
              <div ref={elRefs[i]} key={i} className="w-full flex flex-col px-3 py-3">
                
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                />
                
              </div>
            ))}
          </div>
        </>
      )};
    </div>
  );
};

export default Lists;
