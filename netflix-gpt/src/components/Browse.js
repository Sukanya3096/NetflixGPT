import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainMoviesContainer from "./MainMoviesContainer";
import SecondaryMoviesContainer from "./SecondaryMoviesContainer";
const Browse = () => {
  useNowPlayingMovies();
  return (
    <div>
      <Header />
      <MainMoviesContainer />
      <SecondaryMoviesContainer />
    </div>
  );
};

export default Browse;
