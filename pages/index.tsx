import type {NextPage} from 'next'
import Layout from "../components/layout";
import Search from "../components/search";
import {MovieCard} from "../components/movie-card";
import {MovieContext} from "../context/MovieContext";
import Image from "next/image";
import {useContext} from "react";
import Movie from "../models/movie";
import Ratings from "../models/raitings";

const Home: NextPage = () => {
  const {setSearch, movies} = useContext(MovieContext);
  const handleSearch = (e: { target: { value: string; }; }) => {
    setSearch(e.target.value);
  };
  const hashMap = new Map();
  const rank =(movie: Movie[]) => {
    const result: { movie:Movie, percentage: number }[] = [];
    movie.forEach(movie => {
      const ratings = movie.Ratings;
      console.log(ratings);
      const percentage = ratings.reduce((acc, curr) => {
        return acc + Number(Ratings.normalize(curr.Value));
      }, 0);
      const average = Math.round(percentage / ratings.length);
      result.push({percentage:average, movie:movie});
    });
    // sort by percentage
    result.sort((a, b) => {
      return b.percentage - a.percentage;
    });
    return result;
  };
  return (
      <Layout>
        <Search handleSearch={handleSearch}/>
        <div id="search-results" className="my-4 grid grid-cols-1 md:grid-cols-4 gap-2">
          {rank(movies)?.map((data, index) => {
            let ranking = hashMap.get(data.percentage);
            if (rank === undefined) {
              ranking = index + 1;
              hashMap.set(data.percentage, ranking);
            }
            return(
                <MovieCard key={index} movie={data.movie} percentage={data.percentage} ranking={hashMap.get(data.percentage)}/>
            )
          })}
        </div>
        {movies?.length === 0 && (
            <div className="flex justify-center items-center mx-auto">
              <div className="flex flex-col container w-1/3 h-1/3">
                <Image
                    src="/images/empty.png"
                    alt="No movies found"
                    width={200}
                    height={200}
                    layout="responsive"
                    className="mx-auto"
                />
                <h4 className="text-center text-xl">Don’t know what to search?</h4>
                <p className="text-center">
                  Here´s an offer you can´t refuse
                </p>
              </div>
            </div>
        )}

      </Layout>
  )
}

export default Home
