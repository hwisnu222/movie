import { GithubIcon } from "lucide-react";
import { Link } from "react-router";

export const Header = () => {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-8 py-4 flex justify-between items-center">
      <Link to="/">
        <h3 className="font-bold  text-2xl">Movies</h3>
      </Link>
      <Link to="https://github.com/hwisnu222/movie">
        <GithubIcon />
      </Link>
    </div>
  );
};
