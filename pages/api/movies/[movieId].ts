import type {NextApiRequest, NextApiResponse} from 'next';
import Movie from "../../../models/movie";
import axios from 'axios';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ movie: Movie } | { error: Error }>,
) {
  const {movieId} = req.query;
  console.log(movieId);
  // https://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${id}
  axios.get(`https://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${movieId}`)
  .then(response => {
    const {data} = response;
    console.log("LA data", data);
    console.log(data);
    const movie = new Movie(data);
    res.status(200).json({movie});
  })
  .catch(error => {
    res.status(500).json({error});
  });

}