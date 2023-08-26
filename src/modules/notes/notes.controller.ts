import { Request, Response } from "express";
import { RequestWithUser } from "../../middlewares/authentication";
import { Note } from "./note.model";

const getAllNotes = async (req: RequestWithUser, res: Response) => {
  const filter = { owner_uuid: req.user.uuid };
  const docs = await Note.find(filter);

  res.send(docs);
};

const createNote = async (req: RequestWithUser, res: Response) => {};

const getNote = async (req: RequestWithUser, res: Response) => {};

const updateNote = async (req: RequestWithUser, res: Response) => {};

const deleteNote = async (req: RequestWithUser, res: Response) => {};

export { getAllNotes, createNote, getNote, updateNote, deleteNote };
