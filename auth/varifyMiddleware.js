import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
export const verify = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyToken = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({ _id: verifyToken.id });
    req.token = token;
    req.user = user;

    // By storing these values in the req object, they can be accessed and utilized by other middleware functions or routes further down the execution flow, providing easy access to the token and user information throughout the request handling process.
    next();
  } catch (error) {
    res.status(400).json({"message":"user info is not set in req header"});
  }
};




