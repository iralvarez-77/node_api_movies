import { Router } from 'express'
import { login, logOut, refresh, register } from '../controllers/auth.controllers.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logOut)
router.post('/refresh', refresh)

export default router