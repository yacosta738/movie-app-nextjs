import Image from "next/image";
import Link from "next/link";
import {useContext} from "react";
import {MovieContext} from "../context/MovieContext";
import Movie from "../models/movie";

export const MovieCard = (props: { movie: Movie }) => {
  const {favoriteHandler} = useContext(MovieContext);
  return (
      <div className="relative search-result">
        <div className="p-0">
          <div
              className="absolute right-0 z-50 top-5 flex justify-between items-center w-11/12 mx-2 px-4">
            <span
                className="px-2 uppercase tracking-widest text-gray-800 md:text-xl xs:text-sm text-2xl font-bold rounded-full bg-white/30 backdrop-blur-xs focus:outline-none">{props.movie.Type}</span>
            <button onClick={(e) => favoriteHandler(props.movie, e.nativeEvent)}
                    className="p-0 w-10 h-10 flex justify-center items-center bg-white/30 backdrop-blur-xs rounded-full hover:bg-gray-400 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
              {props.movie.isFavorite ?
                  <svg xmlns="http://www.w3.org/2000/svg"
                       xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                       role="img" className="w-6 h-6 fill-gray-500"
                       preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                    <path
                        d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z"></path>
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg"
                       xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                       role="img" className="w-6 h-6 fill-gray-500"
                       preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                    <path
                        d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"></path>
                  </svg>
              }
            </button>
          </div>

          <Link href={`/movies/${props.movie.imdbID}`}>
            <Image
                src={props.movie?.Poster === 'N/A' ? 'https://via.placeholder.com/300x450' : props.movie?.Poster}
                alt={props.movie?.Title}
                width={200}
                height={300}
                layout="responsive"
            />
          </Link>
        </div>
      </div>
  );
};