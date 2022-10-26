import React, { FormEvent, useEffect, useRef, useState } from "react";
import { IKContext, IKImage } from "imagekitio-react";
import { useGetWeather } from "./hooks/useGetWeather";
import { useQuery } from "react-query";

// styles
import {
  Flex,
  Title,
  Main,
  P,
  Temp,
  WeatherInfo,
  CityName,
  SearchInput,
  Form,
  SearchBtn,
  ExtraInfo,
} from "./app.stayle";

// assests
import search from "./assets/search.png";
import WeatherDisplay from "./components/WeatherDisplay";
import Panel from "./components/Panel";

// types
export interface weatherDataT {
  skyState: string;
  name: string;
  country: string;
  wind_kph: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  is_day: number;
  temp_c: number;
  code: number;
  icon: string;
  text: string;
}
export interface dateT {
  hour: string;
  min: string;
  dayName: string;
  day: number;
  year: string;
  monthName: string;
}

// API
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_WEATHER_DATA = {
  name: "",
  country: "",
  wind_kph: 0,
  humidity: 0,
  cloud: 0,
  feelslike_c: 0,
  is_day: 0,
  temp_c: 0,
  code: 0,
  icon: "",
  text: "",
  skyState: "",
};
const DEFAULT_DATE = {
  hour: "",
  min: "",
  dayName: "",
  day: 0,
  year: "",
  monthName: "",
};
const DEFAULT_LOCATION = "London";

function App() {
  const [location, setLocation] = useState(
    localStorage.getItem("location")
      ? (localStorage.getItem("location") as string)
      : DEFAULT_LOCATION
  );
  const [weatherData, setWeatherData] = useState(DEFAULT_WEATHER_DATA);
  const [date, setDate] = useState(DEFAULT_DATE);

  const { isError, data, error } = useQuery<
    { weatherData: weatherDataT; date: dateT },
    Error
  >([location], () => useGetWeather(API_KEY, API_URL, location), {
    retry: false,
  });

  const changeLocation = (location: string) => {
    setLocation(location)
  }

  useEffect(() => {
    if (!isError && data) {
      setDate(data.date);
      setWeatherData(data.weatherData);
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem("location", location);
  }, [location]);

  return (
    <Main>
      <IKContext urlEndpoint="https://ik.imagekit.io/b85lgzght1m/">
        {data ? (
          <IKImage
            path={`weather-app/images/${weatherData.is_day ? "day" : "night"}/${
              weatherData.skyState ? weatherData.skyState : "clear"
            }.jpg`}
            width={window.innerWidth}
            style={{
              width: "100vw",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              objectFit: "cover",
              zIndex: -1,
            }}
          />
        ) : null}
      </IKContext>
      <WeatherDisplay {...weatherData} {...date}/>
      <Panel {...weatherData} error={error} isError={isError} changeLocation={changeLocation}/>
      
    </Main>
  );
}

export default App;
