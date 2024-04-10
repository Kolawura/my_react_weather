import React from "react";

const CurrentWeather = ({ data, hourFC }) => {
  //  eslint-disable-next-line
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });

  return (
    <div className="currentWeather">
      <div className="top">
        <h3 className="heading">CURRENT WEATHER</h3>
        <div>
          <div>
            <h4>
              {data.name}, {data.sys.country}
            </h4>
            <p>
              Today {day}th of {month}{" "}
            </p>
          </div>
          <div>
            <h4>{data.main.temp}°C</h4>
            <p>{data.weather[0].description}</p>
          </div>
          <img alt="weather icon"
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          />
        </div>
      </div>
      <div className="middle">
        <h3 className="heading">AIR CONDITIONS</h3>
        <div>
          <div>
            <p>
              <i className="fas fa-temperature-half"></i> Real Feel
            </p>
            <h4>{data.main.feels_like}°C</h4>
          </div>
          <div>
            <p>
              <i className="fas fa-wind"></i> Wind
            </p>
            <h4>{data.wind.speed}m/s</h4>
          </div>
          <div>
            <p>
              <i className="fas fa-cloud"></i> Cloud
            </p>
            <h4>{data.clouds.all}%</h4>
          </div>{" "}
          <div>
            <p>
              <i className="fas fa-droplet"></i> Humidity
            </p>
            <h4>{data.main.humidity}%</h4>
          </div>
        </div>
      </div>
      <div className="bottom">
        <h3 className="heading">TODAY'S FORECAST</h3>
        <div>
          {
            //
            hourFC &&
              hourFC.map((data) => {
                const forcastDates = new Date(data.dt_txt);
                const hours = forcastDates.getHours();
                const minutes = forcastDates.getMinutes();
                const forcastDate = `${hours}:${minutes}0`;
                console.log(forcastDate);
                return (
                  <div>
                    <p>{forcastDate}</p>
                    <img alt="weather icon"
                      src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    />
                    <p>{data.main.temp}°C</p>
                  </div>
                );
              })
          }
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
