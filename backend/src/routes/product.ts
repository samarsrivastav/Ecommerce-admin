import express from 'express'
import multer from 'multer'
import deleteProduct from '../controller/product/deleteProduct';
import getProduct from '../controller/product/getProduct';
import updateProduct from '../controller/product/updateProduct';
import createProduct from '../controller/product/createProduct';
const routes=express.Router()
// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

routes.post('/create', upload.array('files', 3),createProduct)
routes.delete('/delete/:id',deleteProduct)
routes.get('/get',getProduct)
routes.put('/update/:id',upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
  ]),updateProduct)

export default routes