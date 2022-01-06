import { Country, State, City }  from 'country-state-city';
import React, { useState, useEffect } from "react";
import './search.scss';
import { CardData } from '../results-card/card';
import Maps from '../maps/maps';

const countryData = Country.getAllCountries();
const cityData = City.getAllCities();


export default function Search() {
  const [long, setLong] = useState("77.2090");
  const [lat, setLat] = useState("28.6139");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [availableCities, setAvailableCities] = useState();
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const [text, setText] = useState("");
  const [getCurrentLocation, setCurrentLocation] = useState(false);
  

useEffect(() => {
    const availableCities = City.getCitiesOfCountry(selectedCountry);
    setAvailableCities(availableCities)
}, [selectedCountry]);

function handleOnChange(e) {
    setSelectedCity(e.target.value)
}

useEffect(() => {
    getWeatherData(lat, long)
}, [lat, long]);


const onSubmit = evt => {
  evt.preventDefault();
  if (text === "") {
    alert("Please enter something!");
  } else {
    cityData.find(element => {
      if(element.name.toLowerCase() === text.toLowerCase()) {
          setLat(element.latitude);
          setLong(element.longitude);
      }
    });
  }
};

const onChange = evt => {
  evt.preventDefault();
  setText(evt.target.value);
}


function getWeatherData (lat, long) {

    const weatherApi = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=57f9266a3897ce5ad3e5eed62c4601ee`;

    fetch(weatherApi)
    .then(response => response.json())
    .then(
      (result) => {
        setWeatherData(result);
  
      },
    );
}


function handleClick () {

    if(availableCities.length > 0) {
      availableCities.find(element => {
        if(element.name === selectedCity) {
            setLat(element.latitude);
            setLong(element.longitude);
        }
      });
    } else {
        if(selectedCountry) {
          const countryData = Country.getCountryByCode(selectedCountry)
          setLat(countryData.latitude);
          setLong(countryData.longitude);
      };
    }
}

function handleCurrentLocation () {
  setCurrentLocation(true);
  getWeatherDataOnCurrLoc();
}

function getWeatherDataOnCurrLoc() {
  if (getCurrentLocation) {
    const success = (position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      getWeatherData(position.coords.latitude, position.coords.longitude);
      setCurrentLocation(false);

    }
  
    const error = () => {
      alert('Unable to retrieve location.');
    }
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert('Your browser does not support location tracking, or permission is denied.');
    }
  }
}

  return (
    <>
    <div id="container">
    <div className="searchAndLocationCTA">
      <button className="current-location"
          onClick={handleCurrentLocation}
      >
            Current Location
      </button>
      <div className="search-input">
          <form onSubmit={onSubmit} className="">
            <input
              type="text"
              name="text"
              id="search-box"
              placeholder="search city..."
              value={text || ''}
              onChange={onChange}
              className=""
            />
            <button type="submit" id="search-btn" className="">
              Search
            </button>
          </form>
        </div>
    </div>

    <div className="CityAndCountrSelector">

      <div className="search-field country-select">
        <label className="search-label"></label>
        <select
          className="search-select"   
          placeholder="Country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option>--Choose Country--</option>
          {countryData.map((value, key) => {
            return (
              <option value={value.isoCode} key={key}>
                {value.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="search-field">
        <label className="search-label"></label>
        <select
          className="search-select"
          placeholder="City"
          value={selectedCity}
          onChange={handleOnChange}
        >
          <option>--Choose City--</option>
          {availableCities ? availableCities.map((value, key) => {
            return (
              <option value={value.name} key={key} lang={value.longitude} lat={value.latitude}>
                {value.name}
              </option>
            );
          }) : ""}
        </select>
      </div>
      <button className="search-submit"
          onClick={handleClick}
      >
            Submit
      </button>
    </div>
    </div>

    {
        weatherData ? <div className="results-container" style={{ backgroundImage: `url(${require("../../images/mountains.jpg")})` }}><CardData data={weatherData} /> <Maps data={weatherData} lat = {lat} long = {long} className="google-maps"/></div> : ""
    }
    
    </>
  );
}
