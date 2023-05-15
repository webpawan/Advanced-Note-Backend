import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import bcryptjs from "bcryptjs";
const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  tokens: [
    {
      token: { type: String, require: true },
    },
  ],
});

userSchema.methods.genrateToken = async function () {
  try {
    const token = jwt.sign({ id: this.id }, process.env.JWT_KEY, {
      expiresIn: "10h",
    });
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    res.status(400).json({ message: "token is not genrate" });
  }
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
