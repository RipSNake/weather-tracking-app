import axios from 'axios';
import { OPEN_WEATHER_MAP_ORG_KEY } from '../../env';
import { 
  OPEN_WEATHER_URL,
  OPEN_WEATHER_HOST,
  OPEN_WEATHER_KEY, 
  API_REQ_TYPE,
  ENDPOINTS,
  mapBaseURL} from './weatherServiceUtils';

const baseURL = OPEN_WEATHER_URL;



const headers = {
  'x-rapidapi-host': OPEN_WEATHER_HOST,
  'x-rapidapi-key': OPEN_WEATHER_KEY
};


/**
 * Gets the information from the reqType corresponding endpoint
 * 
 * Accepted values are: 'find', 'weather', 'climate/month',
 * 
 * @param reqType FIND, WEATHER, CLIMATE
 * @param city Object with city information { name, country, lat, lon}
 */
export const getWeather: any(reqType: any, city: { name: any; country: any; }) {
  let options = {
    method: 'GET',
    baseURL,
    params: {
      q: `${city.name},${city.country}`, //city
      // lat: '0',
      // lon: '0',
      //callback: 'test', --> to use with the response body
      //id: '2172797', --> if the city id is known
      lang: 'null', // --> looking for a traduction ?
      units: 'imperial', // unit to show temp and data
      //mode: 'xml'
    },
    headers 
  };

  switch(reqType) {
    case API_REQ_TYPE.SEARCH:
      options.url = ENDPOINTS.FIND;
    break;
    case API_REQ_TYPE.FORECAST:
      options.url = ENDPOINTS.FORECAST;
    break;
    case API_REQ_TYPE.WEATHER:
      options.url = ENDPOINTS.WEATHER;
    break;
    default:
      options.url = ENDPOINTS.WEATHER;
    break;
  }
  
  axios.request(options).then(function (response) {
    return response.data;
    //console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

export const getMap = (layer='TA2', zoom='', xCoordinate, yCoordinate) => {
  // 2 meter weather layer: TA2
  const url = `mapBaseURL${layer}/${zoom}/${xCoordinate}/${yCoordinate}.png?appid=${OPEN_WEATHER_MAP_ORG_KEY}`;

  axios.get(url).then(res => console.log('MAP RESPONSE', res)).catch(e => console.log('ERROR HAPPENED ', e));
  
};

/*
Current Weather Response Example
test({
  "coord":{
    "slon":-0.1257,
    "lat":51.5085
  },"weather":[{
      "id":804,
      "main":"Clouds",
      "description":"overcast clouds",
      "icon":"04n"
    }],
    "base":"stations",
    "main":{
      "temp":50.88,
      "feelslike":49.89,
      "tempmin":48.36,
      "temp_max":52.56,
      "pressure":1027,
      "humidity":90
    },
    "visibility":10000,
    "wind":{
      "speed":2.3,
      "deg":0
    },
    "clouds":{
      "all":90
    },
    "dt":1636933717,
    "sys":{
      "type":2,
      "id":2019646,
      "country":"GB",
      "sunrise":1636874224,
      "sunset":1636906382
    },
    "timezone":0,
    "id":2643743,
    "name":"London",
    "cod":200
  }
)


Search Weather :
  By city name. Input the city name or its part and get the list of the most proper cities in the world. 
  Example - Lon or Lond or London. The more precise city name you put the more precise list you will get. 
  To make it more precise put the city's name or its part, comma, the name of the county or 2-letter 
  country code. You will get all proper cities in chosen county. The order is important - the first is 
  city name than comma than county. Example - Lon, UK or Lon, GB or London, GB or Lon, England. 
  By geographic coordinates.





  FORECAST:
  Response.body:
  {
    "cod":"200"
    "city":{
      "id":2451778
      "name":"San"
      "coord":{
        "lon":-4.8956
        "lat":13.3034
        }
      "country":"ML"
    }
    "message":0.464821192
    "list":[
      0:{
        "dt":1636934400 // date time
        "humidity":37.87
        "pressure":997.21
        "temp":{
          "average":300.26
          "average_max":306.66
          "average_min":294.26
          "record_max":311.15
          "record_min":289.15
        }
        "wind_speed":3.39
      }
      1:{...
      }
      2:{...
      }
      ...
      29:{...
      }
    ]
  }

  ICONS UTILS:
  How to get icon URL

  For code 500 - light rain icon = "10d". See below a full list of codes
  URL is http://openweathermap.org/img/wn/10d@2x.png
*/