import Image from "next/image";
import {useRouter} from "next/router";
import {useContext, useEffect, useState} from "react";
import Layout from "../../components/layout";
import CommentsForm from "../../components/comments-form";
import {MovieContext} from "../../context/MovieContext";

const MovieDetails = () => {
  const router = useRouter();
  const {id} = router.query;
  const {showDetails, selectedMovie} = useContext(MovieContext);
  const [loading, setLoading] = useState(true);
  let movie = selectedMovie;
  const back = () =>{
    router.back() // go back to previous page
  }
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    showDetails(id as string).then(() => {
      movie = selectedMovie;
      setLoading(false);
    }).catch(console.error).finally(() => setLoading(false));
  }, [id]);
  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  let poster: string;
  if (movie) {
    poster = movie.Poster === 'N/A' ? 'https://via.placeholder.com/300x450' : movie.Poster;
  } else {
    poster = 'https://via.placeholder.com/300x450';
  }


  return (
      <Layout>
        <div className="md:container flex flex-col md:flex-row justify-start items-start mx-auto">
          <div className="w-full md:w-1/2 xl:w-3/5">
            <button className="back" onClick={back}>
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                   aria-hidden="true" role="img" className="iconify iconify--mdi fill-gray-400" width="32"
                   height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path d="M10.05 16.94v-4h8.92l.03-2.01h-8.95V6.94l-5 5Z"></path>
              </svg>
            </button>
            <Image
                src={poster}
                alt={movie?.Title}
                width={200}
                height={300}
                layout="responsive"
            />
          </div>
          <div className="mx-4 md:container">
           <div className="px-4 mx-4">
             <h1 className="text-8xl font-black font-sans text-slate-700">{movie?.Title}</h1>
             <p className="text-gray-400 text-xl">{`${movie?.Runtime} - ${movie?.Year} - ${movie?.Rated}`}</p>
             <p className="text-gray-400 text-3xl my-4 flex items-center"><span
                 className="text-black border-2 border-gray-400 bg-amber-300 rounded-md p-2 font-extrabold mr-4">IMDb</span> 8/10
             </p>
             <div className="my-4">
               <h4 className="text-4xl text-gray-400 font-bold my-4">Overview</h4>
               <p className="text-3xl">{movie?.Plot}</p>
             </div>
             <div className="my-4 grid grid-cols-1 md:grid-cols-4 gap-2 ">
               <div>
                 <h4 className="text-4xl text-gray-400 font-bold my-4">Cast</h4>
                 {movie?.Actors.split(',').map((actor, index) => (
                     <p key={index} className="text-3xl">{actor}</p>
                 ))}
               </div>
               <div>
                 <h4 className="text-4xl text-gray-400 font-bold my-4">Genre</h4>
                 {movie?.Genre.split(',').map((genre, index) => (
                     <p key={index} className="text-3xl">{genre}</p>
                 ))}
               </div>
               <div>
                 <h4 className="text-4xl text-gray-400 font-bold my-4">Director</h4>
                 {movie?.Director.split(',').map((director, index) => (
                     <p key={index} className="text-3xl">{director}</p>
                 ))}
               </div>
               <div>
                 <h4 className="text-4xl text-gray-400 font-bold my-4">Writers</h4>
                 {movie?.Writer.split(',').map((writer, index) => (
                     <p key={index} className="text-3xl">{writer}</p>
                 ))}
               </div>
             </div>
           </div>
          </div>
        </div>
        {/*commentary section*/}
        <div className="container mx-auto mt-8">
          <div className="">
            <h4 className="text-4xl text-gray-400 font-bold my-4">Commentary</h4>
            <CommentsForm movieId={movie?.imdbID} />
          </div>
        </div>
      </Layout>
  );
};

export default MovieDetails;