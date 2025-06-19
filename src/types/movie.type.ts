export type CompanyType = {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
};

export type GenreType = {
  id: number;
  name: string;
};

export type PaginationType<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type MovieData = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  runtime: number;
  genres: GenreType[];
  production_companies: CompanyType[];
};

export interface MovieResponse extends PaginationType<MovieData> {}
