import axios from "axios";

const getMovie = async () => {
  try {
    const response = await axios.get('https://openapi.naver.com/v1/search/movie.json');

  } catch (error) {
    console.error(error);
  }
}