import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Star,
  Clock,
  Calendar,
  Film,
  Globe,
  ArrowLeftCircleIcon,
} from "lucide-react";
import { Link, useParams } from "react-router";
import { useQuery } from "react-query";
import { GET_MOVIE } from "@/services/getMovies";
import Loading from "@/components/states/Loading";
import Error from "@/components/states/Error";
import type { CompanyType, GenreType } from "@/types/movie.type";

export default function MovieDetail() {
  const { movieId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryFn: GET_MOVIE,
    queryKey: [
      "getMovie",
      {
        movieId,
      },
    ],
  });
  const movie = data?.data;

  if (isLoading) <Loading />;

  if (isError) <Error />;

  if (!movie) {
    return <div className="text-center py-8">No movie data available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div
        className="relative object-top h-96 w-full rounded-lg mb-8 overflow-hidden"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {" "}
        <Link to="/">
          <ArrowLeftCircleIcon className="absolute h-10 w-10 m-4 z-10" />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto rounded-t-lg"
            />
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-bold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    ({movie.vote_count})
                  </span>
                </div>
                <Button variant="outline">
                  <Star className="h-4 w-4 mr-2" />
                  Rate
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    {new Date(movie.release_date).toLocaleDateString()}
                  </span>
                </div>
                {movie.runtime && (
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {movie.genres.map((genre: GenreType) => (
                  <Badge key={genre.id} variant="secondary">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                {movie.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Overview</h3>
              <p className="text-muted-foreground">
                {movie.overview || "No overview available."}
              </p>
            </CardContent>
          </Card>

          {movie.production_companies.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Film className="h-5 w-5 mr-2" />
                  <span>Production Companies</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {movie.production_companies.map((company: CompanyType) => (
                    <div
                      key={company.id}
                      className="flex items-center space-x-2"
                    >
                      {company.logo_path ? (
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                            alt={company.name}
                          />
                          <AvatarFallback>
                            {company.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                          {company.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{company.name}</p>
                        {company.origin_country && (
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Globe className="h-3 w-3 mr-1" />
                            {company.origin_country}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
