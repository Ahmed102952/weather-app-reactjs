import { fetchWeatherData } from "../services/fetchWeatherData";
import { filterData } from "../util/filterdata";
import { setSkyState } from "../util/setSkyState";

export const useGetWeather = async (
  apiKey: string,
  apiUrl: string,
  location: string
) => {
  try {
    const res = await fetchWeatherData(apiKey, apiUrl, location);
    const { weatherData, date } = filterData(await res);
    const skyState = setSkyState(weatherData.code);
    return { weatherData: { ...weatherData, skyState }, date: { ...date } };
  } catch (error) {
    throw error
  }
};
