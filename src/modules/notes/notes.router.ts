import express from "express";
import { authenticateToken } from "../../middlewares/authentication";
import * as NotesController from "./notes.controller";

const router = express.Router();

router.get("/", authenticateToken, NotesController.getAllNotes);

router.post("/note", authenticateToken, NotesController.createNote);

// router.get("/note", authenticateToken, NotesController.getNote);

router.put("/note", authenticateToken, NotesController.updateNote);

router.delete("/note", authenticateToken, NotesController.deleteNote);

export { router as notesRoute };
