import {Router} from 'express';


const router = Router();


router.get('/', async (req, res)=>{

    res.json({message: 'postovi'})
})



export  {router as postsRouter };