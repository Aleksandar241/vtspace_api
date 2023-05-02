import {Router} from 'express';
import prisma from '../utils/db';


const router = Router();


router.get('/', async (req, res)=>{
prisma.user.findMany({}).then((result) => {
    console.log(result)
}
).catch((err) => {
  console.log(err)
}
)
    res.json({message: 'postovi'})
})

router.post('/add', async (req, res) => {
    try {
        const posts = await prisma.post.create({
            data: {
                belongsToId: req.body.belongsToId,
                title: req.body.title,
                description: req.body.description,
            }
            
        })
        res.json(posts);

    } catch (error) {
        console.log(error)
    }

    
});
export  {router as postsRouter };