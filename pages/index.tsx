import type {NextPage} from 'next'
import Layout from "../components/layout";
import Search from "../components/search";
import {MovieCard} from "../components/movie-card";
import {MovieContext} from "../context/MovieContext";
import Image from "next/image";
import {useContext} from "react";

const Home: NextPage = () => {
  const {setSearch, movies} = useContext(MovieContext);
  const handleSearch = (e: { target: { value: string; }; }) => {
    setSearch(e.target.value);
  };
  return (
      <Layout>
        <Search handleSearch={handleSearch}/>
        <div id="search-results" className="my-4 grid grid-cols-1 md:grid-cols-4 gap-2">
          {movies?.map((movie, index) => (
             <MovieCard key={index} movie={movie}/>
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
