import { dateT, weatherDataT } from '../App'
import { CityName, Flex, P, Temp, Title, WeatherDisplayDiv, WeatherInfo } from '../app.stayle'

type WeatherDisplayProps = Partial<weatherDataT & dateT>
const WeatherDisplay = ({temp_c,name,hour,min,dayName,day,monthName,year,text}: WeatherDisplayProps) => {
  return (
    <WeatherDisplayDiv>
        <Title>The Weather</Title>
        <WeatherInfo>
          <Temp>{temp_c?.toFixed()}&deg;</Temp>
          <div>
            <CityName>{name}</CityName>
            <span>
              {hour}:{min}-{dayName}, {day} {monthName}{" "}
              &apos;{year}
            </span>
          </div>
          <Flex flex_column ai_c>
            <img
              style={{ width: "auto", height: "auto" }}
              src="https://cdn.weatherapi.com/weather/64x64/day/113.png"
              alt="icon"
            />
            <P>{text}</P>
          </Flex>
        </WeatherInfo>
      </WeatherDisplayDiv>
  )
}

export default WeatherDisplay