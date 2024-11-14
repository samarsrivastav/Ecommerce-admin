import express from 'express'
const routes=express.Router()
import product from './product'
import about from './about'
import contact from './contact'
import auth from './auth'
routes.use('/products',product)
routes.use('/about',about)
routes.use('/contact',contact)
routes.use('/auth',auth)
export default routes