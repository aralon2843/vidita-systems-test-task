import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    *, input {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 14px;
  }
  ul {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  
  form, input, textarea {
    font-family: inherit;
    font-size: inherit;
  }
`;

export default GlobalStyles;
