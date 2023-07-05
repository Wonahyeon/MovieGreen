import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import MovieListYear from "./category/MovieListYear";
import MovieListGenre from "./category/MovieListGenre";
import Detail from "./components/MovieDetail";
import Header from "./components/Header";
import './App.css';

import MovieListCountry from "./category/MovieListCountry";

import { Route, Routes } from "react-router";
import Signin from "./pages/Signin";
import Login from "./pages/Login";
import MovieSearch from "./components/MovieSearch";
import CategoryHome from "./category/CategoryHome";
import MovieListContainer from "./category/MovieListContainer";
import Video from "./components/Video";
import Main from "./pages/Main";
import MovieListCustom from "./category/MovieListCustom";
import Community from "./pages/Commnuity";
import Footer from "./components/Footer";
import MovieDetail from "./components/MovieDetail";

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    color: black;
    box-sizing: border-box;
    font-family: 'Nanum Gothic', sans-serif;
  }

  * {
    box-sizing: inherit;
  }

  .cursor-pointer {
    cursor: pointer;
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
          <Route index element={<Main/>}/>
          <Route path="/search" element={<MovieSearch/>} />
          <Route path="/movie-detail/:movieId" element={<MovieDetail/>} />
          <Route path="/movie-community" element={<Community />}/>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/movie-category" element={<MovieListContainer />}>

            <Route path="/movie-category/year" element={<MovieListYear />}/> 
            <Route path="/movie-category/country" element={<MovieListCountry />}/> 
            <Route path="/movie-category/genre" element={<MovieListGenre />}/>
            <Route path="/movie-category/custom" element={<MovieListCustom />}/>
          

          <Route path="/movie-category/year" element={<MovieListYear />}/> 
          <Route path="/movie-category/country" element={<MovieListCountry />}/> 
          <Route path="/movie-category/genre" element={<MovieListGenre />}/>
          <Route path="/movie-category/custom" element={<MovieListCustom />}/>


          </Route> 
        </Route>
        {/* <Route element={<Footer />}/> */}
      </Routes>
      <Footer />
      
      
    </>
  );
}

export default App;
