// Contrellers user.js

import { ObjectId } from "mongodb";
import User from "../models/User";

export const postCreateAccount = (req, res, next) => {
  console.log("req.user");
  console.log(req.user);
  const { username, email } = req.body;
  const user = new User(username, email);
  console.log("user Object");
  console.log(user);
  user.save();
  res.send({ user });
};
