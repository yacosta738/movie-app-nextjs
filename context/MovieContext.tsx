import React, {createContext, useState, useEffect, FC} from 'react';
import axios from 'axios';
import Movie from "../models/movie";
interface IMoviesContextState {
  movies: Movie[];
  favorites: Movie[];
  addFavoriteMovie: (movie: Movie) => void;
  addFavoriteMovies: (movies: Movie[]) => void;
  removeFavoriteMovie: (movie: Movie) => void;
  favoriteHandler: (movie: Movie, e: Event) => void;
  showDetails: (id: string) =>  Promise<void>;
  selectedMovie: Movie | undefined;
  setSearch: (search: string) => void;
}

const contextDefaultValues: IMoviesContextState = {
  movies: [],
  favorites: [],
  addFavoriteMovie: () => {},
  addFavoriteMovies: () => {},
  removeFavoriteMovie: () => {},
  favoriteHandler: () => {},
  showDetails: () => Promise.resolve(),
  selectedMovie: undefined,
  setSearch: () => {}
};

export const MovieContext = createContext<IMoviesContextState>(contextDefaultValues);
const MovieApp: FC  = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie>({
    Actors: "",
    Country: "",
    Director: "",
    Genre: "",
    Language: "",
    Plot: "",
    Poster: "",
    Rated: "",
    Ratings: [],
    Released: "",
    Runtime: "",
    Title: "",
    Type: "",
    Writer: "",
    Year: "",
    imdbID: "",
    imdbRating: 0,
    isFavorite: false
  });

  const fetchMovies = async (searchValue: string) => {
    console.log('fetching movies');
    const response = await axios(
      `/api/movies?s=${searchValue}`
    );
    const data = response.data;
    // search for the datails of the movie
    let ids = data.movies.map((movie: Movie) => movie.imdbID);
    const details = await Promise.all(ids.map((id:string) => axios(`/api/movies/${id}`)));
    const moviesWithDetails = data.movies.map((movie: any, index: number) => details[index].data.movie);
    setMovies(moviesWithDetails);
  };

  const removeFavoriteMovie = (movie: Movie) => {
    movie.isFavorite = false;
    const newFavoriteList = favorites.filter(
      (fav) => fav.imdbID !== movie.imdbID
    );
    setFavorites(newFavoriteList);
  };

  const addFavoriteMovie = (movie: Movie) => {
    movie.isFavorite = true;
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
  };

  const  addFavoriteMovies = (moviesData: Movie[]) => {
    moviesData.forEach((movie) => {
      movie.isFavorite = true;
    });
    setFavorites([...favorites, ...movies]);
    // save to local storage
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  const favoriteHandler = (movie: Movie, e: Event) => {
    e.preventDefault();
    if (favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      removeFavoriteMovie(movie);
    } else {
      addFavoriteMovie(movie);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  const showDetails = async (id: string) => {
    const response = await axios(
      `/api/movies/${id}`
    );
    const data = response.data;
    let movie: Movie = data.movie;
    setSelectedMovie(movie);
  };

  useEffect(() => {
    fetchMovies(search);
  }, [search]);

  return (
      <MovieContext.Provider
          value={{
            movies,
            favorites,
            addFavoriteMovie,
            addFavoriteMovies,
            removeFavoriteMovie,
            favoriteHandler,
            showDetails,
            selectedMovie,
            setSearch,
          }}
    >
  {children}
  </MovieContext.Provider>
  );
};

export default MovieApp;
