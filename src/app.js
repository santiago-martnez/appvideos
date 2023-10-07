import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import multer from 'multer'; 

import authRoutes from './routes/auth.Routes.js'
import videosRoutes from './routes/videos.Routes.js'
import creatorsRoutes from './routes/creators.Routes.js'

const app = express();

app.use(cors({
    //origin: 'http://localhost:5173',
    origin: 'https://urlvideos.netlify.app',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser(null, {
    sameSite: 'none',
    secure: true // Requiere conexión segura (HTTPS)
}));
app.use("/api", authRoutes);
app.use("/api", videosRoutes);
app.use("/api", creatorsRoutes);

export default app;