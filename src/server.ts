import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { authRouter, postsRouter } from './routes/index.js';
import { authMiddleware } from './utils/index.js';


const app = express();

const corsOptions = {
    origin: process.env.API,
    optionsSuccessStatus: 200 ,
    credentials: true,
}

// app.use(cors(corsOptions));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', '*'); 
    res.status(200)
    res.json({message: 'hello'})
})

app.use('/api', authRouter);
// app.use('/api/posts', authMiddleware, postsRouter);
app.use('/api/posts', postsRouter);

app.use((err, req, res, next) => {
      res.status(err?.status ?? 500)
      return res.send(err?.message ?? 'Greska na serveru')
})

export default app;