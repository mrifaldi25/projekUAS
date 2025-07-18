import axiosClient from "./axiosClient";

export const category = {
  movie: "movie",
  // PERBAIKAN DI SINI: Mengubah 'chanell' menjadi 'tv'
  tv: "tv",
};

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};

const tmdbApi = {
  getMoviesList: (type, params) => {
    const url = "movie/" + movieType[type];
    return axiosClient.get(url, params);
  },
  getTvList: (type, params) => {
    const url = "tv/" + tvType[type];
    return axiosClient.get(url, params);
  },
  getVideos: (cate, id) => {
    // Pastikan 'cate' akan merujuk ke 'movie' atau 'tv'
    const url = category[cate] + "/" + id + "/videos";
    return axiosClient.get(url, { params: {} });
  },
  search: (cate, params) => {
    // Pastikan 'cate' akan merujuk ke 'movie' atau 'tv'
    const url = "search/" + category[cate];
    return axiosClient.get(url, params);
  },
  detail: (cate, id, params) => {
    // Pastikan 'cate' akan merujuk ke 'movie' atau 'tv'
    const url = category[cate] + "/" + id;
    return axiosClient.get(url, params);
  },
  credits: (cate, id) => {
    // Pastikan 'cate' akan merujuk ke 'movie' atau 'tv'
    const url = category[cate] + "/" + id + "/credits";
    return axiosClient.get(url, { params: {} });
  },
  similar: (cate, id) => {
    // Pastikan 'cate' akan merujuk ke 'movie' atau 'tv'
    const url = category[cate] + "/" + id + "/similar";
    return axiosClient.get(url, { params: {} });
  },
};

export default tmdbApi;
