import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *, html {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  input, button, a, select {
    background-color: transparent;
    border: none;
    all: unset;

    &:focus {
      border: none;
    }
  }

  body {
    background-color: #333;
    background-image: url('../assets/background.jpg');
    background-repeat: no-repeat center center;
    background-size: cover;
  }
`;
