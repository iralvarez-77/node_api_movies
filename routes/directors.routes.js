import { Router } from 'express'
import { createDirector } from '../controllers/directors.controllers.js'

const router = Router()

router.post('/directors', createDirector)

export default router