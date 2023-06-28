import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import MovieListYear from "./category/MovieListYear";
import Detail from "./components/Detail";
import Header from "./components/Header";
import MovieListCountry from "./category/MovieListCountry";

import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import MovieSearch from "./components/MovieSearch";

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

      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<MovieSearch/>} />
          <Route path="/movie-detail/:movieId" element={<Detail/>} />
          <Route path="/log-in" />
          {/* <Route path="/sign-in" element={<Signin />} /> */}
          <Route path="/log-in" element={<Login />} />
          <Route path="/movie-year" element={<MovieListYear />}/> 
          <Route path="/movie-Country" element={<MovieListCountry />}/> 
        </Route>
      </Routes>

    </>
  );
}

export default App;
