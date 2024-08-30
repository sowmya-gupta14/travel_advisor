import React, { useEffect, useState } from "react";
import { getPlaceData, getWeatherData } from "./api";
import Header from "./components/Header/Header";
import Lists from "./components/Lists/Lists";
import Map from "./components/Map/Map";
//import 'dotenv/config';

const App = () => {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [coordinates, setCoordinates]= useState({});
  const [bounds , setbounds]= useState({});

  
  const [weatherData, setWeatherData]= useState([]);
  const [filteredPlaces, setFilteredPlaces]= useState([])
  const [places, setplaces]= useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords : {latitude, longitude}}) => {
      setCoordinates({lat: latitude, lng: longitude});

    });
  }, [] );

  useEffect(() =>{
    const filteredPlaces= places.filter((place) => Number(place.rating) > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    if(bounds){
      setIsLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng)
        .then((data) => setWeatherData(data));
    
      getPlaceData(type, bounds.sw, bounds.ne)
        .then((data) => {
          console.log(data);
          setplaces(data.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
          setRating('');
          setIsLoading(false);
        });
    }
  }, [type, bounds]);

  const onLoad= (autoC)=> setAutocomplete(autoC);
 
  const onPlaceChanged= () => {
   const lat= autocomplete.getPlace().geometry.location.lat();
   const lng= autocomplete.getPlace().geometry.location.lng();

   setCoordinates({lat, lng});

  };

  return (
    <div>
      <div className="m-2">
        <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      </div>

      <div className="mx-auto p-2">
        <div className="flex gap-4">
          <div className="sm:w-full md:w-1/3 p-3">
            <Lists 
              places={filteredPlaces.length? filteredPlaces : places}
              childClicked={childClicked}
              isLoading={isLoading}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </div>
          <div className="w-full md:w-2/3 p-3 flex justify:center items:center">
            <Map
              setCoordinates={setCoordinates}
              setbounds={setbounds} 
              coordinates={coordinates}
              places={filteredPlaces.length? filteredPlaces : places}
              setChildClicked={setChildClicked}
              weatherData={weatherData}
            
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
