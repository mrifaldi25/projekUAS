// Home.jsx
import React, { useEffect } from "react"; // Tambahkan useEffect untuk debugging
import { Link } from "react-router-dom";

import { OutlineButton } from "../components/button/Button";
import HeroSlide from "../components/hero-slide/HeroSlide";
import MovieList from "../components/movie-list/MovieList";

// Pastikan path ini benar-benar mengarah ke file tmdbApi.js Anda
// yang berisi export const category, movieType, tvType
import { category, movieType, tvType } from "../api/tmdbApi";

import * as Config from "./../constants/Config";

const Home = () => {
  // Tambahkan useEffect ini untuk debugging
  useEffect(() => {
    console.log("Debug di Home.jsx:");
    console.log("Imported category object:", category);
    console.log("category.movie:", category.movie);
    console.log("category.tv:", category.tv);
    console.log("movieType.popular:", movieType.popular);
    console.log("tvType.popular:", tvType.popular);
  }, []); // [] agar hanya berjalan sekali saat komponen mount

  return (
    <>
      <HeroSlide />

      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to={`/${Config.HOME_PAGE}/movie`}>
              <OutlineButton className="small">show all</OutlineButton>
            </Link>
          </div>
          {/* Pastikan category.movie memiliki nilai yang valid */}
          <MovieList category={category.movie} type={movieType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to={`/${Config.HOME_PAGE}/movie`}>
              <OutlineButton className="small">show all</OutlineButton>
            </Link>
          </div>
          {/* Pastikan category.movie memiliki nilai yang valid */}
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending TV</h2>
            <Link to={`/${Config.HOME_PAGE}/tv`}>
              <OutlineButton className="small">show all</OutlineButton>
            </Link>
          </div>
          {/* Pastikan category.tv memiliki nilai yang valid */}
          <MovieList category={category.tv} type={tvType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated TV</h2>
            <Link to={`/${Config.HOME_PAGE}/tv`}>
              <OutlineButton className="small">show all</OutlineButton>
            </Link>
          </div>
          {/* Pastikan category.tv memiliki nilai yang valid */}
          <MovieList category={category.tv} type={tvType.top_rated} />
        </div>
      </div>
    </>
  );
};

export default Home;
