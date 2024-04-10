import { useState } from "react";
import "./App.css";
import Search from "./Components/Search/Search";
import CurrentWeather from "./Components/Current_weather/CurrentWeather";
import { API_KEY, WEATHER_API, FORECAST_API } from "./Components/api";
import Forecast from "./Components/Forecast/Forecast";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecasts, setForecast] = useState(null);
  let threeWeather
  if(forecasts){threeWeather = forecasts.list.slice(0,3)}
  let forecast;
  const keyword = "12:00:00";
  if(forecasts){
    forecast = forecasts.list.filter(item => item.dt_txt.includes(keyword));
  }
  console.log(forecast)
  const getSearchInfo = (info) => {
    const [latitude, longitude] = info.value.split(" ");
    // FETCH WEATHER DATA
    fetch(
      `${WEATHER_API}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setCurrentWeather(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // FETCH FORECAST DATA
    fetch(
      `${FORECAST_API}?lat=${latitude}&lon=${longitude}&cnt=40&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setForecast(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="App">
      <Search onSearchChange={getSearchInfo} />
      <div className="weatherApp">
        {currentWeather && <CurrentWeather data={currentWeather} hourFC={threeWeather} />}
        <div className="forecast">
          {forecast && <h3 className="heading">WEEKLY FORECAST</h3>}
          {forecast &&forecast.map((frcast, index) => {
              return <Forecast key={index} data={frcast} />;
            })
            }
        </div>
      </div>
    </div>
  );
}

export default App;
