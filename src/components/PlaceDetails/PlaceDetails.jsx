import React from "react";
import { Rating } from "../Map/style";

const PlaceDetails = ({ place, selected, refProp }) => {
  
  if(selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' } );

  return (
    <div className="flex flex-col gap-4">
      <div className="card  bg-white shadow-xl shadow-zinc-600 rounded-lg">
        <div
          className="bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              place.photo
                ? place.photo.images.large.url
                : "https://th.bing.com/th/id/OIP.QD-OWx9DBu_Reu4ECijZBQAAAA?rs=1&pid=ImgDetMain"
            })`,
            height: "250px",
          }}
          title={place.name}
        />
        <div className="px-4 py-3">
          <h5 className="text-lg font-semibold mb-2">{place.name}</h5>

          <div className="flex justify-between">
            <Rating value={Number(place.rating)} />
            <h3 className="text-sm">{place.num_reviews} review{place.num_reviews >1 && 's'}</h3>
          </div>

          <div className="flex justify-between">
            <h3 className="text-md">price</h3>
            <h3 className="text-sm">{place.price_level}</h3>
          </div>

          <div className="flex justify-between">
            <h3 className="text-md">ranking</h3>
            <h6 className="text-sm">{place.ranking}</h6>
          </div>

          {place?.awards?.map((award) => (
            <div className="flex justify-between items-center my-1">
              <img src={award.images.small} alt={award.display_name} />
              <h2>{award.display_name}</h2>
            </div>
          ))}

          <div className="mt-2">
            {place?.cuisine?.map(({ name }) => (
              <div
                key={name}
                className="inline-flex items-center bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full mr-2 mb-2"
              >
                {name}
              </div>
            ))}
          </div>

          {place.address && (
            <p className="text-gray-500 text-sm justify-between mt-2 mb-2 flex items-center ">
              <div className="mt-0 pt-0 align-top m-2">
                <i class="fi fi-sr-marker"></i>
              </div>
              {place.address}
            </p>
          )}

          {place.phone && (
            <p className="text-gray-500 text-sm  mb-2 flex items-center ">
              <div className="pt-0 align-top m-2">
                <i class="fi fi-sr-phone-call"></i>
              </div>
              {place.phone}
            </p>
          )}

          <div className="flex gap-8 mt-4">
            <button
              className="text-sm w-28 border border-blue-400 rounded-xl p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-300"
              onClick={() => window.open(place.web_url, "_blank")}
            >
              Trip Advisor
            </button>
            <button
              className="text-sm w-28 border border-blue-400 rounded-xl p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-300"
              onClick={() => window.open(place.website, "_blank")}
            >
              Website
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PlaceDetails;
