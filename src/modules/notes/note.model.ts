import mongoose from "mongoose";

interface Note {
  owner_uuid: string;
  uuid: string;
  text: string;
}

const NoteSchema = new mongoose.Schema<Note>({
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

export const Note = mongoose.model<Note>("Notes", NoteSchema);
