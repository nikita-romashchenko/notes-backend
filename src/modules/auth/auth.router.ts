import express from "express";
import * as AuthController from "./auth.controller";

export const router = express.Router();

router.get("/test", async (req, res) => {
  res.send("hello bruh ");
});

router.post("/sign-in", AuthController.signIn);

router.post("/sign-up", AuthController.signUp);

router.post("/refresh", AuthController.refresh);
