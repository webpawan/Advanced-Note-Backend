import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    title: { type: String, trim: true, require: true },
    body: { type: String, trim: true, require: true },
    tag: { type: String, default: "none" },
    color: { type: String, default: "white" },
    auther: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timetamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
