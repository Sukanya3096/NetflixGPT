import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainMoviesContainer from "./MainMoviesContainer";
import SecondaryMoviesContainer from "./SecondaryMoviesContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import usePopularSeries from "../hooks/usePopularSeries";
const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  usePopularSeries();
  return (
    <div>
      <Header />
      <MainMoviesContainer />
      <SecondaryMoviesContainer />
    </div>
  );
};

export default Browse;
