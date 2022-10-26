import styled, { css, createGlobalStyle } from "styled-components";
import {} from "styled-components/cssprop";

export const GlobalStyle = createGlobalStyle`
/* fonts */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&display=swap');

/* css var */
:root {
  /* spaces */
  --space-1: .5rem;
  --space-2: 1rem;
  --space-3: 2rem;
  --space-4: 3rem;
  --space-5: 5rem;
  --space-6: 7rem;

  /* font size */
  --fs-1: 0.5rem;
  --fs-2: 0.75rem;
  --fs-3: 1rem;
  --fs-4: 1.125rem;
  --fs-5: 1.5rem;
  --fs-6: 2rem;
  --fs-7: 3rem;
  --fs-8: 5rem;

  /* colors */
  --white: 0 0% 100%;
  --black: 0 0% 0%;
  --orange: 30 97% 46%
}

/* resets */

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role='list'],
ol[role='list'] {
  list-style: none;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
   scroll-behavior: auto;
  }
  
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

body {
  font-family: "Noto Sans", sans-serif;
  color: hsla(var(--white) / 1);
}

`;
export const Main = styled.main`
  min-height: 100vh;
  height: auto;
  display: grid;
  grid-template-columns: 3fr 2fr;

  @media screen and (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const WeatherDisplayDiv = styled.div`
  --space-y: var(--space-4);
  --space-x: var(--space-5);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  padding: var(--space-y) var(--space-x);
  padding-right: 0;

  @media (max-width: 1080px) {
    --space-x: var(--space-3);
  }
`;

export const Title = styled.h1`
  font-size: var(--fs-5);
  color: hsla(0 0% 100% / 100%);
`;

export const P = styled.p`
  font-size: var(--fs-4);
  color: hsla(var(--white) / 0.8);

  @media screen and (max-width: 1080px) {
    font-size: var(--fs-3);
  }
`;

export const WeatherInfo = styled.div`
  --gap: var(--space-2);
  display: flex;
  align-items: center;
  gap: var(--gap);
`;

interface FlexProps {
  flex_column?: boolean;
  ai_c?: boolean;
}

export const Flex = styled.div<FlexProps>`
  display: flex;

  ${({ flex_column }) =>
    flex_column
      ? css`
          flex-direction: column;
        `
      : ""}
  ${({ ai_c }) =>
    ai_c
      ? css`
          align-items: center;
        `
      : ""}
`;

export const Temp = styled.p`
  font-size: var(--fs-8);

  @media screen and (max-width: 1080px) {
    font-size: var(--fs-7);
  }
`;

export const PanelAside = styled.aside`
  --p-b: var(--space-3);
  --p-l: var(--space-3);
  display: flex;
  flex-direction: column;
  padding: 0 0 var(--p-b) var(--p-l);
  background-color: hsla(var(--black) / 0.1);
  backdrop-filter: blur(24px);
`;

export const CityName = styled.p`
  font-size: var(--fs-6);
  font-weight: 500;

  @media screen and (max-width: 1080px) {
    font-size: var(--fs-5);
  }
`;

export const Form = styled.form`
  --gap: var(--space-3);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--gap);
`;

interface SearchInputProps {
  readonly error?: boolean;
}
export const SearchInput = styled.input<SearchInputProps>`
  --py: var(--space-1);
  font-size: var(--fs-5);
  width: 100%;
  background: transparent;
  border: 0;
  border-bottom: 1px solid hsla(var(--white) / 0.7);
  padding-block: var(--py);
  color: hsla(var(--white) / 1);
  &:focus,
  &:focus-visible {
    outline: none;
  }
  ::placeholder {
    color: hsla(var(--white) / 0.8);
  }
  ${(props) =>
    props.error &&
    css`
      border-color: red;
    `}
`;

export const SearchBtn = styled.button`
  display: grid;
  place-content: center;
  background-color: hsla(var(--orange));
  border: 0;
  width: 100px;
  height: 100px;
  flex-grow: 1;
  img {
    width: 35px;
  }
  flex-grow: 1;
  cursor: pointer;

  @media screen and (max-width: 1080px) {
    width: 70px;
    height: 70px;

    img {
      width: 25px;
    }
  }
`;

export const ExtraInfo = styled.div`
  --gap-y: var(--space-3);
  --pt: var(--space-4);
  --pr: var(--space-6);
  --pb: var(--space-5);
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  row-gap: var(--gap-y);
  width: calc(100% - var(--pr));
  padding-top: var(--pt);
  padding-bottom: var(--pb);
  border-bottom: 1px solid hsla(var(--white) / 0.8);

  & > *:nth-child(2n) {
    justify-self: flex-end;
  }

  @media screen and (max-width: 1080px) {
    --pr: var(--space-4);
  }
`;
