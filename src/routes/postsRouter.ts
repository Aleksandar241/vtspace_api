import { Router } from "express";
import {
  getAllPosts,
  getPostById,
  deletePostById,
  updatePostById,
  createPost,
} from "../services/postsServices.js";
import { roleMiddleware} from "../utils/index.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res.status(200);
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const posts = await getPostById(id);
    res.status(200);
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const token = req.cookies.accessToken;
  const { title, description } = req.body;

  try {
    const post = await createPost(token, title, description);
    res.status(201);
    res.json(post);
  } catch (error) {
    next(error);
  }
});


router.put("/:id", roleMiddleware, async (req, res, next) => {
  const { id } = req.params;
  const { title, description, belongsToId } = req.body;
  try {
    const postID = await updatePostById(id, title, description, belongsToId);
    res.json(postID);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const postID = await deletePostById(id);
    res.status(200);
    res.json({ message: `Post sa id-jem ${postID} je izbrisan` });
  } catch (error) {
    next(error);
  }
});

export { router as postsRouter };
