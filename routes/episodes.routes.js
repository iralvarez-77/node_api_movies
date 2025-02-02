import { Router } from 'express'
import { getEpisode } from '../controllers/episodes.controllers.js'

const router = Router()

router.get('/episodes/:id', getEpisode)

export default router