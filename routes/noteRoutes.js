import express from "express";
import {
  createNote,
  deleteNote,
  fetchNote,
  updateNoteBody,
  updateNoteColor,
  updateNoteTag,
  updateNoteTitle,
} from "../controllers/noteControllers.js";
import { verify } from "../auth/varifyMiddleware.js";
const route = express.Router();

route.get("/", verify, fetchNote);
route.post("/", verify, createNote);
route.put("/updateTitle", verify, updateNoteTitle);
route.put("/updateBody", verify, updateNoteBody);
route.put("/updateTag", verify, updateNoteTag);
route.put("/updateColor", verify, updateNoteColor);
route.delete("/delete/:noteId", verify, deleteNote);

export default route;
