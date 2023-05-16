import express from "express";
import {
  createNote,
  deleteNote,
  fetchNote,
  updateNote,
  selectNote,
} from "../controllers/noteControllers.js";
import { verify } from "../auth/varifyMiddleware.js";
const route = express.Router();

route.get("/", verify, fetchNote);
route.get("/selectNote/:noteId", verify, selectNote);
route.post("/", verify, createNote);
route.put("/update", verify, updateNote);
route.delete("/delete/:noteId", verify, deleteNote);

export default route;
