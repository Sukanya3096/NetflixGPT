import { useEffect } from "react";
import { API_OPTIONS, TRAILER } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const getMovieVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    const trailers = json.results.filter((video) => video.type === TRAILER);
    const mainTrailer = trailers.length === 0 ? json.results[0] : trailers[0];
    dispatch(addTrailerVideo(mainTrailer));
  };
  useEffect(() => {
    getMovieVideos();
  }, [movieId]);
};

export default useMovieTrailer;
