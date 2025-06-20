import { useState, type ChangeEvent } from "react";
import { MovieCard, type Movie } from "@/components/card/MovieCard";
import { Input } from "@/components/ui/input";
import { GET_MOVIES, GET_SEARCH_MOVIES } from "@/services/getMovies";
import { useQuery } from "react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Loading from "@/components/states/Loading";
import Error from "@/components/states/Error";
import { Pagination } from "@/components/pagination/Pagination";
import type { MovieResponse } from "@/types/movie.type";

const options = [
  { value: "now_playing", label: "Now Playing" },
  { value: "popular", label: "Popular" },
  { value: "top_rated", label: "Top Rated" },
  { value: "upcoming", label: "Up Coming" },
];

export default function Movies() {
  const [filter, setFilter] = useState("popular");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [movies, setMovies] = useState<MovieResponse | null>(null);
  const [page, setPage] = useState(1);

  const { isLoading, isError } = useQuery({
    queryFn: search ? GET_SEARCH_MOVIES : GET_MOVIES,
    queryKey: [
      "getMoviews",
      {
        filter,
        params: {
          query: search,
          page,
        },
      },
    ],
    onSuccess: ({ data }: { data: MovieResponse }) => {
      setMovies(data);
    },
  });

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const DELAY_SEARCH = 2000;
    let timer;

    clearTimeout(timer);

    timer = setTimeout(() => {
      setSearch(event.target.value);
    }, DELAY_SEARCH);
  };

  const handleChangeFilter = (value: string) => {
    setFilter(value);
  };

  if (isLoading) <Loading />;

  if (isError) <Error />;

  if (!isLoading && !movies?.results.length)
    <Error message="Result not found!" />;

  return (
    <div className="container px-2 md:px-10 mx-auto pb-10">
      <div className="relative w-full py-4">
        <Input
          placeholder="Search movie..."
          className="w-full relative"
          onChange={handleSearch}
        />
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
            >
              ▼
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[300px]">
            {options.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onSelect={() => handleChangeFilter(option.value)}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${filter === option.value ? "opacity-100" : "opacity-0"}`}
                />
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-4">
        {movies?.results.map((movie: Movie, index: number) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
      {movies && (
        <Pagination count={movies?.total_pages} page={page} setPage={setPage} />
      )}
    </div>
  );
}
