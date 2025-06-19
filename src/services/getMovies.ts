import { API_BASE } from "@/configs/api";

export const GET_MOVIES = ({ queryKey }: { queryKey: any }) => {
  const queryParams = queryKey[1];

  return API_BASE.get(`/movie/${queryParams.filter}`, {
    params: queryParams.params,
  });
};

export const GET_SEARCH_MOVIES = ({ queryKey }: { queryKey: any }) => {
  const queryParams = queryKey[1];

  return API_BASE.get(`/search/movie`, {
    params: queryParams.params,
  });
};

export const GET_MOVIE = ({ queryKey }: { queryKey: any }) => {
  const queryParams = queryKey[1];
  return API_BASE.get(`/movie/${queryParams.movieId}`);
};
