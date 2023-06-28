import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

import MovieListYear from "./category/MovieListYear";




import Signin from "./components/Signin";

import Detail from "./components/Detail";
import Header from "./components/Header";
import MovieListCountry from "./category/MovieListCountry";


const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    background: #e9ecef;
    color: black;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle/>
      {/* <Signin /> */}

      <Header />
      <MovieListYear />
      <MovieListCountry />

    </>
  );
}

export default App;
