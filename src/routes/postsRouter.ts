import {Router} from 'express';
import prisma from '../utils/db';


const router = Router();


// router.get('/', async (req, res)=>{

//     prisma.user.findMany({})
//     .then((result) => {
//         console.log(result)
//     })
//     .catch((err) => {
//     console.log(err)
//     })
    
// res.json({message: 'postovi'})
// })

// GET ALL POSTS
router.get('/', (req, res)=>{
    prisma.post.findMany({})
    .then((result) =>res.send(result))
    .catch((err) => res.send(err)) 
})

// GET POST BY ID
router.get('/:id', (req, res) => {
    const {id} = req.params
    prisma.post.findUnique({
        where:{id:id}
    })
    .then((result) => { 
        res.send(result)
     })
     .catch((err) => { 
        res.status(301).send({err, msg:"Something went wrong, post not deleted."})
      })
});

// DELETE POST BY ID
router.delete('/:id', (req, res) => {
    const {id} = req.params
    prisma.post.delete({
        where:{id:id}
    })
    .then((result) => { 
        res.send({result, msg:"Post deleted"})
     })
     .catch((err) => { 
        res.status(301).send({err, msg:"Something went wrong, post not deleted."})
      })
});

// ADD POST
router.post('/add',(req, res) => {
    prisma.post.create({
        data: {
            belongsToId: req.body.belongsToId,
            title: req.body.title,
            description: req.body.description,
        }
    })
    .then((result) => res.send(result))
    .catch((err) => res.status(301).send({err, msg:"Something went wrong, post not deleted."}))
});

// UPDATE POST BY ID
router.put("/:id",(req,res) => {
    const {id} = req.params
    const body = req.body
    prisma.post.update({
        where: { id: id },
        data:{...body}}
        )
        .then((result) => res.send(result))
        .catch((err) => {

            console.log(err);
            
            res.status(301)
            .send({err, msg:"Something went wrong, post not updated."})
        }
        
        )
 })



export  {router as postsRouter };