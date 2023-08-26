import mongoose from "mongoose";
import { run } from "node:test";

interface INote {
  owner_uuid: string;
  uuid: string;
  text: string;
}

const NoteSchema = new mongoose.Schema<INote>({
  owner_uuid: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Note = mongoose.model<INote>("Notes", NoteSchema);

export { Note };
