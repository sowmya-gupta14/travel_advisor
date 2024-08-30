import axios from 'axios';




export const getPlaceData= async (type,sw,ne) => {
    try{
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          },
          headers: {
            'x-rapidapi-key': 'd34aa9d12amshee3dad1d8911efcp1709e8jsnb90d6333136d',
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
          }
        });
        return data;

    }
    catch (error) {
        console.log(error)

    }
}

export const getWeatherData= async (lat, lng) => {
  try{
    if(lat && lng){
      const {data}= await axios.get('https://weather-api163.p.rapidapi.com/weather/getForecast', {
        params: {
          latitude: lat,
          longitude: lng,
        },
        headers: {
          'x-rapidapi-key': 'd34aa9d12amshee3dad1d8911efcp1709e8jsnb90d6333136d',
          'x-rapidapi-host': 'weather-api163.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
      });
      return data

    }
  }
  catch(error){
    console.log(error);
  }
}

