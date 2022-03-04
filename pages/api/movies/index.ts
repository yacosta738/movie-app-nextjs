// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import Movie from "../../../models/movie";
import axios from 'axios';
import {IRatings} from "../../../models/raitings";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ movies: Movie[], totalResults: number } | { error: Error }>
) {
  const {s} = req.query;
  const url = `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${s}`;
  axios.get(url)
  .then(response => {
    const {data} = response;
    const {Search = [], totalResults = 0} = data;
    console.log("data");
    console.log(data);
    const movies: Movie[] = Search.map((movie: {
      Title: string;
      Year: string;
      Rated: string;
      Released: string;
      Runtime: string;
      Genre: string;
      Director: string;
      Writer: string;
      Actors: string;
      Plot: string;
      Language: string;
      Country: string;
      imdbID: string;
      Type: string;
      Poster: string;
      Ratings:IRatings[];
      imdbRating: number;
      isFavorite: boolean;
    }) => {
      return new Movie(movie);
    });
    res.status(200).json({movies, totalResults});
  })
  .catch(error => {
    return res.status(500).json({error});
  });
}
