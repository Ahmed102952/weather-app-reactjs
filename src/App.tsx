import { useEffect, useRef, useState } from "react";
import { IKContext, IKImage } from "imagekitio-react";
import { useGetWeather } from "./hooks/useGetWeather";
import { useQuery } from "react-query";

// styles
import {
  Flex,
  Title,
  Main,
  P,
  Panel,
  Temp,
  WeatherDisplay,
  WeatherInfo,
  CityName,
  SearchInput,
  Form,
  SearchBtn,
  ExtraInfo,
} from "./app.stayle";

// assests
import search from "./assets/search.png";

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
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { isLoading, isError, data, error } = useQuery<
    { weatherData: weatherDataT; date: dateT },
    Error
  >([location], () => useGetWeather(API_KEY, API_URL, location), {
    retry: false,
  });

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
              weatherData.skyState
            }.jpg`}
            width={window.innerWidth}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              left: 0,
              top: 0,
              objectFit: "cover",
              zIndex: -1,
            }}
          ></IKImage>
        ) : null}
      </IKContext>
      <WeatherDisplay>
        <Title>The Weather</Title>
        <WeatherInfo>
          <Temp>{weatherData.temp_c?.toFixed()}&deg;</Temp>
          <div>
            <CityName>{weatherData.name}</CityName>
            <span>
              {date.hour}:{date.min}-{date.dayName}, {date.day} {date.monthName}{" "}
              '{date.year}
            </span>
          </div>
          <Flex flex_column ai_c>
            <img
              style={{ width: "auto", height: "auto" }}
              src="https://cdn.weatherapi.com/weather/64x64/day/113.png"
              alt="icon"
            />
            <P>{weatherData.text}</P>
          </Flex>
        </WeatherInfo>
      </WeatherDisplay>
      <Panel>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchInputRef.current?.value === "") {
              window.alert("Please enter a location");
            } else {
              setLocation(searchInputRef.current?.value as string);
            }
            return;
          }}
        >
          <SearchInput
            type="search"
            name="location"
            id="location"
            placeholder="Location..."
            ref={searchInputRef}
            error={isError}
          />
          <SearchBtn type="submit">
            <img src={search} alt="Search" />
          </SearchBtn>
        </Form>
        {isError ? <p style={{ color: "red" }}>{error.message}</p> : null}
        <ExtraInfo>
          <P>Country</P>
          <P>{weatherData.country}</P>

          <P>Feels like</P>
          <P>{weatherData.feelslike_c.toFixed()}&deg;</P>

          <P>Clouds</P>
          <P>{weatherData.cloud}%</P>

          <P>Humidity</P>
          <P>{weatherData.humidity}%</P>

          <P>Wind Speed</P>
          <P>{weatherData.wind_kph}k/h</P>
        </ExtraInfo>
      </Panel>
    </Main>
  );
}

export default App;
