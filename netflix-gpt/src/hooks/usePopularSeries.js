import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addPopularSeries } from "../utils/tvSlice";
const usePopularSeries = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getPopularSeries();
  }, []);
  const getPopularSeries = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
      API_OPTIONS
    );
    const data = await response.json();
    dispatch(addPopularSeries(data.results));
  };
};

export default usePopularSeries;
