import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Card className="w-full py-0 overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="p-0">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="object-cover object-top hover:scale-110 ease-out duration-500"
        />
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold line-clamp-1">
              {movie.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {new Date(movie.release_date).getFullYear()}
            </p>
          </div>
          <div className="flex items-center bg-primary/10 px-2 py-1 rounded-md">
            <span className="text-primary font-bold">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
          {movie.overview}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between p-6 pt-0 md:flex-row flex-col gap-2">
        <Link to={`/movies/${movie.id}`} className="w-full">
          <Button className="cursor-pointer w-full">Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
