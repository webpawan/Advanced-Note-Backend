import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isUserExist = await User.findOne({ email: email });
    if (isUserExist) {
      res.status(400).json({ message: "user aleray exist in data base" });
    } else {
      const newUser = await User({
        name: name,
        email: email,
        password: password,
      });

      if (newUser) {
        const token = await newUser.genrateToken();
        if (token) {
          res.cookie("jwt", token, {
            httpOnly: true,
            // secure: ture,
          });
          await newUser.save();
          res.status(200).json(newUser);
        } else {
          res.status(400).json({
            message: " genrate token function error",
          });
        }
      } else {
        res.status(400).json({
          message: "user is not create in data base ",
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: "user not signup api problem" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserExist = await User.findOne({ email: email });
    if (!isUserExist) {
      res.status(400).json({ message: "user not exist in data base" });
    } else {
      password;
      const isPasswordMatch = await bcryptjs.compare(
        password,
        isUserExist.password
      );

      if (isPasswordMatch) {
        const token = await isUserExist.genrateToken();
        if (token) {
          res.cookie("jwt", token, {
            httpOnly: true,
            // secure: true,
          });
          return res.status(200).json(isUserExist);
        } else {
          res
            .status(400)
            .json({ message: "token is not set on cookie while login" });
        }
      } else {
        res.status(400).json({ message: "user credentials not match" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "signin api problem" });
  }
};

export const fetchnotes = async (req, res) => {};
