import { MovieCard, type Movie } from "@/components/card/MovieCard";
import { Header } from "@/components/headers/Header";
import { Input } from "@/components/ui/input";

export const dummyMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    release_date: "1994-09-23",
    vote_average: 8.7,
    overview:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    id: 2,
    title: "The Godfather",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    release_date: "1972-03-24",
    vote_average: 8.7,
    overview:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    release_date: "2008-07-16",
    vote_average: 8.5,
    overview:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    release_date: "1994-09-10",
    vote_average: 8.5,
    overview:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
  },
  {
    id: 5,
    title: "Inception",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    release_date: "2010-07-16",
    vote_average: 8.4,
    overview:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  },
  {
    id: 6,
    title: "The Matrix",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    release_date: "1999-03-31",
    vote_average: 8.2,
    overview:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  },
];

export const Movies = () => {
  return (
    <div>
      <Header />
      <div className="container px-10 mx-auto pb-10">
        <div className="py-4">
          <Input className="py-2" placeholder="Search movies..." />
        </div>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2">
          {dummyMovies.map((movie: Movie, index: number) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};
