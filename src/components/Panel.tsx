import { FormEvent, useRef, useCallback } from "react";
import { dateT, weatherDataT } from "../App";
import {
  ExtraInfo,
  Form,
  P,
  PanelAside,
  SearchBtn,
  SearchInput,
} from "../app.stayle";

// assests
import search from "../assets/search.png";

type PanelProps = Partial<weatherDataT & dateT> & {
  changeLocation: (location: string) => void;
  isError: boolean;
  error?: Error | null;
};

const Panel = ({
  changeLocation,
  isError,
  error,
  country,
  cloud,
  feelslike_c,
  humidity,
  wind_kph,
}: PanelProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const formHandle = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInputRef.current?.value === "") {
      window.alert("Please enter a location");
    } else {
      changeLocation(searchInputRef.current?.value as string);
    }
    return;
  }, []);
  return (
    <PanelAside>
      <Form onSubmit={formHandle}>
        <SearchInput
          type="search"
          name="location"
          id="location"
          placeholder="Location..."
          ref={searchInputRef}
        />
        <SearchBtn type="submit">
          <img src={search} alt="Search" />
        </SearchBtn>
      </Form>
      {isError && error ? (
        <p style={{ color: "red" }}>{error.message}</p>
      ) : null}
      <ExtraInfo>
        <P>Country</P>
        <P>{country}</P>

        <P>Feels like</P>
        <P>{feelslike_c?.toFixed()}&deg;</P>

        <P>Clouds</P>
        <P>{cloud}%</P>

        <P>Humidity</P>
        <P>{humidity}%</P>

        <P>Wind Speed</P>
        <P>{wind_kph}k/h</P>
      </ExtraInfo>
    </PanelAside>
  );
};

export default Panel;
