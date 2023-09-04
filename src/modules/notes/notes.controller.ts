import { Request, Response } from "express";
import { RequestWithUser } from "../../middlewares/authentication";
import { Note } from "./note.model";
import { HttpStatusCode } from "../../utils/constants";

const getAllNotes = async (req: RequestWithUser, res: Response) => {
  const filter = { owner_uuid: req.user.uuid };

  try {
    const notes = await Note.find(filter);
    res.send(notes);
  } catch (e: any) {
    console.log(e.message);
    res.send(e.message).statusCode = HttpStatusCode.BAD_REQUEST;
  }
};

const createNote = async (req: RequestWithUser, res: Response) => {
  const { user } = req;
  const { uuid, text } = req.body;

  try {
    const createdNote = await Note.create({
      owner_uuid: user.uuid,
      uuid: uuid,
      text: text,
    });
    res.send(createdNote);
  } catch (e: any) {
    res.send(e.message).statusCode = HttpStatusCode.BAD_REQUEST;
  }
};

// const getNote = async (req: RequestWithUser, res: Response) => {
//   const filter = { uuid: req.user.uuid };
//   const docs = await Note.find(filter);

//   res.send(docs);
// };

const updateNote = async (req: RequestWithUser, res: Response) => {
  const { noteId } = req.params;
  const { note } = req.body;
  const filter = { uuid: noteId };

  try {
    const updatedNote = await Note.findOneAndUpdate(filter, note, {
      new: true,
    });
    res.send(updatedNote);
  } catch (e: any) {
    console.log(e.message);
    res.send(e.message).statusCode = HttpStatusCode.BAD_REQUEST;
  }
};

const deleteNote = async (req: RequestWithUser, res: Response) => {
  const { noteId } = req.params;
  const filter = { uuid: noteId };

  try {
    await Note.deleteOne(filter);
    res.sendStatus(HttpStatusCode.OK);
  } catch (e: any) {
    console.log(e.message);
    res.send(e.message).statusCode = HttpStatusCode.BAD_REQUEST;
  }
};

export { getAllNotes, createNote, updateNote, deleteNote };
