import express from 'express'
import login from '../controller/auth/login'
import logout from '../controller/auth/logout'
const routes=express.Router()

routes.post('/login',login)
routes.post('/logout',logout)

export default routes