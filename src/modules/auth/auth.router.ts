import express from "express";
import * as AuthController from "./auth.controller";

const router = express.Router();

router.post("/sign-in", AuthController.signIn);

router.post("/sign-up", AuthController.signUp);

router.post("/refresh", AuthController.refresh);

export { router as authRoute };
