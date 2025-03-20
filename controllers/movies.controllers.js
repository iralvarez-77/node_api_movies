import { MoviesModel } from "../models/mysql/movies.model.js";
import { catchedAsync } from "../utils/catchedAsync.js";
import {sentResponse} from "../utils/sentResponse.js"


export const getMovies = catchedAsync( async (req, res) => {

    const { genre, orderDirection } = req.query
    const movies = await MoviesModel.getAllMovies({ genre, orderDirection});
    sentResponse(res, 200, movies)
})

