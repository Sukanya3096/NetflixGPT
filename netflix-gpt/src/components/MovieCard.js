import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ movie }) => {
  return (
    <div className="w-64 pr-4">
      <img src={IMG_CDN_URL + movie.poster_path} alt="movie" />
    </div>
  );
};

export default MovieCard;
