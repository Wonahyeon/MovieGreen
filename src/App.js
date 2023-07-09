import reset from "styled-reset";
import './App.css';
import { createGlobalStyle } from "styled-components";
import { Route, Routes } from "react-router";
import MovieListYear from "./category/MovieListYear";
import MovieListGenre from "./category/MovieListGenre";
import Header from "./components/Header";
import MovieListCountry from "./category/MovieListCountry";
import Signin from "./pages/Signin";
import Login from "./pages/Login";
import MovieSearch from "./components/MovieSearch";
import MovieListContainer from "./category/MovieListContainer";
import Main from "./pages/Main";
import MovieListCustom from "./category/MovieListCustom";
import Community from "./pages/Commnuity";
import Footer from "./components/Footer";
import MovieDetail from "./components/MovieDetail";
import LiveChat from "./pages/LiveChat";
import Chatbot from "./pages/Chatbot";

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    box-sizing: border-box;
    font-family: 'Nanum Gothic', sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  .cursor-pointer {
    cursor: pointer;
  }
`;

function App() {

  
  return (
    <>
      <GlobalStyle/>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Main/>}/>
          <Route path="/search" element={<MovieSearch/>} />
          <Route path="/movie-detail/:movieId" element={<MovieDetail/>} />
          <Route path="/movie-community" element={<Community />}/>
          <Route path="/live-chat" element={<Chatbot />}/>
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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
