import { useState } from "react";
import { MovieCard, type Movie } from "@/components/card/MovieCard";
import { Input } from "@/components/ui/input";
import { GET_MOVIES } from "@/services/getMovies";
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

const options = [
  { value: "now_playing", label: "Now Playing" },
  { value: "popular", label: "Popular" },
  { value: "top_rated", label: "Top Rated" },
  { value: "upcoming", label: "up Coming" },
];

export default function Movies() {
  const [filter, setFilter] = useState("popular");
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery({
    queryFn: GET_MOVIES,
    queryKey: [
      "getMoviews",
      {
        filter,
      },
    ],
  });

  const handleChangeFilter = (value: string) => {
    setFilter(value);
  };

  if (isLoading) <Loading />;

  if (isError) <Error />;

  return (
    <div className="container px-10 mx-auto pb-10">
      <div className="py-4">
        {/* <Input className="py-2" placeholder="Search movies..." /> */}
      </div>

      <div className="relative w-full py-4">
        <Input placeholder="Filter genres..." className="w-full" />

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
                <Check className={`mr-2 h-4 w-4 `} />
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
        {movies?.data?.results.map((movie: Movie, index: number) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
}
