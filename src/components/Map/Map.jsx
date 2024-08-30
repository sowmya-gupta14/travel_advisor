import React, {useState, useEffect} from "react";
import GoogleMapReact from "google-map-react";
import { Rating } from "./style";

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 600);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 600px)');

    const handleMediaChange = (event) => {
      setIsDesktop(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    // Cleanup listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  return isDesktop;
};

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "fallback-api-key";


const Map = ({ setCoordinates, setbounds, coordinates, places , setChildClicked, weatherData}) => {
  const isDesktop = useIsDesktop();

  return (
    <div className="h-[85vh] w-full sm:block">
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey}}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{disableDefaultUI: true, zoomControl: true}}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setbounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child)=> setChildClicked(child)}
      >
        {places.length && places?.map((place, i) => (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 hover:z-20"
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!isDesktop ? (
              <i class="fi fi-rc-marker"/>
            ) : (
              <div className="flex flex-col justify-center w-20 p-4 shadow-md bg-white rounded-md shadow-zinc-500">
                <p className="text-xs font-normal mb-1">{place.name}</p>
                <img
                  className="cursor-pointer"
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://th.bing.com/th/id/OIP.QD-OWx9DBu_Reu4ECijZBQAAAA?rs=1&pid=ImgDetMain"
                  }
                  alt={place.name}
                />
                <Rating
                  value={Number(place.rating)}
                 
                />
              </div>
            )}
          </div>
        ))}

        {weatherData?.list?.length && weatherData?.list?.map((data, i) => (
          <div key={i} lat={data.coord.latitude} lng={data.coord.longitude}>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="" className="h-[70px]" />

          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
