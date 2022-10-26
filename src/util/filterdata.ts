import { formatDate } from "./formatDate";

interface API_DATA_TYPE {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    wind_kph: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    is_day: number;
    temp_c: number;
    condition: {
      code: number;
      icon: string;
      text: string;
    };
  };
}
export const filterData = (weatherData: API_DATA_TYPE) => {
  // take data back from api and take needed data from the app and return it with the formated date
  const {
    location: { name, country, localtime },
    current: {
      wind_kph,
      humidity,
      cloud,
      feelslike_c,
      is_day,
      temp_c,
      condition: { code, icon, text },
    },
  } = weatherData;

  const date = formatDate(localtime);

  return {
    weatherData: {
      name,
      country,
      wind_kph,
      humidity,
      cloud,
      feelslike_c,
      is_day,
      temp_c,
      code,
      icon,
      text,
    },
    date: { ...date },
  };
};
