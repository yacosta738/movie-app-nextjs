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
  const hashMap = new Map<number, number>();
  const rank = (movie: Movie[]) => {
    const result: { movie: Movie, percentage: number }[] = [];
    movie.forEach(movie => {
      const ratings = movie.Ratings;
      console.log(ratings);
      const percentage = ratings.reduce((acc, curr) => {
        return acc + Number(Ratings.normalize(curr.Value));
      }, 0);
      const average = Math.round(percentage / ratings.length);
      result.push({percentage: average, movie: movie});
      const repeated = hashMap.get(average);
      if (repeated) {
        hashMap.set(average, repeated + 1);
      } else {
        hashMap.set(average, 1);
      }
    });
    let rankPosition = 0;
    let lastCount = 0;
    // sort by percentage.
    return result.sort((a, b) => {
      return b.percentage - a.percentage;
    }).map(data => {
      const count = hashMap.get(data.percentage);
      // if the percentage is the same, then we need to add the rank position(the same for all the movies with the same percentage).
      if (count && count > 1) {
        if (count !== lastCount) {
          rankPosition++;
        }
      } else {
        rankPosition++;
      }
      lastCount = count? count : 0;
      return {
        movie: data.movie,
        percentage: data.percentage,
        ranking: rankPosition
      };

    });
  };
  return (
      <Layout>
        <Search handleSearch={handleSearch}/>
        <div id="search-results" className="my-4 grid grid-cols-1 md:grid-cols-4 gap-2">
          {rank(movies)?.map((data, index) => (
              <MovieCard key={index} movie={data.movie} percentage={data.percentage}
                         ranking={data.ranking}/>
          ))}
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
