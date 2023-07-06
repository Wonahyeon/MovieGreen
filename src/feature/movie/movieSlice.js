import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api_key = '43af09871fd391abc84a35b271386b01';

export const searchMovies = createAsyncThunk('movie/searchMovies', async (query) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key,
        query,
        region: 'KR',
        language: 'ko-KR',
      },
    });
    const movies = response.data.results;
    return movies;
  } catch (error) {
      console.error(error.message);
      throw error;
  }
});

// 장르
export const fetchMovieDetails = createAsyncThunk('movie/fetchMovieDetails', async (movieId) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
      params: {
        api_key,
        language: 'ko-KR',
        append_to_response: 'release_dates',
      },
    });
    const movieDetails = response.data;
    return movieDetails;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
});

// 감독, 출연
export const fetchMovieCredits = createAsyncThunk('movie/fetchMovieCredits', async (movieId) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
      params: {
        api_key,
        language: 'ko-KR'
      },
    });
    const movieCredits = response.data;
    return movieCredits;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
});

const initialState = {
  searchResults : [],
  selectedMovie: [],
  movieDetails: null,
  movieCredits: null,
  status: 'idle',
  error: null,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    selectMovie: (state, action) => {
      state.selectedMovie= action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movieDetails = action.payload;

        // 관람 등급 정보 추출
        const releaseDates = action.payload.release_dates?.results;
        if (releaseDates) {
          const certifications = releaseDates.filter((date) => date.iso_3166_1 === 'KR');
          state.movieDetails.certifications = certifications;
        }
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMovieCredits.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMovieCredits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movieCredits = action.payload;
      })
      .addCase(fetchMovieCredits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export const { selectMovie } = movieSlice.actions;

export default movieSlice.reducer;