import { Router } from "express";
import { emailSignup, confirmUser, login } from "../services/index.js";
import {
  emailValidator,
  passwordValidator,
  handleErrorsMiddleware,
} from "../utils/index.js";

const router = Router();

router.get("/confirmation/:token", async (req, res, next) => {
  try {
    const token = req.params.token;
    await confirmUser(token);
    res.status(301);
    res.redirect(process.env.API);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/signup",
  emailValidator,
  passwordValidator,
  handleErrorsMiddleware,
  async (req, res, next) => {
    const { email, password, name, surname } = req.body;

    try {
      const message = await emailSignup({ email, password, name, surname });
      res.status(200);
      res.json({ message });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  emailValidator,
  passwordValidator,
  handleErrorsMiddleware,
  async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const {token, user} = await login({ email, password });
      res.status(200);
      res.cookie("accessToken", token, {
        maxAge: Date.now() + 10 * 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/logout", async (req, res) => {
  res.clearCookie("accessToken", {
    maxAge: 0,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.json({ message: "Korisnik je izlogovan" });
  res.end();
});

export { router as authRouter };
