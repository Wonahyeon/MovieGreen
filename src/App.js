import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import MovieListYear from "./category/MovieListYear";
import MovieListGenre from "./category/MovieListGenre";
import Detail from "./components/Detail";
import Header from "./components/Header";



import MovieListCountry from "./category/MovieListCountry";

import { Route, Routes } from "react-router";
import Signin from "./pages/Signin";
import Login from "./pages/Login";
import MovieSearch from "./components/MovieSearch";
import CategoryHome from "./category/CategoryHome";
import MovieListContainer from "./category/MovieListContainer";

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

      {/* <Header />
      <MovieListYear />
      <MovieListCountry /> */}
      {/* <CategoryHome /> */}
      <Routes>
        <Route path="/" element={<Header />}>

          <Route path="/s" element={<MovieSearch/>} />
          <Route path="/movie-detail/:movieId" element={<Detail/>} />

          <Route path="/sign-in" element={<Signin />} />
          <Route path="/log-in" element={<Login />} />
          
          <Route path="/movie-category" element={<MovieListContainer />}>
          <Route path="/movie-category/year" element={<MovieListYear />}/> 
          <Route path="/movie-category/country" element={<MovieListCountry />}/> 
          <Route path="/movie-category/genre" element={<MovieListGenre />}/>
          </Route> 
        </Route>
      </Routes>

    </>
  );
}

export default App;
