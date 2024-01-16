import MovieCard from "./MovieCard";

export const MoviesList = ({ title, movies }) => {
  return (
    <div className="py-4 pl-20">
      <h1 className="text-2xl py-6 text-white opacity-80 font-mono font-medium 5x">
        {title}
      </h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
