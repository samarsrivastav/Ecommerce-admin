import express from 'express'
import getContact from '../controller/contact/getContact'
import addContact from '../controller/contact/addContact'
const routes=express.Router()
routes.post('/add',addContact)
routes.get('/get',getContact)

export default routes