import { formatDate } from "./formatDate";

export const filterData = (weatherData: any) => {
  const { name, country, localtime } = weatherData.location as {
    name: string;
    country: string;
    localtime: string;
  };

  const { wind_kph, humidity, cloud, feelslike_c, is_day, temp_c } =
    weatherData.current as {
      wind_kph: number;
      humidity: number;
      cloud: number;
      feelslike_c: number;
      is_day: number;
      temp_c: number;
    };

  const { code, icon, text } = weatherData.current.condition as {
    code: number;
    icon: string;
    text: string;
  };
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
