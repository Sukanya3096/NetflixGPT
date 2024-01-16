import { useSelector } from "react-redux";
import { MoviesList } from "./MoviesList";

const SecondaryMoviesContainer = () => {
  const movies = useSelector((store) => store.movies);
  const tvSeries = useSelector((store) => store.tv);
  return (
    <div className="relative z-20 -mt-56">
      <MoviesList
        title={"Now Playing Movies"}
        movies={movies.nowPlayingMovies}
      />
      <MoviesList title={"Popular Movies"} movies={movies.popularMovies} />
      <MoviesList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
      <MoviesList title={"Popular TV Series"} movies={tvSeries.popularSeries} />
    </div>
  );
};

export default SecondaryMoviesContainer;
