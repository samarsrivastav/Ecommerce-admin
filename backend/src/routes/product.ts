import express from 'express'
import multer from 'multer'
import createProduct from '../controller/product/createProduct';
import deleteProduct from '../controller/product/deleteProduct';
import getProduct from '../controller/product/getProduct';
import updateProduct from '../controller/product/updateProduct';
const routes=express.Router()
// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
routes.post('/create',upload.single('file'),createProduct)
routes.delete('/delete/:id',deleteProduct)
routes.get('/get',getProduct)
routes.put('/update/:id',upload.single('file'),updateProduct)

export default routes