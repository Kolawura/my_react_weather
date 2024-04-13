import { useState } from "react";
import "./App.css";
import Search from "./Components/Search/Search";
import CurrentWeather from "./Components/Current_weather/CurrentWeather";
import { API_KEY, WEATHER_API, FORECAST_API } from "./Components/api";
import Forecast from "./Components/Forecast/Forecast";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecasts, setForecast] = useState(null);
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const [searchLat, setSearchLat] = useState(0);
  const [searchLong, setSearchLong] = useState(0);
  const [IP, setIP] = useState(0);

  useEffect(()=>{
    const fetchIP = async()=>{
      try {
        const response = await fetch(`https://api.hostip.info/get_json.php`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data.ip);
        setIP(data.ip)
      } catch (error) {
        console.log("Error fetching IP address: ",error)
      }
    }
    fetchIP()
  },[])

  if (latitude === 0 && latitude === 0 && IP) {
    fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=3c820b128b5c4d27950bfa784429f38a&ip=${IP}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json()
      })
      .then((response) => {
        setlatitude(response.latitude);
        setlongitude(response.longitude);
      })
      .catch((error) => console.log('Error fetching Location: ', error));
  }
  let threeWeather;
  if (forecasts) {
    threeWeather = forecasts.list.slice(0, 3);
  }
  let forecast;
  const keyword = "12:00:00";
  if (forecasts) {
    forecast = forecasts.list.filter((item) => item.dt_txt.includes(keyword));
  }
  const getSearchInfo = (info) => {
    const [lat, long] = info.value.split(" ");
    setSearchLat(lat);
    setSearchLong(long);
  };
  let latit = 0;
  let longit = 0;
  if (searchLat!==0 && searchLong!==0) {
    latit = searchLat;
    longit = searchLong;
  } else if (latitude!==0 && longitude!==0) {
    latit = latitude;
    longit = longitude;
  }

  if(latit && longit){
    
  }

  // FETCH WEATHER DATA
  useEffect(() => {
    if(latit && longit){

    const fetch_Weather = async () => {
      try {
        const response = await fetch(
          `${WEATHER_API}?lat=${latit}&lon=${longit}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCurrentWeather(data);
      } catch (error) {
        console.error("Error fetching IP address: ", error);
      }
    };
    fetch_Weather();
  };
    return () => {};
  }, [latit, longit]);

  // FETCH FORECAST DATA
  useEffect(() => {
    if(latit && longit){
      
    const fetch_Forecast = async () => {
      try {
        const response = await fetch(
          `${FORECAST_API}?lat=${latit}&lon=${longit}&cnt=40&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setForecast(data);
      } catch (error) {
        console.error("Error fetching IP address: ", error);
      }
    };
    fetch_Forecast();
  };
    return () => {};
  }, [latit, longit]);

  return (
    <>
      <div className="App">
        <Search onSearchChange={getSearchInfo} />
        <div className="weatherApp">
          {currentWeather && (
            <CurrentWeather data={currentWeather} hourFC={threeWeather} />
          )}
          <div className="forecast">
            {forecast && <h3 className="heading">WEEKLY FORECAST</h3>}
            {forecast &&
              forecast.map((frcast, index) => {
                return <Forecast key={index} data={frcast} />;
              })}
          </div>
        </div>
      </div>
      <footer>
        Made with <span>❤️</span> by Kolawura
      </footer>
    </>
  );
}

export default App;
