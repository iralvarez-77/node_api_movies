import { Router } from 'express'
import { getMovies } from '../controllers/movies.controllers.js'

const router = Router()

router.get('/movies', getMovies)

export default router