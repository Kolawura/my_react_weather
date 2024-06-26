import React from "react";

const Forecast = ({ data }) => {
  const date = new Date(data.dt_txt).getDay();
  const day = date.toLocaleString();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="forecastDay">
      <div>
        <h3>{days[day]}</h3>
        <p>
        <img className="forecastImg" alt="weather icon"
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          />{" "}
          {data.weather[0].description}
        </p>
      </div>
      <div>
        <p>
          <i className="fas fa-temperature-half"></i> {data.main.temp}°C
        </p>
        <p>
          <i className="fas fa-cloud"></i> {data.clouds.all}%
        </p>
      </div>
      <div>
        <p>
          <i className="fas fa-wind"></i> {data.wind.speed}m/s
        </p>
        <p>
          <i className="fas fa-droplet"></i> {data.main.humidity}%
        </p>
      </div>
    </div>
  );
};

export default Forecast;
