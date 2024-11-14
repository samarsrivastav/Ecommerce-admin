import express from 'express';
import getAbout from '../controller/about/getAbout';
import updateAbout from '../controller/about/updateAbout';
import multer from 'multer';

const routes = express.Router();


// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

routes.put('/update', upload.single('file'), updateAbout);
routes.get('/get', getAbout);

export default routes;
