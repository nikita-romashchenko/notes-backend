import { Request, Response } from "express";
import { RequestWithUser } from "../../middlewares/authentication";
import { Note } from "./note.model";

const getAllNotes = async (req: RequestWithUser, res: Response) => {
  const filter = { owner_uuid: req.user.uuid };
  const docs = await Note.find(filter);

  res.send(docs);
};

const createNote = async (req: RequestWithUser, res: Response) => {
  const { note } = req.body;
  const { uuid, text } = note;
  const newNote = new Note({
    owner_uuid: req.user.uuid,
    uuid,
    text,
  });

  newNote
    .save()
    .then((data) => {
      res.json(data);
      //add card uuid to user
    })
    .catch((err) => {
      res.json({ message: err });
    });
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

  let doc = await Note.findOneAndUpdate(filter, note, { new: true });
  res.json(doc);
};

const deleteNote = async (req: RequestWithUser, res: Response) => {
  const { noteId } = req.params;
  const filter = { uuid: noteId };

  let doc = await Note.deleteOne(filter);
  if (doc == null) {
    res.sendStatus(401);
  } else {
    res.sendStatus(200);
  }
};

export { getAllNotes, createNote, updateNote, deleteNote };
