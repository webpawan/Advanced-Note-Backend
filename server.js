import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoute from "./routes/userRoutes.js";
import noteRoute from "./routes/noteRoutes.js"
const PORT = process.env.PORT || 3000;
import "./DB/connection.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/note", noteRoute);

app.listen(PORT, () => {
  console.log("server start port number", PORT);
});


