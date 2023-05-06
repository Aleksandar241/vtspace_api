import { Router } from "express";
import { getUser, updateUser } from "../services/index.js";

const router = Router();

router.get("/", async (req, res, next) => {
  const token = req.cookies.accessToken;
  try {
    const user = await getUser(token);
    res.status(200);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  const token = req.cookies.accessToken;
  const { name, surname, image } = req.body;

  try {
    const user = await updateUser(token, image, name, surname);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

export { router as userRouter };
