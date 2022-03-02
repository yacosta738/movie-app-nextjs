import '../styles/globals.css'
import type {AppProps} from 'next/app'
import MovieApp, {MovieContext} from "../context/MovieContext";
import {useContext} from "react";

function MyApp({Component, pageProps}: AppProps) {
  // read favorite movies from local storage
  const {addFavoriteMovies} = useContext(MovieContext);
  if (typeof window !== 'undefined') {
    const favoriteMovies = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favoriteMovies && favoriteMovies.length > 0) {
      addFavoriteMovies(favoriteMovies);
    } else {
      addFavoriteMovies([]);
      localStorage.setItem('favorites', JSON.stringify([]));
    }
  }
  return (
      <>
        <MovieApp>
          <Component {...pageProps} />
        </MovieApp>
      </>
  )
}

export default MyApp
