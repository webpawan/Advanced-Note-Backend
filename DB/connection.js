import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("data base conncted");
  })
  .catch(() => {
    console.log(" !!!warning data base not conncted");
  });
