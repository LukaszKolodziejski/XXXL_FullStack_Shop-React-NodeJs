import path from "path";
import express from "express";
import bodyParser from "body-parser";

import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";
import userRoutes from "./routes/user";
import errorRoutes from "./routes/404";
import errorController from "./controllers/error";

import { mongoConnect } from "./utils/database";

import User from "./models/User";

const port = process.env.PORT || 8080;
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  next();
});

// app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findById("61449e5403658549a62bd0be")
    .then((user) => {
      // console.log("_id user");
      // console.log(user);
      req.user = new User(user.username, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
// app.use("/user", userRoutes);
app.use("/", shopRoutes);
app.use(errorController);

mongoConnect(() => {
  app.listen(port, () => {
    console.log(`Server has started on port http://localhost:${port}`);
  });
});
