export const fetchWeatherData = async (
  apiKey: string,
  apiUrl: string,
  location: string
) => { //request weather data by location (city name, zip code)
  const res = await fetch(`${apiUrl}?key=${apiKey}&q=${location}&aqi=no`);
  if (res.status === 400) {
    throw new Error("No matching location found.");
  }
  if (res.ok) {
    return res.json()
  }
  throw new Error("Something went wrong")
};
