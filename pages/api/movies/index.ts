// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import Movie from "../../../models/movie";
import axios from 'axios';
import {IRatings} from "../../../models/raitings";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ movies: Movie[], totalResults: number } | { error: any }>
) {
  const {s} = req.query;
  const url = `https://www.omdbapi.com/?apikey=${process.env.API_KEY || 'fake'}&s=${s}`;

  try {
    const response = await axios.get(url);
    const {data} = response;
    const {Search = [], totalResults = 0} = data;

    const movies: Movie[] = Search.map((movie: any) => {
      return new Movie({
        ...movie,
        imdbRating: movie.imdbRating ? Number(movie.imdbRating) : 0,
        isFavorite: false,
        Ratings: movie.Ratings || []
      });
    });
    res.status(200).json({movies, totalResults: Number(totalResults)});
  } catch (error: any) {
    res.status(500).json({error: error.message});
  }
}
