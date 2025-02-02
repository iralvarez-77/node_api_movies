import { MoviesModel } from "../models/mysql/movies.model.js";

export const getMovies = async (req, res) => {
  try {
    const { genre, orderDirection } = req.query
    const movies = await MoviesModel.getAllMovies({ genre, orderDirection});
    res.status(200).json(movies);
    
  } catch (error) {
  console.log('👀 👉🏽 ~  errorMovieController:', error)

  }
}

