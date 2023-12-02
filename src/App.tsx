import { useEffect, useState } from "react";

import "./App.css";
import { api } from "./services/axios";

type Movie = {
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
};

type Genre = {
  name: string;
  id: number;
};

function App() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genre, setGenre] = useState("");
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const getData = async () => {
      const response = await api.get("/genre/movie/list", {
        params: {
          language: "pt-br",
        },
      });
      console.log(response.data);
      setGenres(response.data.genres);
      setGenre(response.data.genres[0]);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await api.get("discover/movie", {
        params: {
          language: "pt-br",
          with_genres: genre,
        },
      });
      console.log(data.data);
      setMovies(data.data.results);
    };
    if (genre) getData();
  }, [genre]);

  return (
    <section className="main">
      <select
        name="genre"
        className="genre-selector"
        onChange={(e) => setGenre(e.target.value)}
      >
        {genres.map((genre) => (
          <option value={genre.id}>{genre.name}</option>
        ))}
      </select>
      <div className="main-container">
        <div className="grid">
          {movies.map((title) => (
            <div className="movie" onClick={() => setMovie(title)}>
              {title.poster_path ? (
                <img
                  src={
                    "https://image.tmdb.org/t/p/original" + title.poster_path
                  }
                />
              ) : (
                <img src="No-Image.png" />
              )}
              <p>{title.title}</p>
              <p>Lançamento: {title.release_date}</p>
            </div>
          ))}
        </div>
        {movie && (
          <div className="details">
            <img
              src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
            />
            <h1>{movie.title}</h1>
            <p>
              <span>Lançamento: </span>
              {movie.release_date}
            </p>
            <p>
              <span>Avaliação: </span>
              {movie.vote_average}
            </p>
            <p>
              <span>Sinopse: </span>
              {movie.overview}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
