import { API_BASE } from "@/configs/api";

export const GET_MOVIES = ({ queryKey }: { queryKey: any }) => {
  console.log(queryKey[1]);
  const queryParams = queryKey[1];
  console.log(import.meta.env.VITE_API_HOST);
  return API_BASE.get(`/movie/${queryParams.filter}`);
};

export const GET_MOVIE = ({ queryKey }: { queryKey: any }) => {
  const queryParams = queryKey[1];
  return API_BASE.get(`/movie/${queryParams.movieId}`);
};
