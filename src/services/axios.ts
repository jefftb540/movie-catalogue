import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",

  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOGIyNWM4YzM1M2U3OGFhMTUwODU0YzhkOGI0MmNkNSIsInN1YiI6IjY1NWI1YzU4N2YwNTQwMThkNmY1MWI3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hnbQzMBgA5on-mWnxd8-48QjYFeTFg0d-4i_-2okOM8",
  },
});
