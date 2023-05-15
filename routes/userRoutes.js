import express from "express";
import { fetchnotes, signin, signup } from "../controllers/userControllers.js";

const route = express.Router();


route.post("/signup",signup);
route.post("/signin",signin);
route.post("/fetchnotes",fetchnotes);

export default route