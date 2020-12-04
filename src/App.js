import React, { useState } from 'react';
import './App.css';

const api = {
  key: "6147855f6b5e3becef77d9afa022b248",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const [isMetric, setIsMetric] = useState(true);
  const [currentTemp, setCurrentTemp] = useState();
  const [hi, setHi] = useState();
  const [low, setLow] = useState();

  function switchMetric() {

    let celsius = Math.round((weather.main.temp));
    let fahrenheit = Math.round(celsius * (9/5) + 32);     
    
    let celsiusHi = Math.round((weather.main.temp_max));
    let fahrenheitHi = Math.round(celsiusHi * (9/5) + 32);
    
    let celsiusLow = Math.round((weather.main.temp_min));
    let fahrenheitLow = Math.round(celsiusLow * (9/5) + 32);

    if(isMetric){

      setIsMetric(false)
      setCurrentTemp(fahrenheit + "°f") ;
      setHi(fahrenheitHi);
      setLow(fahrenheitLow);
    }
      else{
      setIsMetric(true);
      setCurrentTemp(celsius + "°c");
      setHi(celsiusHi);
      setLow(celsiusLow);
      }
  }

  const search = e => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result); 
          setCurrentTemp(Math.round(result.main.temp)+ "°c") ;
          setHi(Math.round(result.main.temp_max));
          setLow(Math.round(result.main.temp_min));
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month}, ${date}  ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp" onClick={()=> switchMetric()}>
              {currentTemp}
            </div>
            <div className="hiLow">Hi:{hi} | Low:{low} </div>
            <div className="weather">{weather.weather[0].main}</div>
            <div id="menuToggle" className="convert" onClick={()=> switchMetric()}>
              
                <span className={isMetric ? "rounded celsius" : "rounded"}>°C</span>
                <span className={isMetric ? "rounded" : "rounded fahrenheit"}>°F</span>
              
            </div>
          </div>
        </div> 
        ) : ('')}
      </main>
    </div>
  );
}

export default App;